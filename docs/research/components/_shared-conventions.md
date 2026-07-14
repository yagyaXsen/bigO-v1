# Shared build conventions (ALL builders read this)

**Stack:** Next.js 16 App Router, React 19, TS strict, Tailwind v4, shadcn. NO `any`.

**Design tokens (already in globals.css — use these, do not hardcode raw hex unless told):**
- Page bg `bg-background` = `#EEEAE8` (warm off-white). Dark: `#0F0F0F`.
- Body text `text-foreground` / `text-body` = `#575960`. Muted `text-muted-foreground` = `#8E93A1`.
- Headings ink: use class `text-[color:var(--ink)]` = `#121212` (white in dark).
- Accent blue: `text-[color:var(--accent-blue)]` / `bg-[color:var(--accent-blue)]` = `#002BBA`.
- Fonts: display/body = Manrope (`font-sans`); mono labels = JetBrains Mono (`font-mono`).

**Type patterns (utility classes exist in globals.css):**
- Section heading H2: `className="mxd-display"` then set size, e.g. `text-[75px] leading-[1.1] tracking-[-0.032em]`. Hero H1 = 95px.
- Mono label/tag/eyebrow: `className="mxd-mono"` (JetBrains Mono 600 uppercase 13px, ls .03em, muted by default — add `text-muted-foreground`).
- Eyebrow in brackets like `[ STUDIO ]`: `mxd-eyebrow`.
- Section counter (A/01, C/02…): `mxd-counter` — render large (~clamp(56px,7vw,96px)) Manrope, muted.
- Container: wrap content in `<div className="mxd-container">` (max 1600px, responsive side padding).

**Imports available:**
- `cn` from `@/lib/utils`
- `useReveal` from `@/hooks/useReveal` (client hook: `const ref = useReveal({ childSelector: '.item' }); <div ref={ref}>`) — fade-up on scroll.
- Icons from `@/components/icons` (LogoIcon, CartIcon, MoonIcon, PlusIcon, ArrowDownIcon, ArrowUpRightIcon, ArrowUpLeftIcon, MenuBarsIcon).
- Types from `@/types`.
- Images: use `next/image` `<Image>` with explicit width/height or `fill`. All assets are in `/public` (see each spec for exact paths). webp images.

**Rules:**
- Named export, PascalCase component matching file name.
- Add `"use client"` ONLY if the component uses hooks/state/interactivity.
- Mobile-first responsive; each spec gives breakpoint behavior. Breakpoints: md=768, xl=1200/1440.
- Real content only — copy text verbatim from the spec.
- MUST end by running `npx tsc --noEmit` and fixing any type errors in your file before finishing.
- Do NOT edit globals.css, layout.tsx, page.tsx, or other components' files. Only create/edit YOUR target file.
- Match spacing/scale to the reference screenshot; when a value isn't given, derive from the screenshot proportions.
