# Hero, Navbar, Motion & Dark Mode Fix Plan

## 1. Current Code Findings
The current hero section (`src/components/sections/HeroSection.tsx`) uses a large centered `<motion.div>` with a video background (`top.mp4`). It relies on inline React styles for layout padding and an embedded `rgba(0,0,0,0.7)` linear gradient overlay. The CTA buttons inside the hero use legacy global CSS classes (`btn-primary`, `btn-outline-hero`) directly on raw `<a>` tags.
The navbar (`src/components/sections/Navbar.tsx`) sits atop the hero and uses React state (`onMouseEnter`) to manually swap colors on hover. 
The global theme tokens (`src/app/globals.css`) define the semantic system, but the hero and navbar components are currently hard-coded, ignoring these tokens. The new button primitive (`src/components/ui/Button.tsx`) exists but is not yet implemented in these sections.

## 2. Current Visual Problems
- **Light mode hero button alignment**: The CTA buttons inside the hero are not aligned to a modern flex grid; they rely on basic wrapping which can look inconsistent on different screen sizes.
- **Secondary CTA visibility**: The "View Industries" button uses `.btn-outline-hero`, rendering white text on a transparent background, which washes out against lighter frames of the video background.
- **CTA sizing and spacing**: Hard-coded padding makes the primary and secondary buttons feel unbalanced in height and width.
- **Dark mode navbar blending into hero**: Because both the hero overlay and the scrolled navbar background are very dark, the navbar lacks visual separation from the hero video.
- **Dark mode hero overlay**: The hero overlay is a heavy black gradient (`rgba(0,0,0,0.7)`), making the design feel flat, oppressive, and not premium.
- **Dark mode secondary CTA visibility**: Similarly, the white outline button struggles against the heavy black overlay.
- **Background below hero in dark mode**: It currently transitions into a deep color, but the hero itself needs to seamlessly match the newly defined `--background` token.
- **Navbar hover/active state weakness**: The text simply changes color instantly without animation, lacking a premium feel.
- **Motion limitations**: Button hover states lack micro-interactions (like lift or scale), making them feel static.

## 3. Root Cause Analysis
- **Weak secondary button style**: `.btn-outline-hero` only uses a 1px border and transparent background, failing accessibility contrast checks on dynamic video backgrounds.
- **Inconsistent CTA sizing**: Using legacy global `.btn` classes instead of the new unified `Button.tsx` primitive sizes.
- **Overlay too dark or not theme-aware**: The `HeroSection.tsx` hard-codes `rgba` gradients in inline styles, ignoring the `next-themes` context.
- **Navbar background/separation issue**: `.navbar-scrolled` lacks a sufficient border or drop-shadow to separate it from the hero.
- **Nav items lacking animated active/hover state**: Reliance on JS `onMouseEnter` rather than CSS transitions or pseudo-elements.
- **Hard-coded colours or rgba values**: Components rely on `style={{ color: "rgba(255,255,255,0.55)" }}`.
- **Motion not coordinated**: Missing cohesive CSS transitions on interactive elements.
- **Inline styles preventing consistent design tokens**: Extensive use of the `style` prop prevents Tailwind classes from applying global spacing and theme variables.

## 4. Controlled Fix Strategy
- **Keep the large rounded hero image/card**: Retain the `calc(100% - 3rem)` rounded video wrapper.
- **Keep the centred hero composition unless only minor spacing is needed**: Retain the center-aligned H1 and subtitle.
- **Improve CTA row alignment**: Use a flex container with Tailwind `gap-4` for perfectly aligned buttons.
- **Make “View Industries” visible in light and dark mode**: Upgrade it to a frosted-glass or semi-transparent filled background.
- **Improve dark mode overlay and page background**: Utilize `--background` (Deep Navy) to tint the overlay rather than pure black. Add a subtle blur to the navbar.
- **Add professional nav hover/active animation**: Implement a CSS `::after` animated underline.
- **Add subtle motion only**: Add a subtle hover lift to CTAs.
- **Avoid layout shift**: Fixed height for nav underlines so text doesn't jump.
- **Avoid horizontal overflow**: Ensure CTA flex container correctly wraps or stacks on mobile.
- **Avoid navbar overlap**: Maintain current `paddingTop: clamp(...)` to keep hero content below the fixed header.

## 5. Button Improvement Plan
We will fix the CTA styling inside `HeroSection.tsx` by importing the new `src/components/ui/Button.tsx`. To support anchor links, we will update `Button.tsx` to accept an `asChild` prop or export its `buttonVariants` so `<a>` tags can consume the exact same styling classes.
- **Primary CTA**: Apply `variant="primary"` and `size="lg"`.
- **Secondary CTA**: Update `Button.tsx` to include a `glass` variant (or update `secondary`), featuring a semi-transparent background (`bg-white/10`) and a solid border, ensuring contrast against the video.
- **Button height**: Standardized by `size="lg"` (e.g., `py-4`).
- **Button padding**: Standardized by `size="lg"` (e.g., `px-8`).
- **Button gap**: Use `<div className="flex flex-col sm:flex-row gap-4">`.
- **Text contrast**: Guarantee white text on the secondary button, and black text on the orange primary button.
- **Hover state**: Add `hover:-translate-y-1` and `hover:shadow-lg`.
- **Focus-visible state**: Standardized `focus-visible:ring-focus-ring`.
- **Mobile stacking**: `flex-col` ensures they stack full-width on mobile.
- **Dark mode behaviour**: The glass secondary button naturally adapts to the dark video background.

## 6. Navbar Interaction Plan
**Option 1: CSS Animated Underline**
- **Visual description**: An orange 2px line scales out from the center below the nav link on hover.
- **Pros**: Zero JS overhead, extremely performant, no layout shifts, highly accessible.
- **Cons**: Slightly traditional look.
- **Light mode behaviour**: Clean orange line against white/transparent nav.
- **Dark mode behaviour**: Orange line pops against dark nav background.
- **Mobile impact**: Hover effects are disabled via media queries.
- **Performance impact**: Minimal (hardware-accelerated `transform: scaleX`).

**Option 2: Framer Motion Sliding Pill**
- **Visual description**: A frosted background pill slides behind hovered items.
- **Pros**: Highly modern, premium feel.
- **Cons**: Requires React state and adds JS payload to the navbar.
- **Light mode behaviour**: Soft gray background.
- **Dark mode behaviour**: Soft navy/slate background.
- **Mobile impact**: Hidden on mobile.
- **Performance impact**: Higher cost due to `layoutId` calculations on scroll/hover.

**Recommendation:** **Option 1 (CSS Animated Underline)**. It is elegant, robust, and aligns with the professional, lightweight Scandinavian design requirement without overusing Framer Motion.

## 7. Dark Mode Improvement Plan
- **Header/nav separation**: Update `.navbar-scrolled` to use `--surface-elevated` with a 1px `--border-strong` bottom border.
- **Hero overlay opacity**: Update the inline gradient from pure black to `linear-gradient(to top, rgba(11,17,32,0.8), rgba(11,17,32,0.3))`, tinting it with our Deep Navy base.
- **Hero text contrast**: Ensure hero text forces white (`text-white`) since it always sits on a dark video.
- **CTA contrast**: The orange CTA will remain vibrant and legible.
- **Secondary button contrast**: The glass variant ensures it doesn't get lost in the dark video.
- **Background below hero**: Will seamlessly match the Deep Navy overlay.
- **Border/shadow treatment**: Soften shadows and use translucent borders (`rgba(255,255,255,0.1)`).
- **Deep navy/charcoal surfaces**: Utilized across all surfaces in dark mode, strictly avoiding `#000000` except for text on orange elements.
- **Controlled orange usage**: Used only for the Primary CTA, Navbar underline, and active states.

## 8. Motion Plan
- **Hero content entrance**: Retain the current `y` axis slide up, but refine the Framer Motion transition easing to `[0.25, 1, 0.5, 1]`.
- **CTA hover motion**: Use standard Tailwind `transition-transform duration-300 hover:-translate-y-1`.
- **Navbar hover underline motion**: `transition: transform 0.3s ease-out`.
- **Image hover or background motion only if safe**: We will keep the video static as a background; no parallax to avoid scroll jank.
- **Reduced-motion support**: Use `@media (prefers-reduced-motion: reduce)` via Tailwind's `motion-reduce:transform-none` to disable the CTA lift and underline animation for users who need it.
- **Framer Motion usage only if already present and appropriate**: Keep it for the hero initial load, but use CSS for hover states.

## 9. Responsive Plan
- **Desktop**: Hero max-width `1800px`, CTAs in a row (`flex-row`), nav centered.
- **Tablet**: Adjust `paddingTop` so the hero doesn't consume the entire vertical height unnecessarily.
- **Mobile**: CTAs stack vertically (`flex-col`) with `w-full`. The rounded hero card loses horizontal margins to maximize video width.
- **Risks to avoid**:
  - **Clipping**: Hero will use `min-h-[80vh]` rather than a fixed pixel height to ensure content always fits.
  - **Overflow**: `<Container>` wrapper ensures text doesn't touch screen edges.
  - **Navbar overlap**: Hero padding-top will be calculated to stay clear of the 72px navbar.
  - **Hero too tall**: Max-height will be capped to prevent stretching on ultrawides.
  - **CTA wrapping badly**: Stacking them to `w-full` on mobile guarantees they don't break awkwardly.
  - **Unreadable text / dark mode contrast failure**: Fixed by the frosted glass secondary CTA and navy video overlay.

## 10. Accessibility Plan
- **Colour contrast**: The new `brand-orange` on `brand-black` text passes WCAG AA.
- **Keyboard focus states**: Nav links and CTAs will use `focus-visible:ring-2 focus-visible:ring-brand-orange focus:outline-none`.
- **Semantic links/buttons**: CTAs will remain semantic `<a>` tags since they link to sections (`#contact`), but will visually look like buttons.
- **Reduced-motion support**: All hover transitions will respect `prefers-reduced-motion`.
- **Readable text sizes**: Hero heading uses responsive `clamp()` to ensure it scales correctly without dropping below legible limits.
- **No hover-only critical information**: The nav underlines are purely decorative; text remains fully visible without hover.

## 11. Implementation Steps
1. Update `src/components/ui/Button.tsx` to export a variant generator or accept an `asChild` prop to style the anchor tags safely.
2. Update `src/components/sections/Navbar.tsx` to remove JS hover handlers, apply CSS underlines, and improve dark mode backdrop blur and border.
3. Update `src/components/sections/HeroSection.tsx` to replace the inline pure-black gradient with a theme-aware Navy gradient.
4. Update `HeroSection.tsx` CTA row alignment by applying a `flex flex-col sm:flex-row gap-4` container and utilizing the new Button classes.
5. Test light mode.
6. Test dark mode.
7. Test responsive sizes (ensure mobile CTAs stack).
8. Run lint/build.

## 12. Files Expected To Change Later
- `src/components/sections/HeroSection.tsx`
- `src/components/sections/Navbar.tsx`
- `src/components/ui/Button.tsx`
- `src/app/globals.css` (to add the nav underline CSS logic if not using Tailwind utilities inline)

## 13. Acceptance Criteria
- Light mode hero remains close to the current approved design.
- CTA buttons align cleanly.
- “View Industries” is visible in both modes.
- Navbar hover/active state is animated and clear.
- Dark mode hero looks premium, not flat or harsh.
- No horizontal overflow.
- No clipped content.
- No navbar overlap.
- Mobile layout remains clean.
- Lint passes.
- Build passes.

## 14. Questions Before Coding
1. **Button Anchor Support**: Do you prefer I implement a `buttonVariants` utility in `Button.tsx` (using `cva` or standard template literals) so we can apply the exact Button CSS to the `<a>` tags in the hero, or should I change the `<a>` tags to `<button>` elements wrapped around links?
2. **Video Asset**: I will keep `top.mp4` as the background video. Is this correct?

Waiting for approval before implementation.
