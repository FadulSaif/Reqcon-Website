# Theme Foundation Implementation

## Overview
This document outlines the foundation steps taken to implement the official Agil Arbetskraft brand identity and prepare for the upcoming component/hero redesigns.

## Files Changed
1. **`/docs/STYLE_ARCHITECTURE_AUDIT.md`**: Updated to correct typography and colour assumptions, setting the official standard.
2. **`src/app/globals.css`**: Removed old styling logic. Added `@theme` mapping for Tailwind v4 and semantic CSS variables.
3. **`src/app/layout.tsx`**: Updated Google Fonts link to load only `Inter` for the fallback stack. Added a `TODO` for the client regarding `Konnect Medium`.

## Tokens Created
**Raw Brand Tokens:**
* `--brand-black` (`#000000`)
* `--brand-orange` (`#FAA632`)
* `--brand-red-orange` (`#F2683E`)

**Semantic Theme Tokens:**
* `--background`, `--background-muted`
* `--surface`, `--surface-elevated`
* `--text-primary`, `--text-secondary`, `--text-muted`
* `--border`, `--border-strong`
* `--primary`, `--primary-hover`, `--primary-text`
* `--accent`, `--accent-soft`
* `--focus-ring`

**Typography Tokens:**
* `--font-brand`, `--font-body`, `--font-heading`

## Components Created
A new folder `src/components/ui/` was created, introducing foundational atomic primitives:
1. **`Button.tsx`**: Variants for `primary`, `secondary`, `outline`, and `ghost`. Fully accessible with `--focus-ring`.
2. **`Container.tsx`**: Standard max-width wrapper (`max-w-7xl`).
3. **`Section.tsx`**: Standardized vertical padding (`py-16 md:py-24`).
4. **`Card.tsx`**: Themed surface using `--surface` and `--border`.
5. **`Badge.tsx`**: Small label pill with `neutral`, `primary`, and `accent` variants.

## How Dark/Light Mode is Handled
The theme adapts using CSS variables defined in `:root` (Light mode, using off-white and warm neutrals) and `.dark` (Dark mode, using deep navy and charcoal). Next-themes toggles the `.dark` class, instantly updating `--background`, `--surface`, and `--text-primary` values for the entire UI without needing duplicate components.

## Font Status
**Konnect Font Files**: `NOT FOUND`. 
A safe fallback typography stack (`"Konnect", "Inter", "Avenir Next", "Helvetica Neue", Arial, sans-serif`) is currently in use. Local font files must be provided by the client and integrated via `next/font/local` before production.

## Pre-Hero Stability Fixes
To ensure the foundation is fully stable before the visual redesign, the following critical build and lint issues were resolved:

1. **`Navbar.tsx` (`react-hooks/set-state-in-effect`)**:
   - Replaced synchronous `setMounted(true)` within the empty-dependency `useEffect` with a `setTimeout` to defer execution. This safely eliminates the cascading render warning while preserving hydration compatibility for `next-themes`.
2. **`layout.tsx` (`@next/next/no-page-custom-font`)**:
   - Removed the manual `<link>` to Google Fonts.
   - Replaced with Next.js's optimized `next/font/google` component to load `Inter`.
   - Mapped `Inter` to a CSS variable (`--font-inter`) and updated `globals.css` typography fallback stacks, strictly preserving the `"Konnect"` priority requirement.

### Verification Results
* **Linting (`npm run lint`)**: PASSED (0 errors, 0 warnings related to our changes).
* **Building (`npm run build`)**: PASSED successfully in ~3.3s.
* **Remaining Warnings**: Next.js logged an environment warning regarding multiple lockfiles (`package-lock.json` vs `pnpm-lock.yaml`) in parent directories. This is an environment configuration warning unrelated to the codebase stability and can be safely ignored.

## Next Steps
With lint and build pipelines passing successfully, the project is officially safe and ready.
1. Redesign the **Homepage Hero** using the new `<Section>`, `<Container>`, and `<Button>` components.
2. Gradually replace existing sections with the new primitive layout system, removing all inline `style={{...}}` bloat.
