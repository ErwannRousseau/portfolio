# SANITY CONTENT LAYER

## OVERVIEW

Sanity client, server loaders, GROQ queries, embedded Studio configuration, plugins, and CMS schemas.

## STRUCTURE

- `lib/`: `client.ts`, `queries.ts`, `store.ts`, image helpers, and server token handling.
- `schemas/`: document types, singleton home schema, and reusable object types.
- `plugins/`: Studio structure and singleton settings.
- `schema.ts`: registers all document/object definitions.

## WHERE TO LOOK

- `sanity/lib/store.ts`: `loadHomePage`, `loadBlogPage`, `loadPostPage`, `loadPostSlugs`.
- `sanity/lib/queries.ts`: canonical GROQ queries.
- `sanity/env.ts`: validated project ID, dataset, API version, and CDN setting.
- `sanity/lib/token.ts`: server-only read token; React taint protection.
- `sanity.config.ts`: Studio mounted at `/studio`.
- `sanity.types.ts`: generated type output used by loaders and components.

## CONVENTIONS

- Keep Sanity reads centralized in `lib/store.ts`; route files should not duplicate client setup.
- Schema changes require `pnpm schema` and, when types change, `pnpm typegen`.
- Localized fields follow the existing `en`/`fr` schema shape.
- Use `@/*` aliases for app-root imports.

## ANTI-PATTERNS

- Never pass `SANITY_API_TOKEN` to client code.
- Do not hand-edit generated `sanity.types.ts`; regenerate it.
- Do not put Studio-only configuration into localized route components.
