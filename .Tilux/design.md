# LUMEN STUDIO - DESIGN BLUEPRINT
Source: user-provided exact design.md (Editorial E-Commerce Minimalist / Immersive 3D Digital Studio)
Adapted niche: Photography Studio

## 1. Design Philosophy & Aesthetic Blueprint
Primary Mood & Archetype: Editorial E-Commerce Minimalist / Immersive 3D Digital Studio.
Visual Density & Whitespace Ratio: High whitespace ratio with bold, oversized typographic elements framing a central product photography canvas.
Surface Elevation Model: Layered depth achieved using rounded container cards (border-radius: 36px), soft drop shadows, and delicate inner glassmorphic tooltips (backdrop-filter: blur(12px)).

## 2. Color Palette & Design Tokens
Primary Brand: #0047FF, Hover #003CE6, Active #0032C2, Subdued #E6ECFF
Accent: #2563EB (blue), #7C3AED (purple), #DC2626 (red)
Backgrounds: app #0047FF, surface-1 #FFFFFF, surface-2 #F0F4FF, surface-3 rgba(255,255,255,0.9)
Borders: base #E2E8F0, active rgba(0,71,255,0.4)
Text: primary #0F172A, muted #64748B, inverse #FFFFFF, accent #0047FF

CSS Custom Properties
:root {
  --color-primary: #0047FF;
  --color-primary-hover: #003CE6;
  --color-primary-active: #0032C2;
  --color-accent-blue: #2563EB;
  --color-accent-purple: #7C3AED;
  --color-accent-red: #DC2626;
  --color-bg-app: #0047FF;
  --color-surface-1: #FFFFFF;
  --color-surface-2: #F0F4FF;
  --color-surface-3: rgba(255, 255, 255, 0.9);
  --color-border-base: #E2E8F0;
  --color-border-active: rgba(0, 71, 255, 0.4);
  --backdrop-blur: blur(16px);
  --color-text-primary: #0F172A;
  --color-text-muted: #64748B;
  --color-text-inverse: #FFFFFF;
}

## 3. Typography System
Font: "Plus Jakarta Sans" (400,500,600,700,800)
Display 1: 10rem/160px, 800 ExtraBold, line-height 0.85, tracking -0.04em, lowercase (hero uses up to 14rem)
Heading 1: 2.25rem/36px, 700 Bold, 1.1, -0.02em
Heading 2: 1.5rem/24px, 600 SemiBold, 1.2, -0.01em
Body Large: 1rem/16px, 400, 1.5, 0
Body Regular: 0.875rem/14px, 400, 1.4, 0
Caption / Nav: 0.8125rem/13px, 500 Medium, 1.2, 0.02em

## 4. Spatial Grid & Layout
8pt scale: space-1 4px, space-2 8px, space-3 12px, space-4 16px, space-6 24px, space-8 32px, space-12 48px, space-16 64px
Breakpoints: sm 640, md 768, lg 1024, xl 1280, 2xl 1440
Section sequence: Outer Viewport -> App Window -> Header/Nav -> Hero Typographic Backdrop -> Central 3D Interactive Display -> Footer Bar

## 5. AI Design Traits & Symbols
Traits: oversized typography backdrop, floating glassmorphic tooltip hotspots, ambient color pickers, rounded organic window containers.
Pill badge: padding 6px 16px, 13px, 500, radius 9999px, bg #F1F5F9, border 1px #E2E8F0
Glyph safety: em-dash -> &mdash;, arrows -> SVG, plus -> SVG

## 6. Components
Main App Window: flex column, relative, z-index 10, max-width 1400px (1440 cap), margin 0 auto, height 100vh, padding 32px 48px, gap 32px, radius 36px, bg #fff, shadow 0 30px 60px rgba(0,0,0,0.12)
Navbar: flex row justify-between items-center, padding 24px 48px, gap 24px; nav 13px medium; logo bold 18px accent.
Hero: relative flex-1, center; giant bg text 14rem 800 #F8FAFC tracking tight; left copy panel max-w 320px; center display 420x380 radius 32px bg #EBF1FF with hotspots + tooltip + "Since 2015"; color switcher pill; right consultation widget max-w 280px bg #F4F7FF radius 24px padding 20px.
Footer: flex row justify-between items-center, padding 24px 48px, border-top 1px #F1F5F9; social circles; center scroll-top button accent.

Interactive states:
Primary Button: bg #0047FF white; hover scale 1.02 bg #003CE6; focus ring 2px #0047FF; active scale 0.98; disabled opacity 0.4
Secondary: border 1px #E2E8F0 transparent; hover bg #F1F5F9; focus ring; active scale 0.98
Card: bg #fff shadow sm; hover elevate -2px shadow md; focus ring

## 7. Motion
Easing: cubic-bezier(0.16, 1, 0.3, 1)
containerVariants: hidden {opacity 0, scale 0.98} visible {opacity 1, scale 1, duration 0.5, staggerChildren 0.1}
@keyframes floatGentle { 0,100 translateY(0); 50 translateY(-8px) } .animate-float 5s infinite

## 8. Accessibility
Primary btn text #FFF on #0047FF = 5.4:1 AA/AAA large
Secondary nav #64748B on #FFF = 7.5:1 AAA
Heading #0F172A on #FFF = 16.2:1 AAA
:focus-visible { outline: 2px solid #0047FF; outline-offset: 2px; }
