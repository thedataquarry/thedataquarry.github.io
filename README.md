# Astro Theme Pure

Code for The Data Quarry blog site, built with [Astro](https://astro.build/) & TypeScript. This site is built on top of the [Pure theme](https://github.com/cworld1/astro-theme-pure) for Astro.

## Introduction

Checkout [the site →](https://thedataquarry.com/).

### Why Astro and the Pure theme?

- [x] Fast & high performance
- [x] Simple & clean design
- [x] Responsive design
- [x] Full-site search built with [pagefind](https://pagefind.app/)
- [x] Sitemap & RSS feed
- [x] SEO-friendly
- [x] TOC (table of contents)
- [x] Dynamic open graph generation for posts
- [x] Mediumzoom lightbox for images
- [x] Easy-to-customize components
- [x] Footnotes
- [x] Readymade KaTeX support for mathematical symbols and equations
- [x] Aside boxes for emphasizing key points
- [x] Easy to add YouTube and X (Twitter) embeds

## Local development

Environment used:

- [Nodejs](https://nodejs.org/): 20.0.0+

Clone the source repository and customize to your liking:

```shell
git clone https://github.com/cworld1/astro-theme-pure.git
cd astro-theme-pure
```

Useful commands:

```shell
# install dependencies
bun install

# start the dev server
bun dev

# build the project
bun run build

# preview (after the build)
bun preview

# create a new post
bun new-post
```

## Deployment

A GitHub Actions workflow is configured to deploy the site via GitHub Pages. The pipeline is triggered when a commit is pushed to the main branch.

## Adding New Posts
Add MDX files to a custom directory in `src/content/blog`.

> [!NOTE]
> MDX combines JSX and Markdown to make it easier to write component-driven content like tabbed code blocks. This theme requires that you work with .mdx files instead of .md when using JSX components. See the official [MDX documentation](https://mdxjs.com/) for more information.

## 👀 Learn more

See the official [Astro](https://docs.astro.build/en/getting-started/) docs and the [Pure theme](https://github.com/cworld1/astro-theme-pure) repo to learn more how to customize the site. Many
thanks to the maintainers of both these projects. 🫶🏼

## License

The Astro project is MIT licensed and the Pure theme has an Apache 2.0 license.
