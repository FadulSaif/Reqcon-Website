#!/usr/bin/env bash
set -Eeuo pipefail

umask 0027

APP_ROOT="${APP_ROOT:-/srv/agil-arbetskraft}"
SERVICE_USER="${SERVICE_USER:-agil-web}"
SERVICE_GROUP="${SERVICE_GROUP:-agil-web}"

if [[ $EUID -ne 0 ]]; then
  echo "Run this script as root." >&2
  exit 77
fi

if [[ $# -ne 2 ]]; then
  echo "Usage: $0 SOURCE_APP_DIRECTORY RELEASE_ID" >&2
  exit 64
fi

SOURCE_DIR="$(realpath "$1")"
RELEASE_ID="$2"

if [[ ! "$RELEASE_ID" =~ ^[A-Za-z0-9._-]+$ ]]; then
  echo "RELEASE_ID may contain only letters, numbers, dots, underscores and hyphens." >&2
  exit 64
fi

if [[ ! -f "$SOURCE_DIR/.next/standalone/server.js" || ! -d "$SOURCE_DIR/.next/static" || ! -d "$SOURCE_DIR/public" ]]; then
  echo "The source directory does not contain a complete Next.js standalone build." >&2
  exit 66
fi

TARGET_DIR="$APP_ROOT/releases/$RELEASE_ID"
if [[ -e "$TARGET_DIR" || -L "$TARGET_DIR" ]]; then
  echo "Release already exists: $TARGET_DIR" >&2
  exit 73
fi

install -d -o root -g "$SERVICE_GROUP" -m 0755 "$APP_ROOT" "$APP_ROOT/releases"
install -d -o "$SERVICE_USER" -g "$SERVICE_GROUP" -m 0750 "$APP_ROOT/shared/next-cache"
install -d -o root -g "$SERVICE_GROUP" -m 0755 "$TARGET_DIR"

cp -a "$SOURCE_DIR/.next/standalone/." "$TARGET_DIR/"
install -d -o root -g "$SERVICE_GROUP" -m 0755 \
  "$TARGET_DIR/.next/static" "$TARGET_DIR/public" "$TARGET_DIR/scripts"
cp -a "$SOURCE_DIR/.next/static/." "$TARGET_DIR/.next/static/"
cp -a "$SOURCE_DIR/public/." "$TARGET_DIR/public/"
install -o root -g "$SERVICE_GROUP" -m 0644 \
  "$SOURCE_DIR/scripts/validate-production-env.mjs" \
  "$TARGET_DIR/scripts/validate-production-env.mjs"

if [[ -e "$TARGET_DIR/.next/cache" || -L "$TARGET_DIR/.next/cache" ]]; then
  echo "Unexpected cache path in new release; refusing to replace it." >&2
  exit 73
fi
ln -s "$APP_ROOT/shared/next-cache" "$TARGET_DIR/.next/cache"

chown -R root:"$SERVICE_GROUP" "$TARGET_DIR"
find "$TARGET_DIR" -type d -exec chmod 0755 {} +
find "$TARGET_DIR" -type f -exec chmod 0644 {} +

test -r "$TARGET_DIR/server.js"
test -d "$TARGET_DIR/node_modules"
test -d "$TARGET_DIR/public"
test -d "$TARGET_DIR/.next/static"
test -L "$TARGET_DIR/.next/cache"
test -r "$TARGET_DIR/scripts/validate-production-env.mjs"

echo "Prepared immutable release: $TARGET_DIR"
echo "Review it, then activate it with: bash deployment/scripts/switch-release.sh $RELEASE_ID"
