import { defineCollection, z } from 'astro:content'

export const postSchema = z.object({
  title: z.string().optional(),
  'title-en': z.string().optional(),
  tags: z.array(z.string()).optional(),
  date: z.string(),
  lastModified: z.date().optional(),
  notificationTypes: z.array(z.string()).optional(),
  isDraft: z.boolean().optional(),
  url: z.string().optional(),
})

export type PostFrontmatter = z.infer<typeof postSchema>

const posts = defineCollection({
  type: 'content',
  schema: postSchema,
})

export const collections = {
  posts,
}
