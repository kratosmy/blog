import { defineCollection, z } from 'astro:content'

const postSchema = z.object({
  title: z.string().optional(),
  'title-en': z.string().optional(),
  tags: z.array(z.string()).optional(),
  date: z.string(),
  lastModified: z.date().optional(),
  notificationTypes: z.array(z.string()).optional(),
  isDraft: z.boolean().optional(),
  url: z.string().optional(),
})

const posts = defineCollection({
  type: 'content',
  schema: postSchema,
})

const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    hidden: z.boolean().optional(),
    lastModified: z.date().optional(),
  }),
})

const now = defineCollection({
  type: 'content',
})

export const collections = {
  posts,
  docs,
  now,
}
