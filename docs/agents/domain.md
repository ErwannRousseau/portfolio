# Domain Docs

## Before exploring

- Read `CONTEXT.md` at the repo root when it exists.
- Read ADRs in `docs/adr/` that touch the area being explored.

If these files do not exist, proceed silently. The `/domain-modeling` skill creates them when domain terms or decisions need documentation.

## File structure

This is a single-context repo:

```text
/
├── CONTEXT.md
└── docs/adr/
```

Use glossary terms from `CONTEXT.md` in issue titles, proposals, hypotheses, and tests. Surface conflicts with existing ADRs instead of silently overriding them.
