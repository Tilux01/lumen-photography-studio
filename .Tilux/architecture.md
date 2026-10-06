# LUMEN STUDIO - MASTER ARCHITECTURE & EXECUTION PLAN

## 1. Objective
Build a fully functional, single-page editorial website for a photography studio called "lumen studio." using the exact user-provided design.md blueprint.

## 2. File Structure
- index.html      -> semantic markup, all sections
- styles.css      -> full design token system, layout, motion, a11y, responsive
- script.js       -> nav, smooth scroll, color grade switcher, hotspots, gallery filter, form validation, scroll reveal, scroll-to-top
- hero.jpg        -> generated editorial hero photograph
- .Tilux/         -> project state (design.md, answers.json, architecture.md, images/)

## 3. Section Sequence (mirrors design.md layout order)
1. Outer viewport (blue canvas #0047FF)
2. App window container (white, radius 36px, shadow)
3. Navigation header (home/about/faqs | logo | portfolio/team/contact)
4. Hero: giant typographic backdrop + left copy panel + central featured photo canvas (hotspots, tooltip, color grade switcher) + right consultation widget
5. Portfolio section (#products) - masonry grid + filter chips
6. About section (#about)
7. Team section (#team)
8. FAQs section (#faqs) - accordion
9. Contact section (#contact) - form
10. Footer bar (socials, scroll-top, prev/next)

## 4. Interactive Element Inventory (no dummies)
- Nav links -> smooth scroll to sections (all anchors resolve to real IDs)
- Home pill -> scroll to top
- Search button -> opens inline search overlay filtering portfolio
- Account button -> opens a small a11y-friendly info popover (booking account note)
- Contact button -> scrolls to contact section
- Color grade swatches -> apply CSS filter/tint to the hero image live
- Hotspots (+) -> toggle glassmorphic tooltips
- "View All Collections"/portfolio button -> scroll to portfolio
- "Request a Call" -> opens booking modal with form validation
- Gallery filter chips -> filter portfolio items by category
- FAQ accordion -> expand/collapse with aria-expanded
- Contact form -> client-side validation + success state
- Footer socials -> real link hrefs
- Scroll top button -> smooth scroll to top
- Prev/Next buttons -> cycle portfolio highlight

## 5. Motion
- Page entrance fade/scale (container variants)
- Staggered child reveal on scroll (IntersectionObserver)
- floatGentle keyframe on hero tooltip artifacts
- cubic-bezier(0.16, 1, 0.3, 1) transitions

## 6. Accessibility
- focus-visible outlines, aria attributes on accordion/modal/switchers
- semantic landmarks, alt text on all imagery
- responsive down to 640/768/1024 breakpoints
