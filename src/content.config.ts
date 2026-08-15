import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const isoDay = /^\d{4}-\d{2}-\d{2}$/
const normalizedPostSchema = z
  .object({
    title: z.string().trim().min(1),
    'title-en': z.string().trim().min(1).optional(),
    summary: z.string().optional(),
    author: z.string().optional(),
    tags: z.array(z.string().trim().min(1)).optional(),
    date: z.string().regex(isoDay),
    lastModified: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  })
  .strict()
  .transform((post) => ({
    ...post,
    summary: post.summary?.trim() || undefined,
    author: post.author?.trim() || undefined,
  }))

/** Normalize the two legacy `isDraft` entries without dirtying the content submodule. */
export const postSchema = z.preprocess((input) => {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return input
  const { isDraft, ...post } = input as Record<string, unknown>
  const flags = [post.draft, isDraft].filter((flag) => flag !== undefined)
  const invalidFlag = flags.find((flag) => typeof flag !== 'boolean')
  return {
    ...post,
    draft: invalidFlag ?? flags.some((flag) => flag === true),
  }
}, normalizedPostSchema)

export type PostFrontmatter = z.infer<typeof postSchema>

const posts = defineCollection({
  loader: glob({
    base: './src/content/posts',
    pattern: '**/*.md',
  }),
  schema: postSchema,
})

export const collections = { posts }
