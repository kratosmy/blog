/**
 * Posts module — sole adapter over astro:content for list, detail, tags, and RSS.
 */
import {
  getCollection,
  getEntry,
  render,
  type CollectionEntry,
} from 'astro:content'
import MarkdownIt from 'markdown-it'
import type { Post, PostCollection, SupportedLocale } from '../types'
import { asUtcDate } from './format'
import { localePath } from './locale'
import { postDescription } from './publishing'

const markdown = new MarkdownIt()

function localeFromId(id: string): SupportedLocale | null {
  if (id.startsWith('zh/')) return 'zh'
  if (id.startsWith('en/')) return 'en'
  return null
}

function pathSlugOf(id: string): string {
  return id.replace(/^(zh|en)\//, '')
}

/** Tag string → URL segment, shared by links and static paths. */
export function tagSlug(tag: string): string {
  return tag.replace(/\s/g, '-')
}

export function postUrl(locale: SupportedLocale, pathSlug: string): string {
  return localePath(locale, `/posts/${pathSlug}`)
}

export function displayTitle(
  post: Pick<Post, 'title' | 'title-en' | 'locale' | 'pathSlug'>,
): string {
  if (post.locale === 'en' && post['title-en']) return post['title-en']
  return post.title || post['title-en'] || post.pathSlug
}

function toPost(entry: CollectionEntry<'posts'>): Post | null {
  const locale = localeFromId(entry.id)
  if (!locale) return null
  const pathSlug = pathSlugOf(entry.id)
  const body = entry.body ?? ''
  return {
    ...entry.data,
    id: entry.id,
    pathSlug,
    locale,
    url: postUrl(locale, pathSlug),
    body,
    description: postDescription(entry.data.summary, body),
  }
}

function isPublished(post: Pick<Post, 'draft'>): boolean {
  return post.draft === false
}

function newestFirst(a: Post, b: Post): number {
  return b.date.localeCompare(a.date)
}

async function allPublishedPosts(): Promise<Post[]> {
  const entries = await getCollection('posts')
  return entries
    .map(toPost)
    .filter((post): post is Post => post !== null && isPublished(post))
    .sort(newestFirst)
}

/** List published posts for one locale, optionally filtered by raw tag. */
export async function listPosts(
  locale: SupportedLocale,
  options: { tag?: string } = {},
): Promise<PostCollection> {
  const { tag } = options
  const posts = (await allPublishedPosts())
    .filter((post) => post.locale === locale)
    .filter((post) => (tag ? Boolean(post.tags?.includes(tag)) : true))

  return {
    posts,
    tags: new Set(posts.flatMap((post) => post.tags ?? [])),
  }
}

async function listTags(locale: SupportedLocale): Promise<string[]> {
  const { tags } = await listPosts(locale)
  return Array.from(tags).sort()
}

/** Load one published post and hide Astro's entry/render details from callers. */
export async function getPost(locale: SupportedLocale, pathSlug: string) {
  const entry = await getEntry('posts', `${locale}/${pathSlug}`)
  if (!entry) return null
  const post = toPost(entry)
  if (!post || post.locale !== locale || !isPublished(post)) return null
  const { Content } = await render(entry)
  return { post, Content }
}

export async function getStaticPostPaths(locale: SupportedLocale) {
  const { posts } = await listPosts(locale)
  return posts.map((post) => ({ params: { slug: post.pathSlug } }))
}

export async function getStaticTagPaths(locale: SupportedLocale) {
  const tags = await listTags(locale)
  return tags.map((tag) => ({ params: { tag: tagSlug(tag) } }))
}

/** Resolve a URL tag param back to the authored tag. */
export async function resolveTag(
  locale: SupportedLocale,
  tagParam: string,
): Promise<string | undefined> {
  const tags = await listTags(locale)
  return tags.find((tag) => tagSlug(tag) === tagParam || tag === tagParam)
}

interface RssItem {
  title: string
  description: string
  link: string
  pubDate: Date
  content: string
  categories?: string[]
}

/** Return complete feed facts without leaking raw collection entries. */
export async function listPostsForRss(): Promise<RssItem[]> {
  const posts = await allPublishedPosts()
  return posts.map((post) => ({
    title: displayTitle(post),
    description: post.description,
    link: post.url,
    pubDate: asUtcDate(post.date),
    content: markdown.render(post.body),
    categories: post.tags,
  }))
}
