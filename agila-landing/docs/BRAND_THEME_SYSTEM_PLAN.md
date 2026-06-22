# Agil Arbetskraft Brand Theme System Plan

## 1. Objective
The goal is to build a stable, reusable theme system and establish a robust architectural foundation before redesigning pages. This ensures that the final design is clean, professional, and scalable while adhering strictly to the official Agil Arbetskraft brand identity.

## 2. Official Brand Tokens
The final design system must use the official Agil colors. These will serve as the raw brand tokens:

* `brand.black`
  * CMYK: 75, 68, 67, 90
  * RGB: 0, 0, 0
  * HEX: #000000
  * PMS: Neutral Black C
* `brand.orange`
  * CMYK: 0, 40, 91, 0
  * RGB: 250, 166, 50
  * HEX: #FAA632
  * PMS: 804 C
* `brand.redOrange`
  * CMYK: 0, 74, 82, 0
  * RGB: 242, 104, 62
  * HEX: #F2683E
  * PMS: 1645 C

## 3. Semantic Colour Tokens
To prevent the website from becoming too aggressive with black and orange, semantic tokens will be created. The dark mode will favor deep navy/charcoal surfaces rather than pure black everywhere, while light mode will use off-white and warm neutral surfaces. Official `#000000` is reserved for text, logos, and specific dark elements. `#FAA632` is for primary CTAs, small highlights, icons, focus rings, and active states. `#F2683E` is used only as a controlled secondary accent. All combinations must pass accessibility contrast requirements.

* `background`: Light (Off-white / Warm neutral) | Dark (Deep Navy / Charcoal base)
* `backgroundMuted`: Light (Soft gray) | Dark (Darker Navy)
* `surface`: Light (White) | Dark (Soft Charcoal)
* `surfaceElevated`: Light (White with subtle shadow) | Dark (Lighter Navy)
* `textPrimary`: Light (`brand.black`) | Dark (Off-white)
* `textSecondary`: Light (Dark Gray) | Dark (Light Gray)
* `textMuted`: Light (Medium Gray) | Dark (Slate)
* `border`: Light (Light Gray) | Dark (Dark border outline)
* `borderStrong`: Light (Medium Gray) | Dark (White opacity)
* `primary`: `brand.orange`
* `primaryHover`: `brand.redOrange`
* `primaryText`: Light/Dark (White or Black depending on contrast)
* `accent`: `brand.redOrange`
* `accentSoft`: Low opacity version of accent
* `focusRing`: `brand.orange`
* `success`: Semantic green
* `warning`: Semantic yellow/amber
* `error`: Semantic red

## 4. Typography System
The official typeface is **Konnect Medium**.

* **Availability Check**: We must verify if local Konnect font files exist in the project (e.g., in `public/fonts` or `src/fonts`).
* **Implementation**: If available, they should be loaded via `next/font/local` for optimal performance. If not available, we must not download random external or unlicensed font files.
* **TODO**: Client must provide licensed Konnect Medium font files before production.

**Fallback Font Stack:**
`font-family: "Konnect", "Inter", "Avenir Next", "Helvetica Neue", Arial, sans-serif;`

**System Tokens:**
* Display heading style: Konnect Medium, tight tracking.
* H1 style: Konnect Medium, large, responsive scale.
* H2 style: Konnect Medium, section header size.
* H3 style: Konnect Medium, card header size.
* Body style: Fallback sans-serif (Inter) or Konnect for premium feel, relaxed line height.
* Small text style: Utility scale, legible tracking.
* Button text style: Konnect Medium, uppercase or title case, tracked out slightly.
* Navigation text style: Konnect Medium, crisp and subtle.

## 5. Theme Architecture
The best implementation approach relies on:
* **Tailwind CSS v4**: For responsive utility classes and managing the spacing scale.
* **CSS variables**: For dynamic switching between Light and Dark mode.
* **next-themes**: For handling the user-facing theme toggle and persisting user preferences.
* **Reusable React components**: To abstract layout and style logic away from page content.

Tokens should live primarily as **CSS variables** defined in `globals.css` and be mapped to **Tailwind theme configuration** within the PostCSS/Tailwind v4 setup. This provides the best of both worlds: Tailwind's utility class developer experience with CSS variables' dynamic runtime theme switching. Avoid repeated inline styling completely.

## 6. Required Reusable Components
* `ThemeProvider`: Wraps the application, providing `next-themes` context. (Keep existing)
* `SiteLayout`: A global wrapper managing sticky headers and page footers across all routes.
* `Navbar`: Main navigation, responsive, imports brand logos, adapts to theme. Replaces inline style bloat.
* `Footer`: Global footer with SEO-rich schema, links, and real company details.
* `Container`: `<div className="max-w-7xl mx-auto px-4">` wrapper to standardize page width.
* `Section`: `<section className="py-16 md:py-24">` wrapper for consistent vertical rhythm.
* `Button`: Accepts `variant="primary|secondary|ghost|outline"` and `size="sm|md|lg"`. Replaces global `.btn` CSS.
* `Card`: Standardized container with background, border, and subtle shadow based on the theme.
* `Badge`: Small pill tags for categories, statuses, or industries.
* `ThemeToggle`: Sun/Moon icon button for users to switch modes.
* `SEOHead` or metadata utility: Centralized Next.js `metadata` generator for dynamic page SEO.
* `Hero`: Modular hero block for the homepage, ready for redesign.
* `PageHeader`: Simple header for internal pages (e.g., Services, Industries).
* `CTASection`: Reusable banner to drive conversions at the bottom of pages.
* `FAQSection`: Reusable accordion list for GEO and Schema.org structured data.
* `ServiceCard`: Displays service info with icons/images.
* `IndustryCard`: Displays industry sectors.
* `ContactForm`: Abstracted out from `FinalContact.tsx` with accessible inputs and ARIA labels.

## 7. Cleanup Implementation Roadmap
* **Phase 1:** Backup and inspect current app.
* **Phase 2:** Define official brand tokens in CSS variables and Tailwind.
* **Phase 3:** Create typography setup with Konnect/fallback in `layout.tsx`.
* **Phase 4:** Standardise light/dark theme variables across the app.
* **Phase 5:** Create shared UI primitives (`Button`, `Container`, `Section`, `Card`).
* **Phase 6:** Replace hard-coded inline styles gradually by mapping sections to the new primitives.
* **Phase 7:** Convert `<img>` tags to Next.js `<Image>` where appropriate for performance.
* **Phase 8:** Prepare SEO/GEO metadata structure by splitting the single-page layout into distinct routes.
* **Phase 9:** Redesign the hero using the new system.
* **Phase 10:** Continue page-by-page redesign.

## 8. Styling Rules for Future Pages
* No hard-coded colours inside section components.
* No large inline style objects for layout.
* Use semantic tokens (e.g., `bg-surface`, `text-primary`).
* Use shared components (`<Container>`, `<Section>`).
* Keep orange controlled; don't use it as a massive background.
* Keep layouts responsive using Tailwind breakpoints (`md:`, `lg:`).
* Keep one H1 per page.
* Use accessible focus states (`focus-visible:ring-focusRing`).
* Use proper alt text on all images.
* Use semantic HTML (`<article>`, `<aside>`, `<nav>`).

## 9. SEO and GEO Preparation
The cleanup creates a scalable theme structure that supports:
* **Dedicated service pages**: E.g., `/services/construction` instead of a single long homepage.
* **Dedicated industry pages**: Deep links for specific sectors.
* **FAQ sections**: Implemented with `<details>` or accessible accordions ready for FAQPage schema.
* **Semantic sections**: Using proper `<section>`, `<article>`, `<header>` tags.
* **Local/service keywords**: Specific URLs mapped to Swedish cities or regions.
* **Metadata per page**: Next.js App Router `generateMetadata` for dynamic titles and descriptions.
* **Structured data readiness**: JSON-LD scripts injected per route (LocalBusiness, EmploymentAgency).
* **Internal linking**: Proper `href` usage between dedicated pages instead of hash `#` links.
* **Crawlable content**: Clean DOM tree with no hidden critical text.

*(Note: We will not invent fake addresses, fake reviews, fake ratings, fake statistics, or fake company claims. Placeholders will clearly mark where the client must provide real data.)*

## 10. Questions Before Coding
1. Are licensed Konnect Medium font files available?
2. Should the website be English-only, Swedish-only, or multilingual?
3. Is the agency targeting only businesses, or also job seekers?
4. Which Swedish cities or regions should be targeted for SEO/GEO?
5. Which industries are the most important?
6. Should the portfolio page stay in the navigation?
7. Are there real company details for footer/schema?
8. Should dark mode remain a user-facing feature?
9. Should the hero use stock images, real company images, or abstract brand visuals?
10. Should we keep Framer Motion or reduce animations for performance?

## 11. Final Recommendation
Do not redesign the hero until the brand theme system is approved. The next implementation step should be creating the official theme tokens, typography setup, and reusable UI primitives.
