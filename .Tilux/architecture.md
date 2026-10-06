# LUMEN STUDIO: MASTER ARCHITECTURE & EXECUTION PLAN (v3)

## 1. Objective
A full, multi-section editorial photography studio website. Real photography imagery throughout, zero placeholder gradients, zero em dashes, and a 3D scroll driven motion system.

## 2. File Structure
- index.html      -> semantic markup for all 18 sections plus 3 overlays
- styles.css      -> design token system, fluid typography, 3D motion, responsive
- script.js       -> scroll engine, 3D rail, tilt, carousel, counters, forms
- images/         -> 36 real photographs, 144 optimised derivatives (lg/md/sm/sq)
- .Tilux/         -> project state (design.md, answers.json, architecture.md, images/)

## 3. Section Sequence
1.  Scroll progress bar
2.  Sticky navigation header (glass, condensing on scroll)
3.  Hero: giant typographic backdrop, featured frame, hotspots, grade switcher, consult widget
4.  Client marquee ribbon (infinite 3D perspective scroll)
5.  Statement band with reveal-mask headline and parallax
6.  Selected work: sticky horizontal scroll 3D rail (6 frames)
7.  Portfolio archive: filterable grid, 20 real photographs, 5 categories
8.  Services and packages: 3 tiered cards
9.  Process: sticky numbered rail with scrolling 3D step panels
10. About: layered parallax imagery plus animated stat counters
11. Showreel banner (dark, 3D perspective frame)
12. Testimonials: 3D rotating carousel
13. Team: 6 members with real portraits
14. Awards and recognition list with hover reveal
15. Journal: 3 recent entries
16. Instagram grid: 6 square frames
17. FAQs accordion
18. Contact: info panel plus validated enquiry form
19. CTA band
20. Footer: newsletter, socials, scroll to top, grade cyclers

## 4. 3D Scrolling Motion System
- Scroll progress bar sweeping the top edge
- Depth parallax: elements carry data-parallax speeds, transformed each frame
- 3D card entrance: perspective rotateX and lift, eased with cubic-bezier(0.16,1,0.3,1)
- Sticky horizontal rail: vertical scroll drives horizontal travel, each card rotates on Y by its distance from centre and scales by depth
- Pointer tilt: data-tilt cards rotate on X and Y toward the cursor with a lerp settle
- Hero depth: backdrop type scales and recedes, frame recedes and lifts on scroll
- 3D testimonial ring: rotateY carousel with depth stacking
- Stat counters animate once in view
- Mask reveal headlines clip from below
- Reduced motion honoured: all transforms and the rail degrade to static

## 5. Interactive Element Inventory (no dummies)
- Nav links smooth scroll to real section IDs
- Search button opens overlay filtering the 20 item archive live
- Account button opens an accessible info popover
- Contact button scrolls to the contact form
- Grade swatches and footer arrows retint the hero frame live
- Hotspots toggle glassmorphic tooltips
- Request a Call opens a validated booking modal
- Filter chips filter the archive by category, empty state handled
- Every archive tile opens a lightbox with real photo, notes and a booking handoff
- FAQ accordion with aria-expanded
- Journal, Instagram, awards and social links resolve to real destinations
- Contact form validates and returns a success state
- Newsletter form validates and confirms
- Scroll to top button

## 6. Imagery Manifest (real photographs)
Hero portrait, 6 rail frames, 20 archive frames across portrait/editorial/wedding/product/landscape, 3 service frames, 4 process frames, 2 parallax about frames, 1 showreel frame, 3 testimonial avatars, 6 team portraits, 3 journal frames, 6 instagram squares, 1 CTA frame.

## 7. Accessibility
Focus-visible rings on all controls, aria attributes on accordion, modals, carousel and switchers, semantic landmarks, descriptive alt text on every photograph, responsive from 360px up, contrast held to WCAG AA.
