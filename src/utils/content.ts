import { getCollection } from 'astro:content'
import { DateTime } from 'luxon'

interface PostData {
  title?: string
  'title-en'?: string
  tags?: string[]
  date: string
  isDraft?: boolean
  url: string
}

export const getAllPosts = async (locale: string, tag: string) => {
  const allPosts = await getCollection('posts')

  // 根据 locale 过滤文章
  const languageFilteredPosts = allPosts.filter((post) => {
    const isChinesePost = post.slug.startsWith('zh/')
    const isEnglishPost = post.slug.startsWith('en/')

    // 如果没有指定语言或者是中文环境，显示中文文章
    if (!locale || locale === 'zh') {
      return isChinesePost
    }
    // 如果是英文环境，显示英文文章
    return isEnglishPost
  })

  const filteredPosts = languageFilteredPosts
    .map((i) => {
      // 根据语言生成正确的 URL
      const cleanSlug = i.slug.replace(/^(zh|en)\//, '')
      const langPrefix = i.slug.startsWith('zh/') ? 'zh' : 'en'
      return {
        ...i.data,
        url: `/${langPrefix}/posts/${cleanSlug}/`,
        slug: i.slug,
      }
    })
    .filter((d): d is PostData & { slug: string } => {
      if (!d) return false
      if (tag) {
        return Boolean(d.date && !d.isDraft && d.tags?.includes(tag))
      }
      return Boolean(!d.isDraft && d.date)
    })
    .sort((a, b) => {
      return (
        DateTime.fromJSDate(new Date(b.date)).toMillis() -
        DateTime.fromJSDate(new Date(a.date)).toMillis()
      )
    })

  return {
    posts: filteredPosts,
    tags: new Set(filteredPosts.filter((i) => i.tags).flatMap((i) => i.tags!)),
  }
}
