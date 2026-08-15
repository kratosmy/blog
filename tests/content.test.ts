import { beforeEach, describe, expect, it, vi } from 'vitest'

interface MockEntry {
  id: string
  collection: string
  data: Record<string, unknown>
  body: string
}

const content = vi.hoisted(() => {
  const entries: MockEntry[] = []
  const RenderedContent = () => null
  return {
    entries,
    RenderedContent,
    getCollection: vi.fn(
      async (_collection: string, filter?: (entry: MockEntry) => boolean) =>
        filter ? entries.filter(filter) : entries,
    ),
    getEntry: vi.fn(async (_collection: string, id: string) =>
      entries.find((entry) => entry.id === id),
    ),
    render: vi.fn(async () => ({ Content: RenderedContent })),
  }
})

vi.mock('astro:content', () => ({
  getCollection: content.getCollection,
  getEntry: content.getEntry,
  render: content.render,
}))

import {
  getPost,
  getStaticPostPaths,
  listPosts,
  listPostsForRss,
  resolveTag,
} from '../src/utils/content'

function entry(
  id: string,
  data: Record<string, unknown>,
  body = 'Body **copy**.',
) {
  return {
    id,
    collection: 'posts',
    data: {
      title: id,
      date: '2025-01-01',
      draft: false,
      ...data,
    },
    body,
  }
}

describe('Posts module', () => {
  beforeEach(() => {
    content.entries.splice(
      0,
      content.entries.length,
      entry('zh/older', {
        title: '较早',
        date: '2024-01-01',
        tags: ['C Language'],
      }),
      entry('zh/newer', { title: '较新', date: '2025-01-01', tags: ['Life'] }),
      entry('zh/draft', { title: '草稿', date: '2026-01-01', draft: true }),
      entry('en/newer', {
        title: '中文标题',
        'title-en': 'English title',
        date: '2025-01-01',
        summary: 'Summary',
      }),
    )
    vi.clearAllMocks()
  })

  it('normalizes identity, URL, publication, and newest-first ordering', async () => {
    const { posts } = await listPosts('zh')
    expect(posts.map(({ pathSlug }) => pathSlug)).toEqual(['newer', 'older'])
    expect(posts[0]).toMatchObject({
      id: 'zh/newer',
      locale: 'zh',
      url: '/zh/posts/newer/',
      description: 'Body copy .',
    })
  })

  it('uses one publication rule for paths and detail rendering', async () => {
    await expect(getStaticPostPaths('zh')).resolves.toEqual([
      { params: { slug: 'newer' } },
      { params: { slug: 'older' } },
    ])
    await expect(getPost('zh', 'draft')).resolves.toBeNull()
    const detail = await getPost('zh', 'newer')
    expect(detail?.post.pathSlug).toBe('newer')
    expect(detail?.Content).toBe(content.RenderedContent)
    expect(content.render).toHaveBeenCalledTimes(1)
  })

  it('filters and resolves authored tags through the public interface', async () => {
    const { posts } = await listPosts('zh', { tag: 'C Language' })
    expect(posts.map(({ pathSlug }) => pathSlug)).toEqual(['older'])
    await expect(resolveTag('zh', 'C-Language')).resolves.toBe('C Language')
  })

  it('returns complete feed facts without leaking collection entries', async () => {
    const items = await listPostsForRss()
    expect(items).toHaveLength(3)
    const english = items.find(({ title }) => title === 'English title')
    expect(english).toMatchObject({
      description: 'Summary',
      link: '/en/posts/newer/',
    })
    expect(english?.content).toContain('<p>Body <strong>copy</strong>.</p>')
    expect(english).not.toHaveProperty('data')
    expect(english).not.toHaveProperty('id')
  })
})
