import { describe, expect, it } from 'vitest'
import { postSchema } from '../src/content.config'

const base = { title: 'Post', date: '2025-07-27' }

describe('post schema', () => {
  it.each([
    [{}, false],
    [{ draft: false }, false],
    [{ draft: true }, true],
    [{ isDraft: true }, true],
    [{ draft: false, isDraft: true }, true],
  ])('normalizes publication flags %#', (flags, expected) => {
    const result = postSchema.parse({ ...base, ...flags })
    expect(result.draft).toBe(expected)
    expect(result).not.toHaveProperty('isDraft')
  })

  it('accepts and trims authored metadata', () => {
    const result = postSchema.parse({
      ...base,
      summary: '  Summary  ',
      author: '  kratos  ',
      lastModified: '2025-07-28',
    })
    expect(result.summary).toBe('Summary')
    expect(result.author).toBe('kratos')
    expect(result.lastModified?.toISOString()).toBe('2025-07-28T00:00:00.000Z')
  })

  it.each([
    { title: '', date: '2025-07-27' },
    { title: 'Post', date: 'July 27' },
    { ...base, unknown: true },
    { ...base, draft: 'false' },
    { ...base, isDraft: 'false' },
  ])('rejects invalid or unknown facts %#', (input) => {
    expect(postSchema.safeParse(input).success).toBe(false)
  })
})
