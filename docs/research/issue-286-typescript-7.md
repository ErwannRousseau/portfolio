# TypeScript 7 migration (#286)

The project uses TypeScript `7.0.2`, the current stable native compiler. The
existing `tsconfig.json` keeps strict checking, bundler module resolution,
Next.js integration, the `@/*` path alias, and generated Sanity types. Its
compiler options do not use the TypeScript 7 removals such as `baseUrl`, the
Node 10/classic module resolvers, or legacy module targets.

## Editor support

TypeScript 7's native language server does not expose the stable programmatic
API used by legacy language-service plugins. The `plugins: [{ "name": "next" }]`
entry remains in `tsconfig.json` for editors using a legacy TypeScript language
service, but native TypeScript 7 editor sessions cannot rely on the Next.js
plugin's extra diagnostics and completions. `next build` remains the
authoritative Next.js type-checking gate.

If those editor-only Next.js diagnostics are required before TypeScript 7 adds
plugin support, select a TypeScript 6 language service in the editor using a
local side-by-side installation. This is an editor setting and is intentionally
not part of the repository dependency configuration.

References:

- [Announcing TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/)
- [Next.js TypeScript configuration](https://nextjs.org/docs/app/api-reference/config/typescript)
