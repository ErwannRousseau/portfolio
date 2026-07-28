# APP ROUTES

## OVERVIEW

Next.js App Router surface: localized public pages plus an embedded Sanity Studio.

## WHERE TO LOOK

- `app/[lang]/layout.tsx`: localized root layout, metadata, providers, header/footer.
- `app/[lang]/page.tsx`: homepage; loads Sanity home data and renders home sections.
- `app/[lang]/blog/page.tsx`: localized blog listing.
- `app/[lang]/blog/[slug]/page.tsx`: localized post detail.
- `app/studio/[[...index]]/page.tsx`: Studio catch-all mounted at `/studio`.
- `app/globals.css`: global Tailwind/CSS surface.

## CONVENTIONS

- Public URLs require `[lang]`; use `i18n.config.ts` for locale changes.
- `proxy.ts` handles locale routing and excludes Studio, assets, API, and robots.
- Data loading belongs in `sanity/lib/store.ts`; route pages consume its loaders.
- Keep route files thin. Put reusable presentation in `components/`.

## ANTI-PATTERNS

- Do not move Studio under `[lang]`; it intentionally bypasses the locale proxy.
- Do not expose Sanity tokens from route components or client boundaries.
