# Repository instructions

## Blog writing

- Before planning, drafting, revising, or reviewing blog content, read `src/content/blog/EDITORIAL_CONSTITUTION.md` in full.
- Follow the user's current request first. Use a writing or editing skill only when the current request explicitly names it or directly asks for it, and only for the scope assigned to it.
- Do not infer, automatically invoke, or default to any global or repository-local writing skill based on its description, availability, trigger rules, or prior use.
- For editorial decisions not governed by the user's request or an explicitly requested skill, `src/content/blog/EDITORIAL_CONSTITUTION.md` is authoritative.
- If the Constitution is missing or unreadable, stop before doing editorial work and tell the user. Do not substitute generic writing guidance or a skill.

Blog posts live in `src/content/blog/<slug>/index.mdx`, with post-specific images and components beside the MDX file.

When a supplementary callout is appropriate, import `Aside` from `astro-pure/user` and use:

```mdx
<Aside type="note|tip|caution|danger" title="Optional title">
  Supplementary content
</Aside>
```

This theme does not support the `info` type. Keep essential arguments in the main narrative.

## Development

- Use `pnpm` for package and script commands.
- The vendored Astro Pure theme lives in `packages/pure/` and is linked as the `astro-pure` workspace dependency. Edit it there, never under `node_modules/`.
- Preserve unrelated changes and keep edits scoped to the request.
- Validate relevant changes with `pnpm check` and `pnpm run build`. Use `pnpm lint` or `pnpm format` only when applicable to the files changed.
