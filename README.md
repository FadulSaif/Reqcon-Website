# REQCON Website

REQCON's bilingual Swedish/English company website. The application is a React 19
single-page application that is statically prerendered with Vite and deployed to
Vercel.

## Local development

Requirements: a current Node.js LTS release and npm.

```bash
npm install
npm run dev
```

The development server prints the local URL. Swedish is the default language at
`/sv`; English is available at `/en`.

## Quality checks

```bash
npm run lint
npx tsc -b --pretty false
npm run test:routes
npm run build
```

There is no general unit-test script in the current project. `test:routes` verifies
the 46 localized routes shared by the sitemap and static-prerender configuration.
The production build also runs TypeScript before generating the static site.

## Static SEO build

The production build uses `@wroud/vite-plugin-ssg` to emit one static HTML document
for every localized public route. Route paths live in
`src/config/site-routes.json`; the build generates `public/sitemap.xml` from that
same manifest before prerendering. Add future localized article routes to this
manifest (or replace it with article data-derived route generation) before launch.

`/` is a Swedish fixed-default entry point: Vercel returns a 301 redirect to `/sv`.
Known legacy unprefixed public routes redirect to their `/sv/...` counterparts.
Vercel is the only deployment target.

The canonical production URL is read from `VITE_SITE_URL` when configured and
falls back to `https://reqcon-website.vercel.app`. Keep that environment variable
aligned with the final public domain before launch.

## FormSubmit activation and delivery note

The contact and careers forms send to `info@reqcon.se` through FormSubmit. The first
submission after activation prompts FormSubmit to send a confirmation email to that
inbox. A REQCON representative must click the confirmation link before FormSubmit
forwards subsequent submissions; this is a manual step and cannot be completed in
the application code.

FormSubmit is a third-party relay, so delivery depends on its sending reputation.
Early submissions may be delivered to spam until the sender is whitelisted. If form
volume grows, replace it with a transactional email provider such as Resend,
SendGrid, or Postmark.

### Required manual verification before Priority 1

After deployment and activation, submit one real contact inquiry and one real
application with a small PDF/DOC/DOCX attachment. Confirm both arrive at
`info@reqcon.se` (including its spam folder), and test the error path by temporarily
blocking the contact request or using a non-200 test response. The careers form uses
FormSubmit's normal multipart navigation so that the attachment is preserved; its
successful return goes to the careers success state, while an upstream delivery
failure is reported by FormSubmit's error response.
