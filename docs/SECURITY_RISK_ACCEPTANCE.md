# Security risk acceptance

## Release classification

The 1 August 2026 npm audit reports three high-severity affected package entries in the production dependency tree (`next`, `postcss` and `sharp`) and twelve high-severity affected package entries in the complete dependency tree. Those package-entry counts are not advisory counts. The production paths expose four underlying advisories: three rated high and one rated moderate. All are transitive through Next.js 16.2.12.

No safe current npm remediation was offered. npm's suggested Next.js downgrade to 9.3.3 is invalid for this application and would be a breaking regression. Release is acceptable only with explicit owner approval, the mitigations below, and a commitment to upgrade when Next.js provides compatible fixed transitive versions. This document is not approval by itself.

## Production advisories

| Advisory | Severity | Installed path | Reachability assessment | Remediation and temporary mitigation |
|---|---|---|---|---|
| GHSA-qx2v-qp2m-jg93 - PostCSS unescaped `</style>` output | Moderate (CVSS 6.1) | `next@16.2.12 -> postcss@8.4.31` | Not directly reachable. The application does not accept or compile user-submitted CSS; CSS is authored and compiled during a controlled build. npm reports affected package entries at their highest inherited severity, but that does not change this advisory's moderate rating. | Upgrade through a compatible fixed Next.js release. Restrict build inputs and repository write access. |
| GHSA-6g55-p6wh-862q - PostCSS attacker-controlled source map arbitrary file read | High (CVSS 7.5) | `next@16.2.12 -> postcss@8.4.31` | Not directly reachable. No user CSS or source maps are accepted or processed at runtime. | Upgrade Next.js when fixed; build only reviewed source in a trusted environment. |
| GHSA-r28c-9q8g-f849 - PostCSS previous source-map path traversal and file disclosure | High (CVSS 7.5) | `next@16.2.12 -> postcss@8.4.31` | Not directly reachable for the same reason: no attacker-controlled CSS or source maps enter the build or runtime. | Upgrade Next.js when fixed; keep build environment and source trusted. |
| GHSA-f88m-g3jw-g9cj - Sharp/libvips inherited image vulnerabilities (CVE-2026-33327, CVE-2026-33328, CVE-2026-35590 and CVE-2026-35591) | High; the upstream advisory currently provides no numeric CVSS score | `next@16.2.12 -> sharp@0.34.5` | Exposure is materially constrained, not proven absent. The project has no uploads, unrestricted remote image URL input or permissive image proxy; retained images are trusted local files. Public requests can only target application-controlled image sources. | Upgrade through a compatible Next.js/Sharp release. Keep remote image patterns disabled, reject uploads, and monitor Next.js advisories. |

The application does not derive rewrites from user input and has no external rewrite destination. `next.config.ts` defines no remote image patterns. The only user input is bounded JSON contact data; it is not used for CSS, local file paths or image processing.

## Development-only advisory

GHSA-mh99-v99m-4gvg is rated high (CVSS 7.5) and affects `brace-expansion` through `minimatch` in the ESLint 9 toolchain (`eslint`, `@eslint/config-array`, `@eslint/eslintrc`, `eslint-plugin-import`, `eslint-plugin-jsx-a11y` and `eslint-plugin-react`). npm consequently reports nine high-severity affected package entries in this development-only chain. These packages are not copied to the standalone production runtime. Exploitation requires untrusted glob or brace input reaching lint tooling. CI and local lint commands operate on reviewed repository configuration. npm offers ESLint 10 as a major upgrade; it is deferred pending Next.js compatibility testing.

## Application and infrastructure mitigations

- The standalone process is required to bind to `127.0.0.1:3000`; only Nginx is public.
- The systemd unit runs as a non-login service account, removes Linux capabilities, makes releases read-only and permits writes only to the shared Next.js cache and a private temporary directory.
- No user CSS, image upload, remote image allowlist or dynamic proxy/rewrite exists.
- Contact JSON is limited to 16 KiB, field names to 100 characters and values to 4,000 characters.
- Required fields and email syntax are checked server-side after honeypot and Turnstile checks.
- Turnstile and FormSubmit calls have timeouts; API responses are `no-store`.
- Logs contain status and error categories, not secret values or submitted form content.
- Nginx supplies HTTPS, security headers, rate limiting, body limits and upstream timeouts.
- Production browser source maps are disabled.

## Required owner decision

Before release, the owner must accept that the production dependency entries remain present but are assessed as unreachable or materially constrained in this application. Re-run both audits immediately before deployment and after every Next.js update. A directly reachable high or critical advisory blocks deployment.
