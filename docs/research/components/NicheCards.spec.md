# NicheCards Specification

## Overview
- **Target file:** `src/components/NicheCards.tsx`
- **Screenshots:** `slice-02-y2048.png` (bottom: Fintech + AI cards) and `slice-03-y3072.png` (Cybersecurity dark + Game Industry).
- **Interaction model:** static + fade-up reveal (`useReveal`, stagger). `"use client"`.
- Wrap in `<section className="mxd-container ...">` with vertical padding ~clamp(40px,6vw,96px).

## Layout
Asymmetric 2-column masonry (desktop). 4 cards. Use `grid grid-cols-2 gap-6`.
Card heights vary (staggered/masonry feel). Approx pattern from screenshots:
- **Card 1 "Fintech"** (left col): tall card, image at BOTTOM (illustration `niche01.webp` — hands holding cards). White/light card bg `#F9F7F7`, rounded ~20px.
- **Card 2 "AI-powered solutions"** (right col): wide-ish card, full-bleed image background (`niche02.webp` — robot in garden), text over light overlay top.
- **Card 3 "Cybersecurity"** (left col): DARK card, bg `#0F0F0F`/black, white text, subtle dark cube image (`niche03.webp`) as bg.
- **Card 4 "Game Industry"** (right col): light card, illustration bottom-right (`niche04.webp` — pink unicorn).

Each card: padding ~clamp(28px,2.5vw,44px), rounded-[20px], overflow-hidden, relative, min-height ~clamp(360px,32vw,480px).

## Card content structure (top to bottom)
1. **Title** (Manrope 600, size clamp(26px,2.6vw,40px), ink; white on dark card). e.g. "Fintech".
2. **Tag list** (vertical, `mxd-mono` uppercase 13px muted; white/70 on dark card), one per line, small gap. Sits just under title.
3. **Description** at lower area (Manrope, ~clamp(15px,1.1vw,17px), line-height 1.4). First part ink/body, a highlighted phrase muted. On dark card, white with muted tail.
4. **Image**: illustration positioned per card (bottom, full bg, etc.). Use `next/image`.

### Card data (verbatim)
1. **Fintech** — tags: FRONTEND, INTERACTIONS, BACKEND. desc: "Innovative financial solutions, from digital banking to **payment processing and investment platforms.**" (bold part muted). image `/images/illustrations/niche01.webp`, variant bottom.
2. **AI-powered solutions** — tags: UI/UX, WEB DESIGN, PACKAGING, MOTION, 3D MODELS. desc: "Intelligent automation, predictive analytics, and **machine learning-driven applications.**" image `/images/illustrations/niche02.webp`, variant full (bg image, text over light gradient).
3. **Cybersecurity** — tags: BRAND STRATEGY, LOGO DESIGN, GUIDELINES. desc: "Advanced threat detection, encryption solutions, **and secure data protection.**" image `/images/illustrations/niche03.webp`, dark: true (black card, white text).
4. **Game Industry** — tags: E-COMMERCE, MAINTENANCE, SUPPORT. desc: "Immersive experiences, multiplayer platforms, **and game engine development.**" image `/images/illustrations/niche04.webp`, variant aside (illustration bottom-right).

## Hover
- Card: subtle lift + image scale on hover — `transition-transform duration-500`, image `group-hover:scale-105`. Card `hover:-translate-y-1`.

## Responsive
- **md:** keep 2 cols but allow cards to size naturally.
- **mobile:** single column, each card full width, min-height reduced (~340px), image scaled to fit.

Use the `NicheCard` type from `@/types`. Define the array inside the component.
