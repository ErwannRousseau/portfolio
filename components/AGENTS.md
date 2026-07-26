# COMPONENTS

## OVERVIEW

Presentation layer for homepage sections, shared layout, primitives, providers, and rendering utilities.

## STRUCTURE

- `home/`: Hero, Projects, Works, Skills, Connect.
- `layout/`: Header, navigation, footer.
- `ui/`: shared primitives and barrel export at `ui/index.ts`.
- `provider/`: theme provider and other context boundaries.
- `utils/`: code blocks, portable text, locale/theme controls, SVG helper.

## WHERE TO LOOK

- `components/home/*`: homepage-specific sections; receive CMS data from `app/[lang]/page.tsx`.
- `components/ui/index.ts`: prefer existing primitives before adding one.
- `components/utils/custom-portable-text.tsx`: Sanity rich-text rendering.
- `components/utils/inline-svg.tsx`: trusted Sanity SVG rendering.

## CONVENTIONS

- Follow Biome sorted imports and Tailwind class sorting.
- Default to server components. Use `"use client"` only for interaction, browser APIs, or React effects.
- Reuse `cn`, existing UI primitives, and existing icon patterns before adding dependencies.

## ANTI-PATTERNS

- Do not pass server-only Sanity tokens into props or client components.
- Raw HTML/SVG rendering is an explicit trusted-content exception; do not broaden its input source.
- Avoid duplicating shared primitives inside homepage sections.
