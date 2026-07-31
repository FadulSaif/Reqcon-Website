# Self-hosted production deployment

## Confirmed deployment model

```text
Internet → HTTPS domain → Nginx → 127.0.0.1:3000 → Next.js standalone server → API route → Turnstile/FormSubmit
```

The target is Linux. Nginx is the public reverse proxy, systemd manages the application, and Certbot obtains a Let’s Encrypt certificate. The domain, Linux distribution, installation directory and service account were not supplied; this guide uses explicit placeholders and Ubuntu/Debian package examples. Adapt package installation only if the actual distribution differs.

## Values to decide before deployment

| Placeholder | Required production value |
|---|---|
| `YOUR_DOMAIN` | Canonical public domain |
| `YOUR_WWW_DOMAIN` | Optional `www` alias |
| `/srv/agil-arbetskraft` | Installation root; change consistently if needed |
| `agil-web` | Least-privileged service user/group |
| `3000` | Private application port; do not open publicly |

## Prerequisites and firewall

Install Node.js 24.x and npm 11.5.1 or newer using the distribution’s approved repositories or an administrator-managed Node.js installation. Node.js 24.x is the recommended production runtime because validation passed on Node.js 24.6.0 with npm 11.5.1. The supported compatibility range is Node.js `^20.17.0 || >=22.9.0`; older Node.js 20 releases are incompatible with npm 11.5.1. Permit inbound TCP 22 from trusted administration networks and TCP 80/443 publicly. Deny public access to TCP 3000. Outbound HTTPS is required for Turnstile, FormSubmit, npm and certificate renewal.

Confirm the binaries used by systemd before installation:

```bash
node --version
npm --version
command -v node
```

If `command -v node` is not `/usr/bin/node`, update both `ExecStartPre` and `ExecStart` in the systemd unit to the confirmed absolute Node.js 24 path.

## Server accounts and directories

```bash
sudo useradd --system --home /srv/agil-arbetskraft --shell /usr/sbin/nologin agil-web
sudo install -d -o root -g agil-web -m 0755 /srv/agil-arbetskraft
sudo install -d -o root -g agil-web -m 0755 /srv/agil-arbetskraft/releases
sudo install -d -o root -g agil-web -m 0750 /srv/agil-arbetskraft/shared
sudo install -d -o agil-web -g agil-web -m 0750 /srv/agil-arbetskraft/shared/next-cache
sudo install -d -o root -g root -m 0750 /etc/agil-arbetskraft
sudo install -o root -g root -m 0600 /dev/null /etc/agil-arbetskraft/environment
```

Store variables in `/etc/agil-arbetskraft/environment` without shell `export` statements:

```text
NEXT_PUBLIC_TURNSTILE_SITE_KEY=REPLACE_WITH_PUBLIC_KEY
TURNSTILE_SECRET_KEY=REPLACE_WITH_SERVER_SECRET
FORMSUBMIT_EMAIL=REPLACE_WITH_RECIPIENT
HOSTNAME=127.0.0.1
PORT=3000
```

The public Turnstile key must be present when building. The secret and recipient are runtime server values. Never put secrets in Git, systemd command arguments or the Nginx template.

The service account must not own application releases, the `current` symlink, deployment scripts, systemd configuration or environment file. Releases are owned by `root:agil-web` and are read-only to the service. Next.js may write its runtime image/server cache beneath `.next/cache`; every prepared release therefore points that path to `/srv/agil-arbetskraft/shared/next-cache`, the only persistent application path owned by `agil-web`. The hardened unit grants write access only to this shared cache and its private temporary directory.

## Build an immutable release

Use a timestamp or approved commit hash for `RELEASE_ID`. Build in a checked-out copy of the approved commit:

```bash
cd /path/to/approved/source/agila-landing
set -a
. /etc/agil-arbetskraft/environment
set +a
npm ci
npm run validate:env
npm run lint
npm run typecheck
npm run build -- --webpack

RELEASE_ID="$(git rev-parse --short HEAD)-$(date +%Y%m%d%H%M%S)"
sudo bash deployment/scripts/prepare-release.sh "$PWD" "$RELEASE_ID"
```

`prepare-release.sh` refuses to overwrite an existing release, copies the traced standalone runtime, `public/`, `.next/static/` and the environment validator, creates the shared `.next/cache` symlink, verifies the release contents, and makes the release read-only to `agil-web`. Do not rebuild an old commit during rollback; retain at least the previous two complete release directories.

## systemd service

Review `agila-landing/deployment/systemd/agil-arbetskraft.service.example`, replace paths/user only when required, then install it:

```bash
sudo cp deployment/systemd/agil-arbetskraft.service.example /etc/systemd/system/agil-arbetskraft.service
sudo systemctl daemon-reload
sudo systemctl enable agil-arbetskraft
sudo bash deployment/scripts/switch-release.sh "$RELEASE_ID"
sudo systemctl status agil-arbetskraft
curl --fail --silent --show-error http://127.0.0.1:3000/
```

The unit explicitly sets `NODE_ENV=production`, `HOSTNAME=127.0.0.1` and `PORT=3000`; the pre-start validator rejects any mismatch. It starts after networking, runs as `agil-web`, restarts on failure, sends SIGTERM, permits a 30-second graceful stop and writes logs to journald. Its sandbox removes Linux capabilities, blocks device, home, kernel, namespace, privilege-escalation and non-network address-family access, makes the filesystem read-only, and allows writes only to the shared Next.js cache plus the private systemd temporary directory. `MemoryDenyWriteExecute` is intentionally not enabled because the Node.js V8 JIT requires executable memory.

Review the effective sandbox and permissions on the Linux host:

```bash
sudo systemd-analyze verify /etc/systemd/system/agil-arbetskraft.service
sudo systemd-analyze security agil-arbetskraft.service
sudo -u agil-web test -r /srv/agil-arbetskraft/current/server.js
sudo -u agil-web test -r /srv/agil-arbetskraft/current/scripts/validate-production-env.mjs
sudo -u agil-web test -w /srv/agil-arbetskraft/shared/next-cache
sudo -u agil-web test ! -w /srv/agil-arbetskraft/current/server.js
sudo ss -ltnp | grep '127.0.0.1:3000'
```

Check logs with:

```bash
sudo journalctl -u agil-arbetskraft -n 200 --no-pager
sudo journalctl -u agil-arbetskraft -f
```

## Nginx and HTTPS

Copy and edit the template before enabling it:

```bash
sudo cp deployment/nginx/agil-arbetskraft.conf.example /etc/nginx/sites-available/agil-arbetskraft
sudo editor /etc/nginx/sites-available/agil-arbetskraft
sudo ln -s /etc/nginx/sites-available/agil-arbetskraft /etc/nginx/sites-enabled/agil-arbetskraft
sudo nginx -t
```

First obtain the certificate using the distribution-approved Certbot Nginx workflow, then ensure the template’s certificate paths and canonical redirect match the issued domain. Finally:

```bash
sudo systemctl reload nginx
sudo certbot renew --dry-run
```

The template forwards host, protocol, client IP and `Accept`; disables proxy buffering for App Router streaming; applies body and connection timeouts; returns HTTP 429 for form-rate limits; prevents API caching; caches immutable Next.js/font assets; hides server and upstream framework headers; and permits only Cloudflare Turnstile in the CSP frame/connect allowlist. The template is structured for inclusion in Nginx's `http` context, but `nginx -t` remains mandatory on the target Linux server after replacing domains and certificate paths. Validate CSP, Turnstile, theme switching and images in the real HTTPS deployment before declaring success.

## Upgrade procedure

1. Back up `/etc/agil-arbetskraft/environment`, Nginx/systemd files and the `current` symlink target.
2. Fetch the approved Git commit into a separate source directory.
3. Verify `git rev-parse HEAD` against the approved hash.
4. Run install, environment validation, lint, type check, tests and build.
5. Create a new immutable release directory using the commands above.
6. Record the old target: `readlink -f /srv/agil-arbetskraft/current`.
7. Run `sudo bash deployment/scripts/switch-release.sh "$RELEASE_ID"`. It creates a temporary relative symlink and replaces `current` with one atomic `rename(2)` operation (`mv -T`).
8. The script restarts systemd and polls the private health endpoint. If health fails, it atomically restores the previous complete release and restarts the service.
9. Verify private health, HTTPS routes and logs independently after the script succeeds.
10. Run `SMOKE_BASE_URL=https://YOUR_DOMAIN npm run test:smoke` from a trusted validation host.
11. Perform one controlled real form submission.

## Rollback

Use the already-built previous release:

```bash
PREVIOUS_RELEASE_ID=REPLACE_WITH_PREVIOUS_RELEASE_ID
sudo bash deployment/scripts/switch-release.sh "$PREVIOUS_RELEASE_ID"
curl --fail --silent --show-error http://127.0.0.1:3000/
sudo journalctl -u agil-arbetskraft -n 100 --no-pager
```

The same atomic switch is used for upgrades and manual rollback. If configuration changed, restore the matching backed-up environment/Nginx/systemd files, validate Nginx and reload services. Rollback never depends on rebuilding during an incident.

## Backups

Back up Git commit references, immutable release directories, `/etc/agil-arbetskraft/environment`, the active Nginx site, systemd unit and certificate configuration. Encrypt backups containing secrets, restrict access and test restoration. Application source is reproducible from Git; environment values and server configuration are not.

## Post-deployment checks

- Confirm HTTP redirects to HTTPS and the certificate chain/renewal timer is valid.
- Confirm only 22 (restricted), 80 and 443 are publicly reachable.
- Confirm `/`, all nested routes, 404, robots and sitemap.
- Confirm Swedish/English switching updates `html[lang]`.
- Confirm theme, mobile menu, images, font, responsive widths and browser console.
- Confirm security headers and immutable asset caching; confirm `/api/submit` is `no-store`.
- Submit exactly one authorised real form and verify delivery without logging its contents.

## Troubleshooting

- `502 Bad Gateway`: check `systemctl status`, journald and `curl http://127.0.0.1:3000/`.
- Form configuration error: run the validator with the protected environment loaded; never print the environment file.
- Turnstile rejection: confirm the key pair and allowed hostname in Cloudflare.
- Missing static assets: verify both `public/` and `.next/static/` were copied into the standalone release.
- Image/cache write errors: verify `.next/cache` is a symlink to `/srv/agil-arbetskraft/shared/next-cache`, that the destination is owned by `agil-web:agil-web`, and that no other release file is service-writable.
- CSP errors: inspect the browser console and update only the necessary directive after review.
- Failed upgrade: switch the `current` symlink back to the previous immutable release.
