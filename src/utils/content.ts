/**
 * Posts module — sole adapter over astro:content for list/detail/tags/RSS.
 */
import { getCollection, getEntry, type CollectionEntry } from 'astro:content'
import { DateTime } from 'luxon'
import type { Post, PostCollection, SupportedLocale } from '../types'

function localeFromSlug(slug: string): SupportedLocale | null {
  if (slug.startsWith('zh/')) return 'zh'
  if (slug.startsWith('en/')) return 'en'
  return null
}

function pathSlugOf(slug: string): string {
  return slug.replace(/^(zh|en)\//, '')
}

/** Tag string → URL segment (shared by links and getStaticPaths). */
export function tagSlug(tag: string): string {
  return tag.replace(/\s/g, '-')
}

export function postUrl(locale: SupportedLocale, pathSlug: string): string {
  return `/${locale}/posts/${pathSlug}/`
}

export function displayTitle(
  post: Pick<Post, 'title' | 'title-en' | 'locale'> & { pathSlug?: string },
): string {
  if (post.locale === 'en' && post['title-en']) return post['title-en']
  return post.title ?? post['title-en'] ?? post.pathSlug ?? ''
}

function toPost(entry: CollectionEntry<'posts'>): Post | null {
  const locale = localeFromSlug(entry.slug)
  if (!locale) return null
  const pathSlug = pathSlugOf(entry.slug)
  return {
    ...entry.data,
    slug: entry.slug,
    pathSlug,
    locale,
    url: postUrl(locale, pathSlug),
  }
}

function isPublished(post: Post): boolean {
  return Boolean(!post.isDraft && post.date)
}

/**
 * List published posts for a locale, optionally filtered by tag.
 * Tag match uses the raw tag string from frontmatter (not the URL slug).
 */
export async function listPosts(
  locale: SupportedLocale,
  options: { tag?: string } = {},
): Promise<PostCollection> {
  const all = await getCollection('posts')
  const { tag } = options

  const posts = all
    .map(toPost)
    .filter(
      (p): p is Post => p !== null && p.locale === locale && isPublished(p),
    )
    .filter((p) => (tag ? Boolean(p.tags?.includes(tag)) : true))
    .sort(
      (a, b) =>
        DateTime.fromJSDate(new Date(b.date)).toMillis() -
        DateTime.fromJSDate(new Date(a.date)).toMillis(),
    )

  return {
    posts,
    tags: new Set(posts.flatMap((p) => p.tags ?? [])),
  }
}

export async function listTags(locale: SupportedLocale): Promise<string[]> {
  const { tags } = await listPosts(locale)
  return Array.from(tags).sort()
}

export async function getPost(
  locale: SupportedLocale,
  pathSlug: string,
): Promise<CollectionEntry<'posts'> | null> {
  const entry = await getEntry('posts', `${locale}/${pathSlug}`)
  if (!entry || entry.data.isDraft) return null
  return entry
}

export async function getStaticPostPaths(locale: SupportedLocale) {
  const notes = await getCollection('posts', (post) =>
    post.slug.startsWith(`${locale}/`),
  )
  return notes
    .filter((n) => !n.data.isDraft)
    .map((note) => ({
      params: { slug: pathSlugOf(note.slug) },
    }))
}

export async function getStaticTagPaths(locale: SupportedLocale) {
  const tags = await listTags(locale)
  return tags.map((tag) => ({
    params: { tag: tagSlug(tag) },
  }))
}

/** Resolve URL tag param back to a frontmatter tag (spaces vs hyphens). */
export async function resolveTag(
  locale: SupportedLocale,
  tagParam: string,
): Promise<string | undefined> {
  const tags = await listTags(locale)
  return tags.find((t) => tagSlug(t) === tagParam || t === tagParam)
}

export interface RssItem {
  title: string
  link: string
  date: string
  content: string
}

/** Map published posts to RSS item fields (caller renders HTML body). */
export async function listPostsForRss(): Promise<
  Array<CollectionEntry<'posts'> & { link: string }>
> {
  const blog = await getCollection('posts', (i) =>
    Boolean(i.data.title && !i.data.isDraft && i.data.date),
  )
  return blog
    .sort((a, b) => (a.data.date < b.data.date ? 1 : -1))
    .map((post) => {
      const locale = localeFromSlug(post.slug) ?? 'zh'
      const pathSlug = pathSlugOf(post.slug)
      return {
        ...post,
        link: postUrl(locale, pathSlug),
      }
    })
}
