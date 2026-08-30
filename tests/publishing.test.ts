import { describe, expect, it } from 'vitest'
import { postDescription, publishingMetadata } from '../src/utils/publishing'

const site = new URL('https://blog.example')

describe('publishing metadata', () => {
  it('canonicalizes the Chinese home alias and derives alternates', () => {
    const metadata = publishingMetadata({
      url: new URL('/zh/', site),
      site,
      locale: 'zh',
      title: 'Archive',
    })
    expect(metadata.title).toBe('Archive - John Wick')
    expect(metadata.canonicalUrl.href).toBe('https://blog.example/')
    expect(metadata.socialImage.href).toBe('https://blog.example/og.jpg')
    expect(
      metadata.alternates?.map(({ href, hrefLang }) => [
        hrefLang,
        href.pathname,
      ]),
    ).toEqual([
      ['zh-CN', '/'],
      ['en', '/en/'],
      ['x-default', '/'],
    ])
  })

  it('keeps metadata for 404 unpaired', () => {
    const metadata = publishingMetadata({
      url: new URL('/404/', site),
      site,
      locale: 'zh',
      title: '404',
      languageAlternates: false,
    })
    expect(metadata.alternates).toBeUndefined()
    expect(metadata.description).not.toBe('description')
  })

  it('prefers an authored summary and otherwise derives a clean excerpt', () => {
    expect(postDescription('  Authored summary.  ', '# ignored')).toBe(
      'Authored summary.',
    )
    expect(postDescription(undefined, '# Heading\n\nBody **copy**.')).toBe(
      'Heading Body copy .',
    )
  })
})
