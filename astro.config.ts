import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import AstroPureIntegration from 'astro-pure'
import { defineConfig } from 'astro/config'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import UnoCSS from 'unocss/astro'

// Others
// import { visualizer } from 'rollup-plugin-visualizer'

// Local integrations
import { outputCopier } from './src/plugins/output-copier.ts'
// Local rehype & remark plugins
import rehypeAutolinkHeadings from './src/plugins/rehype-auto-link-headings.ts'
// Shiki
import {
  addCopyButton,
  addLanguage,
  addTitle,
  transformerNotationDiff,
  transformerNotationHighlight,
  updateStyle
} from './src/plugins/shiki-transformers.ts'
import config from './src/site.config.ts'

// https://astro.build/config
export default defineConfig({
  // Top-Level Options
  site: 'https://thedataquarry.com',
  // base: '/docs',
  trailingSlash: 'never',

  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
  },

  integrations: [
    // astro-pure will automatically add sitemap, mdx & tailwind
    // sitemap(),
    // mdx(),
    UnoCSS({ injectReset: true }),
    AstroPureIntegration(config),
    // (await import('@playform/compress')).default({
    //   SVG: false,
    //   Exclude: ['index.*.js']
    // }),

    // Temporary fix vercel adapter
    // static build method is not needed
    outputCopier({
      integ: ['sitemap', 'pagefind']
    })
  ],
  // root: './my-project-directory',

  // Prefetch Options
  prefetch: true,
  // Server Options
  server: {
    host: true
  },
  // Markdown Options
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      [rehypeKatex, {}],
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: { className: ['anchor'] },
          content: { type: 'text', value: '#' }
        }
      ]
    ],
    // https://docs.astro.build/en/guides/syntax-highlighting/
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
  },
  vite: {
    plugins: [
      //   visualizer({
      //     emitFile: true,
      //     filename: 'stats.html'
      //   })
    ],
    build: {
      rollupOptions: {
        external: []
      }
    }
  },
  redirects: {
    '/posts/': '/blog',
    '/posts/hello-world': '/blog/hello-world',
    '/posts/neo4j-python-1': '/blog/neo4j-python-1',
    '/posts/neo4j-python-2': '/blog/neo4j-python-2',
    '/posts/why-pydantic-v2-matters': '/blog/why-pydantic-v2-matters',
    '/posts/intermediate-pydantic': '/blog/intermediate-pydantic',
    '/posts/rust-is-supercharging-python': '/blog/rust-is-supercharging-python',
    "/posts/baml-and-future-agentic-workflows": "/blog/baml-and-future-agentic-workflows",
    "/posts/baml-is-building-blocks-for-ai-engineers": "/blog/baml-is-building-blocks-for-ai-engineers",
    "/posts/embedded-db-1": "/blog/embedded-db-1",
    "/posts/embedded-db-2": "/blog/embedded-db-2",
    "/posts/embedded-db-3": "/blog/embedded-db-3",
    "/posts/intro-to-rayon": "/blog/intro-to-rayon",
    "/posts/meilisearch-async": "/blog/meilisearch-async",
    "/posts/open-source-via-graph-viz": "/blog/open-source-via-graph-viz",
    "/posts/static-site-zola": "/blog/static-site-zola",
    "/posts/towards-a-unified-python-toolchain": "/blog/towards-a-unified-python-toolchain",
    "/posts/vector-db-1": "/blog/vector-db-1",
    "/posts/vector-db-2": "/blog/vector-db-2",
    "/posts/vector-db-3": "/blog/vector-db-3",
    "/posts/vector-db-4": "/blog/vector-db-4"
  }
})