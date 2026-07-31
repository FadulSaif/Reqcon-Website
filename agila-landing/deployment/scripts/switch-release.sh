#!/usr/bin/env bash
set -Eeuo pipefail

APP_ROOT="${APP_ROOT:-/srv/agil-arbetskraft}"
SERVICE_NAME="${SERVICE_NAME:-agil-arbetskraft}"
HEALTH_URL="${HEALTH_URL:-http://127.0.0.1:3000/}"

if [[ $EUID -ne 0 ]]; then
  echo "Run this script as root." >&2
  exit 77
fi

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 RELEASE_ID" >&2
  exit 64
fi

RELEASE_ID="$1"
if [[ ! "$RELEASE_ID" =~ ^[A-Za-z0-9._-]+$ ]]; then
  echo "Invalid release identifier." >&2
  exit 64
fi

TARGET_DIR="$APP_ROOT/releases/$RELEASE_ID"
CURRENT_LINK="$APP_ROOT/current"
TEMP_LINK="$APP_ROOT/.current.$$.tmp"

if [[ ! -f "$TARGET_DIR/server.js" || ! -d "$TARGET_DIR/public" || ! -d "$TARGET_DIR/.next/static" || ! -L "$TARGET_DIR/.next/cache" ]]; then
  echo "Release is incomplete or was not prepared by prepare-release.sh: $TARGET_DIR" >&2
  exit 66
fi

if [[ -e "$CURRENT_LINK" && ! -L "$CURRENT_LINK" ]]; then
  echo "Refusing to replace a non-symlink current path: $CURRENT_LINK" >&2
  exit 73
fi

PREVIOUS_TARGET=""
if [[ -L "$CURRENT_LINK" ]]; then
  PREVIOUS_TARGET="$(readlink -f "$CURRENT_LINK")"
  case "$PREVIOUS_TARGET" in
    "$APP_ROOT"/releases/*) ;;
    *)
      echo "Current symlink points outside the managed releases directory." >&2
      exit 73
      ;;
  esac
fi

cleanup() {
  if [[ -L "$TEMP_LINK" ]]; then
    rm -f -- "$TEMP_LINK"
  fi
}
trap cleanup EXIT

restore_previous() {
  if [[ -n "$PREVIOUS_TARGET" && -f "$PREVIOUS_TARGET/server.js" ]]; then
    PREVIOUS_ID="$(basename "$PREVIOUS_TARGET")"
    ln -s "releases/$PREVIOUS_ID" "$TEMP_LINK"
    mv -Tf "$TEMP_LINK" "$CURRENT_LINK"
    systemctl restart "$SERVICE_NAME" || true
    echo "Restored previous release atomically: $PREVIOUS_ID" >&2
  fi
}

ln -s "releases/$RELEASE_ID" "$TEMP_LINK"
mv -Tf "$TEMP_LINK" "$CURRENT_LINK"
if ! systemctl restart "$SERVICE_NAME"; then
  echo "Service restart failed after activation." >&2
  restore_previous
  exit 1
fi

for attempt in {1..20}; do
  if curl --fail --silent --show-error --max-time 3 "$HEALTH_URL" >/dev/null; then
    echo "Activated release: $RELEASE_ID"
    exit 0
  fi
  sleep 1
done

echo "Health check failed after activation." >&2
restore_previous
exit 1
