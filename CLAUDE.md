# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands
- `bun dev` - Start development server with hot reload
- `bun run build` - Build the site for production (includes astro-pure check, astro check, and astro build)
- `bun preview` - Preview built site locally
- `bun new` - Create a new blog post using astro-pure CLI

### Code Quality
- `bun run lint` - Run ESLint on TypeScript/JavaScript files in src/
- `bun run format` - Format code with Prettier
- `bun run check` - Run Astro type checking
- `bun run yijiansilian` - Run full quality pipeline (lint + sync + check + format)

### Maintenance
- `bun run sync` - Sync Astro content collections
- `bun run clean` - Remove build artifacts (.astro, .vercel, dist)

## Architecture Overview

This is an Astro-based blog site built on the "Pure" theme, focused on technical content about AI, data engineering, and programming.

### Core Technologies
- **Astro 5.x** - Static site generator with content collections
- **TypeScript** - Type-safe development
- **UnoCSS** - Atomic CSS framework for styling
- **astro-pure** - Custom theme integration providing blog functionality
- **Bun** - Package manager and runtime

### Content Management
- Blog posts are written in **MDX** format and stored in `src/content/blog/`
- Each post should be in its own directory with an `index.mdx` file
- Post schema includes: title, description, publishDate, tags, heroImage (optional)
- Content collections are defined in `src/content.config.ts`

### Key Directories
- `src/content/blog/` - Blog posts in MDX format, each in its own subdirectory
- `src/components/` - Reusable Astro components organized by feature
- `src/layouts/` - Page layout templates
- `src/pages/` - Route definitions and static pages
- `src/plugins/` - Custom Shiki transformers and build plugins
- `packages/pure/` - Local astro-pure theme package

### Configuration Files
- `astro.config.mjs` - Main Astro configuration with integrations and markdown settings
- `src/site.config.ts` - Theme configuration, site metadata, and navigation
- `uno.config.ts` - UnoCSS styling configuration with custom typography
- `src/content.config.ts` - Content collection schemas for blog and docs

### Special Features
- **Math Support**: KaTeX for mathematical equations in blog posts
- **Code Highlighting**: Custom Shiki transformers with copy buttons and language labels
- **Search**: Integrated pagefind for full-site search
- **Redirects**: Legacy `/posts/` URLs redirect to `/blog/`
- **Image Optimization**: Sharp integration for responsive images

### Development Notes
- Site deploys automatically via GitHub Actions when pushing to main branch
- Uses content collections with strict TypeScript schemas for type safety
- Custom CSS properties for theming with light/dark mode support
- All blog posts must be in MDX format for component support