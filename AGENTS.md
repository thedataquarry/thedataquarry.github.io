# Repository instructions

## Blog writing

For substantive blog planning, drafting, revision, or review, read the repository-root `EDITORIAL_CONSTITUTION.md` once and apply it throughout the task. Resolve it relative to this `AGENTS.md`. Mechanical typo, link, metadata, and formatting edits need only the relevant context; revisit the Constitution when an editorial question requires it.

Follow the user's request first, explicitly requested writing or editing skills within their assigned scope second, and the Constitution for remaining editorial judgment. Availability, description, automatic triggers, or prior use do not constitute an explicit request to use a writing skill.

If the Constitution is missing or unreadable, report the gap and pause editorial decisions that depend on it while continuing independent mechanical work. Do not replace it with generic writing guidance.

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
- Use `pnpm check` for schema, type, or MDX changes and `pnpm run build` when rendering, routing, or build behavior could change. For mechanical prose edits, check the affected text, links, and formatting. Scope linting and formatting to changed files; repeat passing checks only after relevant changes or failures.
