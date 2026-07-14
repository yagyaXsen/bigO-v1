# Divider Specification (reusable: image divider + video divider)

## Overview
- **Target file:** `src/components/Divider.tsx` — export TWO components: `ImageDivider` and `VideoDivider`.
- **Screenshots:** `docs/design-references/azuris-nextjs.vercel.app/slice-07-y7168.png` (image divider), `slice-10-y10240.png` (video divider "Let's meet").
- **Interaction model:** scroll-driven parallax (subtle). Static acceptable as fallback but implement parallax.

## ImageDivider
Full-bleed (100vw) horizontal band, height ~clamp(360px, 42vw, 620px), `overflow-hidden`.
- Props: `{ src: string; alt: string; className?: string }`.
- Inner `<Image fill>` with `object-cover`; the image element is ~120% height and translates on scroll for parallax (use a client `useReveal`-style effect OR a simple GSAP ScrollTrigger y translate from -8% to 8%). Keep it `"use client"`.
- No text overlay.
- Used with divider assets: `/images/dividers/1920x1080_dv01.webp`, `/images/dividers/1920x1200_dv04.webp`, `/images/dividers/1920x1200_dv07.webp`.

## VideoDivider
Full-bleed band, height ~clamp(420px, 56vw, 760px), `overflow-hidden`, relative.
- Props: `{ src: string; poster: string; eyebrow: string; title: string }`.
- `<video autoPlay loop muted playsInline poster={poster}>` absolutely positioned, `object-cover`, full-size, `z-0`.
- Overlay centered content `z-10`, text white:
  - eyebrow rendered as `[ {eyebrow} ]` using `mxd-eyebrow` but forced white (`text-white/90`). e.g. eyebrow="LET'S MEET".
  - title using `mxd-display` white, size clamp(40px,6vw,84px), centered.
- Subtle dark scrim over video for legibility: `bg-black/10`.
- Used with `/video/1280x720_hero-03.mp4` + poster `/video/1280x720_hero-03.webp`. Title: "Small but powerful team", eyebrow "LET'S MEET".

## Responsive
- Mobile: reduce heights (~300px image / ~380px video), title clamps down. Video stays object-cover.

## Notes
- Both full-bleed: since page container has padding, these components must break out — set `className="relative w-screen left-1/2 -translate-x-1/2"` OR rely on page.tsx placing them outside `.mxd-container`. Assume they are placed full-width by page.tsx; just make root `w-full`.
