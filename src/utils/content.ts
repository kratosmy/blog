import { getCollection } from 'astro:content'
import { DateTime } from 'luxon'

export const getAllPosts = async (locale: string, tag: string) => {
  const allPosts = await getCollection('posts')
  const filteredPosts = allPosts
    .map((i) => ({
      ...i.data,
      url: `/posts/${i.slug}/`,
    }))
    .filter((d) => {
      if (!d) return false
      if (tag) {
        return d.date && !d.isDraft && d.tags && d.tags.includes(tag)
      }
      return !d.isDraft && d.date
    })
    .sort((a, b) => {
      return (
        DateTime.fromJSDate(new Date(b.date)).toMillis() -
        DateTime.fromJSDate(new Date(a.date)).toMillis()
      )
    })

  return {
    posts: filteredPosts,
    tags: new Set(filteredPosts.filter((i) => i.tags).flatMap((i) => i.tags)),
  }
}
