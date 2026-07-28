# PROJECT KNOWLEDGE BASE

**Generated:** 2026-07-26
**Commit:** 5829dac
**Branch:** develop

## OVERVIEW

Portfolio site built with Next.js 16 App Router, TypeScript, Tailwind CSS, next-international, and an embedded Sanity Studio.

## STRUCTURE

```
portfolio/
├── app/          # Public localized routes and embedded Studio route
├── components/   # Home sections, shared UI, layout, and presentation helpers
├── lib/          # Shared utilities, themes, and locale helpers
├── sanity/       # Sanity client, loaders, GROQ queries, schemas, plugins
├── public/       # Static icons and Subjectivity Serif fonts
├── proxy.ts      # Locale routing and route exclusions
└── sanity.config.ts
```

## WHERE TO LOOK

| Task                | Location                                       | Notes                                               |
| ------------------- | ---------------------------------------------- | --------------------------------------------------- |
| Public routes       | `app/[lang]/`                                  | Locale is part of every public URL; see child guide |
| Locale routing      | `proxy.ts`, `i18n.config.ts`                   | Supported locales: `en`, `fr`; default: `en`        |
| Sanity data loading | `sanity/lib/store.ts`, `sanity/lib/queries.ts` | Central query/load boundary                         |
| Studio              | `app/studio/`, `sanity.config.ts`              | Mounted at `/studio`, outside localized routes      |
| Shared UI           | `components/ui/`, `components/layout/`         | `components/AGENTS.md`                              |
| Shared helpers      | `lib/`, `components/utils/`                    | Use `@/*` root alias                                |
| CMS schema          | `sanity/schemas/`, `sanity/schema.ts`          | `sanity/AGENTS.md`                                  |

## CODE MAP

| Symbol                                         | Location                       | Role                                    |
| ---------------------------------------------- | ------------------------------ | --------------------------------------- |
| `proxy`                                        | `proxy.ts`                     | Locale negotiation and route matcher    |
| `Home`, `Blog`, `Post`                         | `app/[lang]/**/page.tsx`       | Public page entry points                |
| `loadHomePage`, `loadBlogPage`, `loadPostPage` | `sanity/lib/store.ts`          | Server-side Sanity data access          |
| `schema`                                       | `sanity/schema.ts`             | Registered Sanity document/object types |
| `Projects`                                     | `components/home/projects.tsx` | Homepage CMS section                    |

## CONVENTIONS

- Use pnpm 11.17.0. Imports are organized by Biome; 2 spaces, LF, 80 columns.
- TypeScript is strict, no emit, bundler resolution; `@/*` maps to the repository root.
- Server components are the default. Add client boundaries only where browser state/effects require them.
- Sanity Studio is part of this Next app, not a separate package.
- Generated `sanity.types.ts` is ignored by Biome; regenerate with `pnpm typegen` when schema output changes.

## ANTI-PATTERNS (THIS PROJECT)

- Never expose `SANITY_API_TOKEN` to client code; keep it in server-only paths.
- Do not stage `.env`; it is untracked and contains local credentials. `.env` is not currently ignored.
- Treat `dangerouslyAllowSVG` and raw HTML rendering as trusted-content exceptions. Do not route user-controlled HTML through them.
- Do not add a test command assumption: no test runner or test files exist.

## COMMANDS

```bash
pnpm dev
pnpm check       # Biome check and TypeScript validation
pnpm build
pnpm start
pnpm schema
pnpm typegen
```

## NOTES

- Production pages depend on Sanity environment variables from `.env.example`.
- Existing worktree changes must remain untouched unless explicitly requested.
- Metadata currently references `erwannrousseau.com`; sitemap uses `erwannrousseau.dev`.

## Agent skills

### Issue tracker

Issues and PRDs live in GitHub Issues for `ErwannRousseau/portfolio`. See `docs/agents/issue-tracker.md`.

### Triage labels

Default canonical labels: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context domain docs use root `CONTEXT.md` and `docs/adr/`. See `docs/agents/domain.md`.
