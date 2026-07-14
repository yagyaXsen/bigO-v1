# Page Topology — Azurio (Software Development Company)

**Target:** https://azuris-nextjs.vercel.app/index-software-development-company
**Full height:** ~16,400px desktop @1440. **Body bg:** `rgb(238,234,232)` (warm off-white `#EEEAE8`).
**Design language:** Swiss/editorial. Manrope (display+body) + JetBrains Mono (labels/eyebrows/tags). Heavy GSAP animation, Lenis smooth scroll.

## Global overlays (fixed, above flow)
- **Page-transition overlay** — `.mxd-page-transition`, fixed, z-999, black. Plays on route change (cover/uncover). Low priority for clone.
- **Fullscreen menu** — `.mxd-menu.mxd-menu--gsap`, fixed, z-11. Opened by hamburger. Contains looping `900x1280_menu.mp4` video + nav list (Home, Branding studio, Software development company, Creative…) + socials. GSAP reveal.
- **Header** — `#header.mxd-header`, absolute top, z-1, transparent, height 70px. Left: pixel-art SVG logo + "Azurio / Template" (scramble text). Right: "Say Hello" link (→/contact) w/ icon, "Night" color-switcher toggle, hamburger. Does NOT change bg on scroll (stays transparent overlay).

## Flow sections (top → bottom)
| # | Name | Working id | ~Range px | Interaction model |
|---|------|-----------|-----------|-------------------|
| 1 | **Hero** | `HeroSection` | 0–1710 | static + video; giant H1 overlaid on centered hero video via `mix-blend-mode`. Side labels `[ STUDIO ]` `[ WORKS ]`. Bottom: social row (Dribbble/Behance/Github/Codepen/Figma Community) + "Scroll to explore" |
| 2 | **About** (`A/01`) | `AboutSection` | 1710–2799 | static reveal. Big section counter "A/01", intro paragraph w/ highlighted spans, 2×2 **stats grid** (50+, 86%, 5+, 70+ with mono captions) |
| 3 | **Niche cards** | `NicheCards` | 2799–3864 | static masonry. Cards: Fintech, AI-powered solutions, Cybersecurity (dark card), Game Industry — each = tag list + description + illustration (`niche01-04.webp`) |
| 4 | **Capabilities** (`C/02`) | `CapabilitiesSection` | 3864–7415 | scroll-reveal list. Header "Our capabilities". 7 numbered rows [01]–[07]: Software development, Web app development, Mobile app development, UI/UX design, Software testing, Generative AI development, Data engineering. Each row: big title (left) · image `cpb0N.webp` (center) · description + 2-col mono tags (right). Divider lines between. |
| 5 | **Divider image A** | `DividerImage` | 7415–8175 | full-bleed image (`1920x1080_dv01`-style, woman+earbuds). Parallax. |
| 6 | **Case studies** (`W/03`) | `CaseStudies` | 8175–10650 | **PINNED / horizontal scroll** (`.pin-spacer`, GSAP pin). Header "Featured case studies". Staggered project cards (Illustrations set, Interactive concept ×N) each = image (`works/showcase-grid-x3/prNN-*.webp` layered) + title + mono tag list. Ends with "[ ALL WORKS ]" link. |
| 7 | **Team divider** | `TeamDivider` | 10650–11410 | full-bleed **video** divider (`1280x720_hero-03.mp4`); overlay "[ LET'S MEET ]" + "Small but powerful team". |
| 8 | **Tech stack** (`T/04`) | `TechStack` | 11410–12442 | static grid. Header "Our tech stack" + "A powerhouse in full-stack…". 3-col rows of tech items w/ icon chip + name (Angular, React, Vue.js, PHP, C#, JavaScript, Android, iOS, .NET, …). |
| 9 | **Divider image B** | `DividerImage` | 12442–13202 | full-bleed image (two people w/ phones). Parallax. |
| 10 | **Insights** (`I/05`) | `InsightsSection` | 13202–14292 | **PINNED / horizontal scroll** (`.pin-spacer`). Header "Recent insights" + "[ NEWS OVERVIEW ]". 3 blog cards: date (mono) + image (`blog/preview/grid-x3/pr-0N.webp`) + title + mono tags. |
| 11 | **Gravity CTA** | `GravityCta` | 14292–15082 | `.mxd-promo.mxd-gravity-section.accent`, **blue** `rgb(0,43,186)`. "[ WRITE A LINE ]" + "Let's talk about your project". Floating **draggable physics word-pills** (Matter.js gravity): Web design, Brand strategy, 3D Models, Interactions, UI/UX, Guidelines, App design, Packaging, Development, Print Design, Branding, Application… |
| 12 | **Footer** | `SiteFooter` | 15082–16278 | `.mxd-footer`. 3 cols: /Discover (Home, About us, Case studies, Services, Our team, Insights, Contact) · /Contact (hello@azurio.com, +1 212-708-9400) + /Info (Pricing, FAQ) · /Ecosystem (numbered external links [01]-[05] Dribbble/Behance/Github/Codepen/Figma Community w/ ↗). "BACK TO TOP" + giant "AZURIO" wordmark. |

## Layout system
- Container: centered, generous side padding (~7–8% viewport). Max content ~1290px.
- Grid: 12-col (`col-12 col-md-6 col-xl-4` bootstrap-like classes) for cards.
- Section counters (A/01, C/02, W/03, T/04, I/05) in JetBrains Mono, muted, top-left of each major section.
- z-index: page-transition 999 > menu 11 > header 1 > flow auto.

## Build priority
Static-first: Header, Hero (video+blend), About/stats, Niche cards, Capabilities list, dividers, Tech stack, Insights, Footer. Then layer behaviors: Lenis, GSAP reveals, pinned horizontal scroll (Case studies/Insights), gravity CTA (Matter.js), scramble text, color switcher (dark mode).
