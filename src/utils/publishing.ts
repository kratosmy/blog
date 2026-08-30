import type { SupportedLocale } from '../types'
import { canonicalPath, toggleUrl } from './locale'

export const SITE_NAME = 'John Wick'
export const SITE_URL = 'https://blog.changshaking.xyz'
export const SOCIAL_IMAGE_PATH = '/og.jpg'

const descriptions: Record<SupportedLocale, string> = {
  zh: 'John Wick 的双语个人文章归档，记录技术、阅读、电影与生活。',
  en: "John Wick's bilingual archive of notes on technology, reading, film, and life.",
}

export interface LanguageAlternate {
  href: URL
  hrefLang: 'zh-CN' | 'en' | 'x-default'
}

export interface PublishingMetadata {
  title: string
  description: string
  canonicalUrl: URL
  socialImage: URL
  alternates?: LanguageAlternate[]
  openGraphLocale: 'zh_CN' | 'en_US'
  openGraphLocaleAlternate: 'en_US' | 'zh_CN'
}

export function publishingMetadata(input: {
  url: URL
  site?: URL
  locale: SupportedLocale
  title?: string
  description?: string
  languageAlternates?: boolean
}): PublishingMetadata {
  const base = input.site ?? new URL(SITE_URL)
  const canonicalUrl = new URL(canonicalPath(input.url.pathname), base)
  const alternateUrl = new URL(toggleUrl(input.url), base)
  const title = input.title?.trim()
  const description = input.description?.trim() || descriptions[input.locale]
  const languageAlternates = input.languageAlternates ?? true
  const zhUrl = input.locale === 'zh' ? canonicalUrl : alternateUrl
  const enUrl = input.locale === 'en' ? canonicalUrl : alternateUrl

  return {
    title: title ? `${title} - ${SITE_NAME}` : SITE_NAME,
    description,
    canonicalUrl,
    socialImage: new URL(SOCIAL_IMAGE_PATH, base),
    alternates: languageAlternates
      ? [
          { href: zhUrl, hrefLang: 'zh-CN' },
          { href: enUrl, hrefLang: 'en' },
          { href: zhUrl, hrefLang: 'x-default' },
        ]
      : undefined,
    openGraphLocale: input.locale === 'zh' ? 'zh_CN' : 'en_US',
    openGraphLocaleAlternate: input.locale === 'zh' ? 'en_US' : 'zh_CN',
  }
}

export function postDescription(
  summary: string | undefined,
  body: string,
): string {
  const authored = summary?.trim()
  if (authored) return authored
  return body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#*_`>[\]()!-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 160)
}

export function feedMetadata(site?: URL) {
  return {
    title: SITE_NAME,
    description: descriptions.en,
    site: site ?? new URL(SITE_URL),
  }
}
