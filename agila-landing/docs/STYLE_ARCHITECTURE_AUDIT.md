# Agil Arbetskraft Style & Architecture Audit

## Official Brand Correction
The initial audit below detected the current project colours (such as `#D97706` and `#B45309`) and typography (`Outfit` / `Inter`). However, the final design system must strictly follow the official Agil brand identity. The previously suggested colours and fonts from the codebase are not the final brand decisions.

The official Agil brand identity uses:
* **Neutral Black C** (`#000000`)
* **Brand Orange** (`#FAA632`)
* **Red-Orange Accent** (`#F2683E`)
* **Konnect Medium** (Official typeface)

All future cleanups, styling, and redesigns will transition the codebase to these official brand tokens, avoiding an overly aggressive black-and-orange aesthetic to ensure a premium, clean, Scandinavian corporate feel.

## 1. Project Overview
The project is built using **Next.js 16.2.9 (App Router)** and **React 19**, incorporating **Tailwind CSS v4** and **Framer Motion** for animations. The application currently functions as a single-page website where `src/app/page.tsx` renders a `LandingPage` component that stacks multiple section components on top of each other. While Next.js App Router provides powerful routing capabilities, the current architecture heavily relies on `#hash` navigation within a single view.

## 2. Current File Structure
```text
agila-landing/
├── public/
│   ├── assets/            (Contains heavy images and top.mp4 video)
│   └── ...svg icons
├── src/
│   ├── app/
│   │   ├── globals.css    (Core CSS variables and global classes)
│   │   ├── layout.tsx     (Next.js root layout, SEO metadata, ThemeProvider)
│   │   └── page.tsx       (Entry point, imports LandingPage)
│   └── components/
│       ├── logos/         (LogoReversed.tsx, LogoSymbol.tsx)
│       ├── sections/      (Navbar, Hero, FinalContact, Services, etc.)
│       ├── LandingPage.tsx
│       └── theme-provider.tsx
├── next.config.ts
├── package.json
└── tailwind.config / postcss / eslint setups
```

## 3. File-by-File Review

| File Path | Purpose | Styling Handled By | Hard-Coded Colors? | Dark/Light Mode | SEO/GEO Impact | Recommendation |
| --- | --- | --- | --- | --- | --- | --- |
| `src/app/globals.css` | Defines CSS vars, typography, and core `.btn` / `.section` classes. | Global CSS | Yes (in variables and some `.text-orange` utilities) | Yes (using `.dark` overrides) | Global font loading | Clean up and migrate most utilities to Tailwind CSS. |
| `src/app/layout.tsx` | Root layout, metadata, theme provider. | Tailwind (`antialiased`) | No | Yes (wraps `ThemeProvider`) | High (Contains main `<title>`, `<meta>`, OpenGraph) | Keep, but expand with structured data schema and dynamic meta. |
| `src/app/page.tsx` | Homepage entry. | None | No | No | High (Serves the entire site) | Split into multiple pages for GEO. |
| `src/components/LandingPage.tsx` | Aggregates sections. | None | No | No | High (Content hierarchy) | Break apart to support internal linking. |
| `src/components/sections/HeroSection.tsx`| Hero video and main CTA. | Heavy inline styles | Yes (`rgba` gradients) | Yes (`var(--bg-primary)`) | High (H1 tag) | Refactor into reusable Hero component. Move inline styles to Tailwind. |
| `src/components/sections/FinalContact.tsx`| Form and contact image. | Mixed (Global CSS + Inline) | Yes (`rgba` overlays) | Yes (`var(--bg-elevated)`) | Medium (Lead generation) | Split into `ContactForm` component. Replace standard `<img>` with Next.js `<Image>`. |
| `src/components/sections/Navbar.tsx` | Sticky navigation pill. | Mixed | Yes (`rgba(255,255,255,0.55)`) | Yes (uses `useTheme`) | Medium (Internal linking) | Convert into a reusable Layout wrapper. Remove inline JS scroll listeners in favor of CSS or Framer Motion variants. |

## 4. Current Styling System
The project is currently using **mixed styling architectures**, which is causing bloat and technical debt:
- **Global CSS:** `globals.css` defines root variables and broad component classes like `.btn`, `.btn-primary`, and typography classes (`.heading-hero`).
- **Inline Styles:** Almost all layout and spacing inside components (e.g., `HeroSection.tsx`, `Navbar.tsx`) are handled with extensive inline React styles (`style={{ display: "flex", alignItems: "center" }}`).
- **Tailwind CSS:** Despite being installed (`@tailwindcss/postcss`), Tailwind utility classes are rarely used in the codebase.
- **Theme Variables:** Colors are mapped well to variables (e.g., `var(--bg-primary)`), which allows for easy dark mode toggling.

## 5. Current Colour Usage
The current palette uses a stark contrast approach based on Slate and Amber/Orange.
- **`--brand-primary` (#D97706)**: Rich Amber. Used for buttons, selections, accents.
- **`--brand-accent` (#B45309)**: Darker Amber. Used for hover states.
- **`--bg-primary` (#F8FAFC / #0F172A)**: Main background.
- **`--bg-card` (#ffffff / #020617)**: Deep black in dark mode creates a very harsh contrast against the orange.
- **`--text-primary` (#0F172A / #F8FAFC)**: Main text.

**Assessment:** The heavy reliance on pure black (`#020617`) and bright orange creates an aggressive aesthetic that risks looking unprofessional or like adult entertainment. Orange should be retained purely as a controlled brand accent, while the main background should shift toward warmer, softer neutrals and deep navy/charcoal grays to create a premium Scandinavian corporate feel.

## 6. Dark Mode and Light Mode Audit
- **Trigger mechanism:** Handled seamlessly by `next-themes` and a `ThemeProvider`.
- **Theme state:** Global, relying on the `.dark` class injected into the `<html>` element.
- **Component support:** Most components use CSS variables (`var(--text-primary)`), allowing them to support dark mode automatically.
- **Issues:** Inline styling uses some hard-coded rgba values (e.g., `rgba(255, 255, 255, 0.55)`) which do not invert properly in Light Mode, causing contrast issues (e.g., white text on white backgrounds).

## 7. Component Reusability Audit
**Existing Reusable Components (Keep):**
- `ThemeProvider`
- `LogoSymbol` / `LogoReversed`

**Components to Create (Plan):**
- `Button`: Unified variants (primary, secondary, ghost, outline) to replace global CSS `.btn` classes.
- `Container` / `SectionWrapper`: To handle `max-width` and standard spacing (`clamp()` values) without inline styles.
- `Typography`: Standardized H1-H6, Body, Label wrappers.
- `Input` / `Textarea`: Reusable form elements with proper focus states.
- `Card`: For services, industries, and portfolios.
- `SEOHead`: Dynamic metadata injector.
- `Layout`: Shared Header/Footer wrapper for routing.

## 8. Recommended Design System Direction
To achieve a clean, Scandinavian, premium, and trustworthy corporate look:
- **Primary Base (Dark Mode):** Soft Deep Navy (`#0B1120`) instead of pitch black.
- **Primary Base (Light Mode):** Soft Off-White (`#FAFAFA`) instead of stark white.
- **Brand Accent:** Keep Agil Orange but restrict its usage to small interactive elements (CTAs, subtle underlines, active states).
- **Typography:** Retain `Outfit` for headings and `Inter` for body text, but tighten line heights and reduce the weight of heavy bold fonts.
- **Spacing:** Migrate entirely to Tailwind CSS spacing tokens (`p-8`, `gap-6`) to enforce a consistent rhythm. Stop using arbitrary inline `clamp()` functions in every component.
- **Borders/Shadows:** Use subtle, feathered shadows and minimal 1px borders with low opacity (`border-white/10` in dark mode).

## 9. SEO and GEO Architecture Audit
**Current Status: POOR**
- **Single Page Structure:** All industries and services are crammed onto the homepage. This limits indexing for specific keywords (e.g., "construction staffing Sweden").
- **Heading Hierarchy:** Multiple sections might be abusing `<h2/>` and `<h3/>` tags without a logical semantic flow.
- **Missing Pages:** No dedicated `/services`, `/industries`, `/about`, or `/faq` pages.
- **Meta Data:** Static description in `layout.tsx`. No OpenGraph images defined.
- **Structured Data:** Missing JSON-LD Schema (LocalBusiness, EmploymentAgency, JobPosting).

**GEO Strategy Needs:** Dedicated service and location pages (e.g., `/services/construction-staffing-stockholm`), a robust FAQ section, and semantic HTML (`<article>`, `<aside>`, `<nav>`).

## 10. Performance Audit
- **Image Optimization:** Components like `FinalContact` and `HeroSection` use native HTML `<img>` tags. This bypasses Next.js Image Optimization, leading to massive, uncompressed images loading on the client.
- **Video Background:** `top.mp4` loads immediately without deferment, slowing down the First Contentful Paint (FCP).
- **Inline CSS Bloat:** Writing styles inline prevents the browser from caching CSS rules effectively.
- **Unnecessary re-renders:** Hard-coded inline style objects in React cause unnecessary component re-renders on state changes (e.g., scroll listeners in `Navbar.tsx`).

## 11. Accessibility Audit
- **Contrast:** The stark orange on black is readable, but orange on white (or white on light backgrounds due to hard-coded rgba) fails WCAG AA contrast ratios.
- **Semantic HTML:** The form in `FinalContact.tsx` lacks `aria-required`, `aria-invalid`, and semantic error boundaries.
- **Alt Text:** Some images use generic alt text ("Agil Team").
- **Focus States:** Custom outline overrides might prevent keyboard users from navigating the site effectively.

## 12. Cleanup Plan Before Redesign
1. **Stabilise Theme Tokens:** Move all CSS variables from `globals.css` into Tailwind CSS theme configuration (`tailwind.config.ts` or PostCSS v4 theme tokens).
2. **Remove Inline Styles:** Strip inline `style={{...}}` blocks across all sections and replace them with Tailwind utility classes.
3. **Create Shared Layout Primitives:** Build `Container.tsx` and `Section.tsx` to handle padding and max-width globally.
4. **Create Atomic Components:** Build `Button.tsx`, `Input.tsx`, and `Card.tsx`.
5. **Standardise Dark/Light Mode:** Ensure all colors rely on `dark:bg-navy-900 bg-slate-50` Tailwind classes or robust CSS variables rather than hard-coded `rgba()`.
6. **Next.js Image Migration:** Replace all `<img>` tags with `next/image` to fix performance bottlenecks.
7. **SEO Routing Scaffold:** Create folders for `/services/[slug]` and `/industries/[slug]` to prepare for multi-page routing.
8. **Then, redesign the hero.**

## 13. Questions Before Implementation
- **Brand Colors:** Can we slightly desaturate the orange or shift the dark mode to a Navy/Charcoal base to make it more Scandinavian?
- **Company Identity:** Do we have real contact details, addresses, and registration numbers for the LocalBusiness schema and footer?
- **Routing & Content:** Are we authorized to convert this single-page landing site into a multi-page routing structure for GEO/SEO benefits?
- **Multilingual Support:** Will this site need `next-intl` for Swedish/English translations?
- **Target Audience:** Does Agil target B2B (companies needing staff) exclusively, or B2C (job seekers) as well? The UI flow differs drastically between the two.

## 14. Recommended Next Step
Do not redesign the hero yet. First approve the cleanup/design-system plan, then implement the shared theme/components, then rebuild the hero using the new system.
