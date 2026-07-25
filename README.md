# REQCON Website

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## Static SEO build

The production build uses `@wroud/vite-plugin-ssg` to emit one static HTML document
for every localized public route. Route paths live in
`src/config/site-routes.json`; the build generates `public/sitemap.xml` from that
same manifest before prerendering. Add future localized article routes to this
manifest (or replace it with article data-derived route generation) before launch.

`/` is a Swedish fixed-default entry point: Vercel returns a 301 redirect to `/sv`.
Known legacy unprefixed public routes redirect to their `/sv/...` counterparts.
Vercel is the only deployment target.
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
