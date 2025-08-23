import { h } from 'hastscript'
import type { Element } from 'hast'

// Use Astro's internal Shiki types - keep it minimal to avoid conflicts
interface ShikiTransformer {
  name: string
  pre?(node: Element): void
  preprocess?(): void
}

export {
  transformerNotationDiff,
  transformerNotationHighlight
} from './shiki-official-transformers'

function parseMetaString(str = '') {
  return Object.fromEntries(
    str.split(' ').reduce((acc: [string, string | true][], cur) => {
      const matched = cur.match(/(.+)?=("(.+)"|'(.+)')$/)
      if (matched === null) return acc
      const key = matched[1]
      const value = matched[3] || matched[4] || true
      acc = [...acc, [key, value]]
      return acc
    }, [])
  )
}

// Nest a div in the outer layer
export const updateStyle = (): ShikiTransformer => {
  return {
    name: 'shiki-transformer-update-style',
    pre(node) {
      const container = h('pre', node.children)
      node.children = [container]
      node.tagName = 'div'
    }
  }
}

// The following transformers are disabled due to type compatibility issues with Astro's internal Shiki
// They can be re-implemented later with proper context access

// export const addTitle = (): ShikiTransformer => { ... }
// export const addLanguage = (): ShikiTransformer => { ... } 
// export const addCopyButton = (): ShikiTransformer => { ... }
