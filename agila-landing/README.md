# Agil Arbetskraft website

Production website for Agil Arbetskraft, a Swedish staffing and recruitment company. The bilingual Next.js application contains service and article routes, company/team information, theme switching and a Turnstile-protected contact form.

## Technology stack

- Next.js 16 App Router, React 19 and TypeScript 5
- Tailwind CSS 4, scoped `styled-jsx`, Framer Motion and Lucide React
- Cloudflare Turnstile and FormSubmit
- Linux self-hosting with Nginx, systemd and a standalone Next.js build

## Requirements

- Node.js 24.x is recommended for production and matches the validated Node.js 24.6.0 runtime.
- Supported Node.js range: `^20.17.0 || >=22.9.0`.
- npm 11.5.1 or newer. The repository pins npm 11.5.1 through `packageManager`.
- Linux production host with Nginx, systemd and Certbot

## Local development

```bash
npm ci
cp .env.example .env.local
npm run dev
```

The development server defaults to `http://localhost:3000`.

## Environment variables

Real environment files and credentials must never be committed.

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: required public widget key. It is embedded during `npm run build`.
- `TURNSTILE_SECRET_KEY`: required server-only verification secret.
- `FORMSUBMIT_EMAIL`: optional server-only recipient override; the public company email is the safe default.
- `HOSTNAME`: production value must be `127.0.0.1`.
- `PORT`: private internal port, normally `3000`.

Validate a production environment with `npm run validate:env`. The systemd template reads secrets from `/etc/agil-arbetskraft/environment`, which must be owned by root and mode `0600`.

## Scripts

```bash
npm run dev          # development server
npm run lint         # ESLint
npm run typecheck    # TypeScript without emitting files
npm run build        # standalone production build
npm run start        # conventional Next.js production server
npm run validate:env # reject missing/placeholder production variables
npm run test:smoke   # HTTP smoke tests against a running production server
```

## Production build

```bash
npm ci
npm run lint
npm run typecheck
npm run build -- --webpack
```

The standalone runtime is created in `.next/standalone`. A release must also include `public/`, `.next/static/`, the traced runtime dependencies, `scripts/validate-production-env.mjs` and `server.js`. `deployment/scripts/prepare-release.sh` assembles an immutable release and links `.next/cache` to the only service-writable shared directory. `deployment/scripts/switch-release.sh` atomically activates a release and automatically restores the previous symlink target if the private health check fails. The production process is required to use `HOSTNAME=127.0.0.1` and `PORT=3000`; Nginx terminates HTTPS and proxies requests.

Do not expose port 3000 through the public firewall.

## Deployment documentation

- [`../docs/SELF_HOSTED_PRODUCTION_DEPLOYMENT.md`](../docs/SELF_HOSTED_PRODUCTION_DEPLOYMENT.md)
- [`../docs/PRODUCTION_RELEASE_CHECKLIST.md`](../docs/PRODUCTION_RELEASE_CHECKLIST.md)
- [`../docs/SECURITY_RISK_ACCEPTANCE.md`](../docs/SECURITY_RISK_ACCEPTANCE.md)
- Nginx template: `deployment/nginx/agil-arbetskraft.conf.example`
- systemd template: `deployment/systemd/agil-arbetskraft.service.example`

The repository does not assume a domain, installation path or production user. Replace the documented placeholders during server provisioning and review every resulting configuration before activation.

## Project structure

- `src/app/`: routes, metadata, SEO endpoints and contact API.
- `src/components/`: pages, sections, forms, icons and logos.
- `src/contexts/`: persisted Swedish/English language state.
- `src/lib/`: translations and typed site/service/article/team data.
- `src/config/`: form delivery configuration.
- `public/`: referenced images, client logos and self-hosted Outfit font.
- `deployment/`: non-secret Linux Nginx/systemd templates and atomic release-management scripts.
- `scripts/`: environment validation and production smoke testing.

## Security notes

- The contact endpoint enforces JSON and body/field limits, honeypot and Turnstile checks, upstream timeouts and non-sensitive logging.
- Nginx applies TLS, security headers, request limits and rate limiting to the form route.
- `.env*`, `.next/`, `node_modules/`, logs, test output and local `.claude/` settings are ignored.
- Dependency advisories and reachability are documented in `docs/SECURITY_RISK_ACCEPTANCE.md`; never use `npm audit fix --force` without a separately reviewed migration.

## Troubleshooting

- Service state: `sudo systemctl status agil-arbetskraft`.
- Recent application logs: `sudo journalctl -u agil-arbetskraft -n 200 --no-pager`.
- Nginx validation: `sudo nginx -t`.
- Private health check: `curl --fail http://127.0.0.1:3000/`.
- Font check: `curl -I https://YOUR_DOMAIN/fonts/outfit/outfit-latin-v1.woff2`.
- If the form is unavailable, run the environment validator without printing secret values and verify the Turnstile hostname configuration.
