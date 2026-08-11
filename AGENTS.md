# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
```bash
# Development server with hot reload
pnpm dev

# Development server with type checking
pnpm dev:check

# Build the site
pnpm run build

# Preview built site
pnpm preview

# Type checking
pnpm check
# or astro check

# Linting and formatting
pnpm lint
pnpm format

# Create new blog post
pnpm new
# or astro-pure new

# Clean build artifacts
pnpm clean
```

## Architecture Overview

This is an Astro-based blog site using the "Pure" theme with TypeScript. The project follows a content-driven architecture optimized for technical blogging.

### Key Technologies
- **Astro 5.x**: Static site generator with component islands
- **TypeScript**: Full type safety throughout
- **UnoCSS**: Utility-first CSS framework with custom theme
- **astro-pure**: Custom theme package (located in `packages/pure/`)
- **pnpm**: Primary package manager and task runner (workspace-based)

### Package Management

- **pnpm workspace**: the root package plus `packages/pure` (the vendored `astro-pure` theme), declared in `pnpm-workspace.yaml`. The root depends on it via `"astro-pure": "workspace:*"`, so `node_modules/astro-pure` is a live symlink to `packages/pure` — edits there take effect without reinstalling.
- **Pinned version**: the `packageManager` field in `package.json` pins pnpm, and CI (`pnpm/action-setup`) reads it. Keep local and CI on the same version.
- **Strict resolution**: pnpm will not resolve undeclared transitive dependencies. If an import fails after adding code, declare the package in the `package.json` that actually imports it (root for `src/` and `astro.config.ts`, `packages/pure/package.json` for the theme) rather than reaching for `shamefully-hoist`.
- **Single Astro**: `pnpm.overrides` pins `astro` to `5.1.10` tree-wide, since `packages/pure` declares a looser `^5.12.0` range and two Astro copies break the build.

### Project Structure
```
src/
├── components/        # Reusable Astro components
│   ├── about/        # About page specific components  
│   ├── home/         # Homepage components
│   ├── links/        # Links page components
│   └── projects/     # Project showcase components
├── content/          # Content collections
│   ├── blog/         # Blog posts (.mdx files in subdirectories)
│   └── docs/         # Documentation (future use)
├── layouts/          # Page layout templates
├── pages/            # File-based routing
├── plugins/          # Custom integrations and transformers
└── assets/           # Static assets and styles
```

### Content Architecture
- **Blog posts**: MDX files in `src/content/blog/[post-name]/index.mdx`
- **Images**: Co-located with blog posts in respective directories
- **Content schema**: Defined in `src/content.config.ts` with Zod validation
- **Collections**: Blog and docs collections with metadata validation

### Styling System
- **UnoCSS**: Custom configuration in `uno.config.ts`
- **Theme colors**: CSS custom properties for light/dark mode
- **Typography**: Custom prose styling with mathematical notation support
- **Component styling**: Utility-first approach with semantic color tokens

### Configuration Files
- `src/site.config.ts`: Site-wide configuration (theme, navigation, integrations)
- `astro.config.ts`: Astro framework configuration with integrations
- `uno.config.ts`: UnoCSS styling configuration
- `tsconfig.json`: TypeScript path mappings for `@/` aliases

### Custom Theme Package
The `packages/pure/` directory contains a custom Astro theme with:
- Reusable components for layouts, navigation, and content
- Advanced features like search, comments, and lightbox
- Theme configuration schemas and utilities
- Custom plugins for content processing

### Content Features
- **Mathematical notation**: KaTeX support for equations
- **Syntax highlighting**: Shiki with custom transformers
- **Image optimization**: Sharp integration with lazy loading
- **Search**: Pagefind integration for full-site search
- **Social embeds**: Twitter/X embed support
- **SEO**: Automatic sitemap and RSS feed generation

### Path Aliases
```typescript
"@/assets/*": ["src/assets/*"]
"@/components/*": ["src/components/*"] 
"@/layouts/*": ["src/layouts/*"]
"@/utils": ["src/utils/index.ts"]
"@/plugins/*": ["src/plugins/*"]
"@/site-config": ["src/site.config.ts"]
```

### Code Syntax Highlighting System

This blog uses **Shiki** as the primary syntax highlighter, configured through Astro's built-in markdown processing. The system is highly customized with multiple layers:

#### Core Configuration (astro.config.ts:80-93)
```typescript
shikiConfig: {
  themes: {
    light: 'github-light',
    dark: 'github-dark'
  },
  transformers: [
    transformerNotationDiff(),
    transformerNotationHighlight(), 
    updateStyle(),
    addTitle(),
    addLanguage(),
    addCopyButton(2000)
  ]
}
```

#### Custom Shiki Transformers (src/plugins/shiki-transformers.ts)
1. **updateStyle()**: Wraps code blocks in a custom div structure
2. **addTitle()**: Supports meta syntax like `title="filename.js"`
3. **addLanguage()**: Displays language labels on code blocks
4. **addCopyButton()**: Adds interactive copy functionality with 2-second feedback
5. **transformerNotationDiff()**: Supports `[!code ++]` and `[!code --]` for diff highlighting
6. **transformerNotationHighlight()**: Supports `[!code highlight]` notation

#### Styling Implementation (public/styles/global.css:40-188)
- **Line numbers**: CSS counter-based implementation with sticky positioning
- **Theming**: CSS custom properties for light/dark mode support
- **Interactive elements**: Copy button with hover states and success feedback
- **Diff visualization**: Color-coded additions/removals with background highlighting
- **UnoCSS integration**: Uses theme color tokens for consistent styling

#### MDX Code Block Features
- Automatic syntax highlighting for 100+ languages
- Meta string support: `title`, custom attributes
- Diff notation: `// [!code ++]` for additions, `// [!code --]` for removals  
- Highlight notation: `// [!code highlight]` for emphasis
- Line numbers with proper overflow handling
- Copy-to-clipboard functionality
- Language indicator badges
- Responsive design with horizontal scrolling

#### Architecture Benefits
- **Performance**: Shiki runs at build time, no client-side highlighting
- **Accuracy**: Tree-sitter grammars provide VS Code-quality highlighting
- **Extensibility**: Custom transformers allow rich interactive features
- **Theming**: Synchronized with site's light/dark mode system

### Code Quality
- **ESLint**: TypeScript and Astro-specific linting rules
- **Prettier**: Code formatting with import sorting and Astro support
- **TypeScript**: Strict configuration with path mappings