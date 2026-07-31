# Production release checklist

## Approval and source

- [ ] Owner accepted the documented dependency risks.
- [ ] Final commit and branch are explicitly approved.
- [ ] `git status`, `git diff`, `git diff --stat` and `git diff --check` reviewed.
- [ ] Expected commit hash recorded and verified on the server.
- [ ] No secrets, `.env` files, build output, logs, reports or local `.claude/` settings are staged.

## Server decisions

- [ ] Linux distribution and supported release confirmed.
- [ ] `YOUR_DOMAIN`, installation directory and `agil-web` account confirmed.
- [ ] DNS points to the server.
- [ ] Recommended Node.js 24.x is installed (`24.6.0` was validated), or another supported version satisfies `^20.17.0 || >=22.9.0`.
- [ ] npm 11.5.1 or newer is installed; `node --version`, `npm --version` and `command -v node` are recorded.
- [ ] Firewall exposes only required administration, HTTP and HTTPS ports; port 3000 is private.
- [ ] Nginx, systemd and Certbot configuration reviewed for the actual host.
- [ ] `NODE_ENV=production`, `HOSTNAME=127.0.0.1` and `PORT=3000` are enforced by systemd and the environment validator.

## Environment and external services

- [ ] `/etc/agil-arbetskraft/environment` exists with `root:root` ownership and mode `0600`.
- [ ] Releases and `current` are `root:agil-web`; `agil-web` can read releases but cannot modify them.
- [ ] `/srv/agil-arbetskraft/shared/next-cache` is `agil-web:agil-web`, mode `0750`, and every release's `.next/cache` points to it.
- [ ] Public Turnstile site key configured before build.
- [ ] Server-only Turnstile secret configured without a `NEXT_PUBLIC_` prefix.
- [ ] Form recipient reviewed.
- [ ] Cloudflare Turnstile allows the production hostname.
- [ ] `npm run validate:env` passes without printing values.

## Build gates

- [ ] `npm ci` passes.
- [ ] `npm run lint` passes.
- [ ] `npm run typecheck` passes.
- [ ] `npm run build -- --webpack` passes.
- [ ] `npm audit --omit=dev` result reviewed against risk acceptance.
- [ ] Full `npm audit` result reviewed separately from runtime risk.
- [ ] Standalone release contains `server.js`, `public/`, `.next/static/` and environment validator.
- [ ] Standalone release contains traced runtime `node_modules` and its shared `.next/cache` symlink resolves to the writable cache directory.

## Deployment

- [ ] Current release and configuration backed up.
- [ ] New immutable release directory created.
- [ ] Previous complete release retained for rollback.
- [ ] `current` symlink changed atomically with `bash deployment/scripts/switch-release.sh`; health-failure rollback was tested.
- [ ] systemd service enabled, running as least-privileged account and bound to `127.0.0.1:3000`.
- [ ] `systemd-analyze verify` passes and `systemd-analyze security` output is reviewed on the Linux host.
- [ ] Private health check succeeds.
- [ ] Nginx configuration passes `nginx -t`.
- [ ] HTTP redirects to HTTPS.
- [ ] Certificate and `certbot renew --dry-run` pass.

## Functional smoke test

- [ ] Automated HTTP smoke test passes against HTTPS.
- [ ] Root, About, Services and every service-detail route pass.
- [ ] Articles and every article-detail route pass.
- [ ] Contact, robots, sitemap and unknown-route 404 pass.
- [ ] Swedish and English content switch correctly and update `html[lang]`.
- [ ] Theme and mobile navigation work.
- [ ] Images and Outfit font load without distortion or errors.
- [ ] No horizontal overflow at mobile, tablet or desktop widths.
- [ ] Browser console has no runtime or CSP errors.
- [ ] Missing/invalid Turnstile requests fail safely.
- [ ] One authorised real form submission is delivered successfully.

## Operations

- [ ] journald application logs and Nginx logs reviewed without sensitive form content.
- [ ] Restart/reboot behaviour tested.
- [ ] Backup restoration and symlink rollback procedure understood.
- [ ] Monitoring checks HTTPS root and certificate expiry.
- [ ] Deployment is not declared complete until all applicable boxes are checked.
