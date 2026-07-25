# Priority 1 URL Audit

## 1. Scope

Audited routes, navigation, metadata, sitemap, robots directives, Vercel routing, and the Priority 0 form regressions. No deployment, Git operation, or company identity/content change was made.

## 2. Current Production Baseline

The inspected live baseline is `https://rec-ebon.vercel.app/`. It currently redirects its root client-side to `#/sv` and exposes internal links such as `#/sv/services`. The deployed HTML title is the default site title. This is a HashRouter build, so the clean `/sv/...` URLs previously listed in `public/sitemap.xml` did not represent the live client routes.

## 3. Framework and Routing Architecture

The project is Vite + React + React Router (`package.json`, `vite.config.ts`, `src/App.tsx`). It is now a BrowserRouter SPA, with `vercel.json` rewriting non-asset requests to `index.html`. `vite.config.ts` no longer uses a relative asset base, so assets work on nested URLs. `index.html` converts legacy `#/…` routes to their clean equivalent before React initializes.

## 4. Complete Route Inventory

The authoritative inventory is [url-inventory.csv](url-inventory.csv). It contains the root redirect, both language variants, twelve service-detail URLs, legal/footer URLs, legacy hash URLs, and the application 404.

## 5. Live Website Comparison

Live navigation used hash URLs; local source previously matched that behavior. The prior sitemap, canonical mechanism, and static metadata instead pointed at `https://reqcon.se` clean paths. The local implementation now makes those clean routes real and uses the verified current Vercel base URL.

## 6. Broken Routes and Links

- Footer service links all led only to the service overview; they now lead to their corresponding details.
- Footer staff-policy and privacy links used `#`; they now resolve to real pages.
- `DocumentViewer` linked to a missing `REQCON-Personalpolicy.pdf`; the invalid outbound control was removed.
- Invalid application routes previously redirected to the home route; they now render a translated 404 experience.

## 7. Duplicate or Inconsistent URLs

Legacy hash URLs and clean paths are duplicate representations of the same content. Hash URLs cannot be useful canonical/sitemap URLs. The client migration bridge preserves legacy hash entry points after deployment; no speculative Vercel redirect is possible because URL fragments are never sent to Vercel.

## 8. URL Classification

Valid public content routes are `keep`; legacy hash routes are `improve`; privacy and the 404 are `noindex`. The complete classifications and available evidence are in [url-inventory.csv](url-inventory.csv) and [url-mapping.csv](url-mapping.csv).

## 9. Redirect Requirements

No server redirects were added. The only root redirect is the client application's deterministic `/` → `/sv`. No evidence supports redirecting any obsolete clean path. The legacy hash conversion is implemented in `index.html` because fragments are unavailable to server redirect rules.

## 10. Vercel Routing Configuration

[vercel.json](../vercel.json) adds a SPA rewrite while excluding API and asset/file paths. This allows Vercel to return the application for direct page loads and refreshes at clean nested URLs, leaving static assets and future API routes intact.

## 11. Canonical URL Implementation

[SEO.tsx](../src/components/SEO.tsx) now uses `VITE_SITE_URL`, falling back to the current deployed Vercel URL, and removes query parameters by using `location.pathname`. A clean service detail therefore self-canonicalizes to its own clean URL. Set `VITE_SITE_URL` before deployment only if a confirmed custom domain becomes active.

## 12. Sitemap Findings

[public/sitemap.xml](../public/sitemap.xml) now contains only clean, indexable public routes: each language homepage, overview, six service details, about, careers, contact, and personal policy. It contains no query URLs, privacy page, confirmation state, hash URLs, or invalid routes. Artificial `lastmod` values were removed.

## 13. Robots.txt Findings

[public/robots.txt](../public/robots.txt) permits crawling and points to the Vercel-baseline sitemap. It does not block CSS, JavaScript, or images.

## 14. Swedish and English Route Mapping

| Page | Swedish route | English route | Status | Notes |
| --- | --- | --- | --- | --- |
| Homepage | `/sv` | `/en` | equivalent | Language switcher replaces only the language segment. |
| Services and all six details | `/sv/services/...` | `/en/services/...` | equivalent | Shared slugs; translated content. |
| About, careers, contact | `/sv/{page}` | `/en/{page}` | equivalent | Shared path names. |
| Personal policy | `/sv/personalpolicy` | `/en/personalpolicy` | equivalent | Existing translated policy content. |
| Privacy | `/sv/privacy` | `/en/privacy` | equivalent/noindex | Full legal policy text was not supplied. |
| 404 | language inferred | language inferred | equivalent/noindex | Localized buttons and message. |

## 15. Internal Link Audit

Header, mobile header, logo, floating CTA, home CTAs, service cards, service cross-links, and footer links resolve to configured routes. The language switcher keeps the pathname and query string, so a service request context is preserved across Swedish and English. External LinkedIn and email links remain unchanged. Contact cards were not modified.

## 16. Service Journey Verification

Local direct navigation to `/sv/services/requirements-analysis` displayed its correct heading and a `Diskutera behov` link to `/sv/contact?service=requirements-analysis`. The contact route shows the requested service context and includes it in the FormSubmit payload. The six allowed slugs are asserted by `scripts/verify-routes.mjs` and included in both sitemap language variants.

## 17. Contact and Careers Regression Check

Local checks confirmed the contact route still renders its form and honeypot, including the service context. The English careers route retained FormSubmit action `https://formsubmit.co/info@reqcon.se`, `multipart/form-data`, attachment field name, and `.pdf,.doc,.docx` accept rule. No external forms were submitted.

## 18. Automated Test Results

`npm run test:routes` passed. It checks configured public routes, all six service slugs, both sitemap service variants, BrowserRouter migration, absence of footer placeholders, and Vercel rewrite configuration. No browser-testing package was installed; the repository did not contain one.

## 19. Build and Lint Results

- `npm run build`: passed.
- `npm run lint`: passed with the pre-existing non-blocking `ThemeContext.tsx` Fast Refresh warning.
- Local browser checks: clean direct service path, legacy hash conversion, 404 route, service-to-contact flow, contact markup, and careers multipart markup passed with no console errors.

## 20. Files Changed

- `src/App.tsx`, `src/router/AppRoutes.tsx`, `src/components/Header.tsx`, `src/components/Footer.tsx`, `src/components/SEO.tsx`, `src/components/DocumentViewer.tsx`
- `src/pages/ServiceDetail.tsx`, `src/pages/Contact.tsx`, `src/pages/NotFound.tsx`, `src/pages/PersonalPolicy.tsx`, `src/pages/Privacy.tsx`
- `src/config/site.ts`, `src/locales/sv.json`, `src/locales/en.json`, `vite.config.ts`, `index.html`, `vercel.json`
- `public/sitemap.xml`, `public/robots.txt`, `scripts/verify-routes.mjs`, `package.json`
- `docs/url-inventory.csv`, `docs/url-mapping.csv`, this report

## 21. Remaining Production Verification

After the user deploys, verify direct HTTP loads and refreshes at `/sv/services/requirements-analysis`, `/en/contact`, `/sv/personalpolicy`, and a nonexistent path. Verify Vercel applies the rewrite, the root redirects to `/sv`, the legacy `/#/sv/contact` bridge becomes `/sv/contact`, canonical tags use the configured base, sitemap/robots are served, and all real form emails continue to arrive after the FormSubmit activation workflow.

## 22. Priority 1 Completion Decision

Priority 1 complete with production verification pending. Local routing and configuration checks pass; Vercel behavior cannot be claimed until this local change set is deployed by the user.
