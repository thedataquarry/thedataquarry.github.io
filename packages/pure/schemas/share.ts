import { z } from 'astro/zod'

export const shareList = ['x'] as const

export const ShareSchema = () =>
  z
    .array(z.enum(shareList))
    .default(['x'])
    .describe('Options for sharing content on social media platforms.')
