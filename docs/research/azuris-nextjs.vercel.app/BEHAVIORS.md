# Behavior Bible — Azurio clone

## Global / libraries
- **Lenis smooth scroll** — `<html class="no-touch lenis">`. Must install `lenis` and init in a client provider. Feel: eased, ~1.0–1.2 duration, wheel-multiplier default. Without it the scroll feel is visibly wrong.
- **GSAP + ScrollTrigger** — drives reveals, pinning, counters. 2 `.pin-spacer` elements (Case studies, Insights) = horizontal scroll pinned sections.
- **Scramble text** — `.mxd-scramble` spans (logo "Azurio/Template", nav, "Say Hello"). Chars scramble in on load/hover. Nice-to-have; can init with a small scramble util or GSAP ScrambleText (plugin is premium — use a custom hook).
- No Swiper. No CSS scroll-snap. Marquee count 0 (the "marquee-looking" tag list is the gravity section).

## Header (`#header`)
- position: absolute; transparent; height 70px; z-index 1. **Stays transparent** at all scroll positions (it's an overlay; content scrolls under). No bg/shadow change on scroll.
- Logo text + controls fade in on load (`loading-fade`, opacity 0→1).
- **Color switcher** ("Night") toggles `.dark` on `<html>` → full dark theme. `aria-checked` flips.
- **Hamburger** (`.mxd-menu__hamburger`, aria-label "Menu") opens fullscreen `.mxd-menu` overlay (GSAP: menu slides/fades in, video plays).

## Hero
- Centered **hero video** (`/video/1280x720_hero-03.mp4`, autoplay loop muted, poster webp). Fixed-ish box ~1280×720 region centered.
- **H1** "Innovative software development company" sits ON TOP of the video with `mix-blend-mode` (text is near-black `#121212` outside the video, blends to olive/tan where it overlaps the video). Implement: H1 z-above video, `mix-blend-mode: multiply` (or `difference`) — verify exact mode during build (observed multiply-like darkening → **mix-blend-mode: multiply** on the heading, or the heading is `hard-light`; test both).
- Side labels `[ STUDIO ]` (left) and `[ WORKS ]` (right) vertically centered, JetBrains Mono, muted.
- Bottom-left social links row; bottom-right "SCROLL TO EXPLORE" + down-plus icon.
- Entrance: text likely fades/rises on load.

## About (A/01)
- Section counter "A/01" big muted mono top-left.
- Intro paragraph: mixed color runs — key phrases in near-black `#121212`, rest in muted `rgb(87,89,96)`.
- Stats: reveal on scroll (numbers may count up via GSAP — treat as static values with fade-up). 2×2 grid, top border line per cell. Number = Manrope bold ~64px; caption = JetBrains Mono uppercase ~13px muted, with letter-spacing.

## Niche cards
- Masonry/asymmetric grid. Cards fade/rise in on scroll (stagger). Dark "Cybersecurity" card = black bg white text. Each card has hover (subtle image scale / lift — verify). Illustration images bleed within card.

## Capabilities (C/02)
- 7 rows revealed on scroll (fade-up + slight y). Row hover: verify (image may scale, title may shift color). Numbered [01]–[07] in mono. Thin divider line between rows. Each row: title(left) / image(center) / desc+tags(right). Tags in mono uppercase muted.

## Dividers (image + video)
- Full-bleed. **Parallax**: inner image is taller than container and translates on scroll (GSAP/ScrollTrigger y translate). Video divider autoplays looped muted with centered mono overlay text.

## Case studies (W/03) — PINNED HORIZONTAL
- INTERACTION MODEL: **scroll-driven horizontal pin** (`.pin-spacer` = GSAP pin + `x` translate of a track as you scroll vertically). Cards of varied aspect ratios scroll left. Each card: layered project images (`prNN-01` main + `prNN-02..07` absolute overlays that shuffle/animate), title, mono tag list. Card image hover = layered images animate (`mxd-img-anim__main`/`__absolute`). Ends with "[ ALL WORKS ]".
- **Fallback if pin is too costly:** horizontal overflow-scroll track. But default target is vertical-scroll-drives-horizontal.

## Insights (I/05) — PINNED
- Same pinned/horizontal mechanism (`.pin-spacer`). 3 blog cards. Image hover reveal (`active-cursor-permanent` = custom cursor "View"). Date in mono, tags in mono.

## Gravity CTA (blue)
- INTERACTION MODEL: **physics** — `.mxd-gravity-section` uses Matter.js. Word-pills fall/collide with gravity and are **draggable**. bg `rgb(0,43,186)`, text white. Heading "Let's talk about your project" centered, "[ WRITE A LINE ]" eyebrow.
- **Implementation:** integrate `matter-js` for falling draggable pills. Acceptable fallback: statically positioned pill cloud with subtle float, but physics is the real behavior — implement matter-js.

## Footer
- Link hover: color/underline shift (verify). Numbered ecosystem rows with ↗ icon, divider lines, hover moves arrow. Giant "AZURIO" wordmark bottom (Manrope, very large, near-black, may have subtle reveal). "BACK TO TOP" scrolls to top (Lenis).

## Dark mode ("Night")
- Full palette inversion via `.dark` on `<html>`. Extract dark tokens during foundation (toggle switcher, re-extract colors). Body dark bg ≈ near-black, text light.

## Responsive
- Desktop 1440: as captured. Tablet 768: cards 12→6 col, capabilities rows likely stack (title over image over desc). Mobile 390: single column, hero text smaller, header controls collapse (hamburger primary), stats 2×2→1 col or 2 col. Extract exact per-section during build. Font family unchanged.

## Open items to verify during section extraction
1. Exact hero `mix-blend-mode` value (multiply vs hard-light vs difference).
2. Header scroll transform (probe showed scaleY 1.3 @800 — likely a scroll-progress element, not header; re-check).
3. Stats count-up vs static.
4. Card hover exact transforms.
5. Pinned-section exact GSAP config (scrub, end distance).
