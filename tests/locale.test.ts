import { describe, expect, it } from 'vitest'
import {
  activeSection,
  canonicalPath,
  localeFromUrl,
  localePath,
  toggleUrl,
} from '../src/utils/locale'

const url = (path: string) => new URL(path, 'https://blog.example')

describe('locale URL policy', () => {
  it.each([
    ['/', 'zh'],
    ['/tags/', 'zh'],
    ['/zh/posts/a/', 'zh'],
    ['/en', 'en'],
    ['/en/tags/a/', 'en'],
    ['/english/', 'zh'],
  ] as const)('detects %s as %s', (path, locale) => {
    expect(localeFromUrl(url(path))).toBe(locale)
  })

  it.each([
    ['zh', '/', '/'],
    ['en', '/', '/en/'],
    ['zh', 'tags', '/zh/tags/'],
    ['en', '/posts/a', '/en/posts/a/'],
    ['zh', '/tags/', '/zh/tags/'],
  ] as const)('builds %s %s as %s', (locale, path, expected) => {
    expect(localePath(locale, path)).toBe(expected)
  })

  it.each([
    ['/zh', '/'],
    ['/zh/', '/'],
    ['/tags', '/zh/tags/'],
    ['/tags/', '/zh/tags/'],
    ['/en/', '/en/'],
  ])('canonicalizes %s as %s', (path, expected) => {
    expect(canonicalPath(path)).toBe(expected)
  })

  it.each([
    ['/', 'posts'],
    ['/zh/posts/a/', 'posts'],
    ['/en/', 'posts'],
    ['/tags/', 'tags'],
    ['/zh/tags/a/', 'tags'],
    ['/en/tags/', 'tags'],
  ] as const)('maps %s to the %s section', (path, section) => {
    expect(activeSection(url(path))).toBe(section)
  })

  it.each([
    ['/', '/en/'],
    ['/zh/', '/en/'],
    ['/en/', '/'],
    ['/tags/', '/en/tags/'],
    ['/zh/tags/', '/en/tags/'],
    ['/en/tags/', '/zh/tags/'],
    ['/zh/posts/a/', '/en/posts/a/'],
    ['/en/posts/a/', '/zh/posts/a/'],
  ])('toggles %s to %s', (path, expected) => {
    expect(toggleUrl(url(path))).toBe(expected)
  })
})
