# AboutSection Specification (A/01)

## Overview
- **Target file:** `src/components/AboutSection.tsx`
- **Screenshot:** `docs/design-references/azuris-nextjs.vercel.app/slice-02-y2048.png`
- **Interaction model:** static + fade-up reveal on scroll (`useReveal`). `"use client"` for the hook.
- Section id: `id="about"`. Wrap in `<section id="about" className="mxd-container ...">`. Vertical padding ~clamp(80px,10vw,160px).

## Layout (desktop 1440)
Two-row structure:
1. **Top row:** left column = section counter "A/01" (mxd-counter, large ~clamp(48px,6vw,80px)); right column (offset, starts ~col 6) = intro paragraph, max-width ~640px.
   - Grid: `grid grid-cols-12 gap-8`. Counter in `col-span-2`. Paragraph in `col-start-6 col-span-7` (right-aligned block of text, left-aligned text).
2. **Stats:** 2×2 grid under the paragraph area (aligned to same right block, starts ~col 6). `grid grid-cols-2 gap-x-12 gap-y-16`, each cell has a top border line.

## Intro paragraph (verbatim)
"From pixel-perfect designs to flawless code, every aspect of our projects is crafted with care to ensure the highest standards of quality."
- Style: `mxd-display` weight 500-600, size clamp(28px,3.3vw,46px), line-height ~1.15, tracking ~-0.02em.
- Color: mixed — "From pixel-perfect designs to flawless code," in ink `var(--ink)`; the rest "every aspect … quality." also ink but slightly lighter is fine — actually whole para is ink `#121212` with the LATER half muted. Keep first sentence ink, second half `text-muted-foreground`. (Reference shows first line darker, trailing muted.)

## Stats (StatItem[]) — verbatim
1. value "50+" — caption "Happy clients who trust our work"
2. value "86%" — caption "Clients come back for a new projects"
3. value "5+" — caption "Years of professional experience"
4. value "70+" — caption "Successfully completed projects"

### Stat cell styling
- Top border: `border-t border-border pt-5`.
- Value: Manrope, weight 600-700, size clamp(44px,4.5vw,64px), color ink, tracking -0.02em, line-height 1.
- Caption: `mxd-mono` (JetBrains Mono 600 uppercase 13px, ls .03em), `text-muted-foreground`, margin-top ~24px, max-width ~200px, line-height 1.3.
- Big vertical gap between the number and caption (caption sits lower in the cell — value at top, caption pushed down ~40-60px). Use flex-col with the caption at cell bottom, cell min-height ~220px.

## Reveal
- Fade-up the paragraph and stagger the 4 stat cells: `useReveal({ childSelector: '.reveal-item' })` on the section; add `reveal-item` class to paragraph + each stat cell.

## Responsive
- **md (768):** paragraph goes full width (col-start-1). Stats 2×2 stays. Counter above paragraph.
- **mobile (390):** single column; counter top; paragraph full width smaller (~24px); stats become 2 columns still (2×2) but tighter gap, or 1 column — use 2 cols with reduced sizes.
