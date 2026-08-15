/**
 * Locale module — sole seam for language detection, URL policy, and i18n.
 */
import en from '../locales/en.yml'
import zh from '../locales/zh.yml'
import type { LocaleConfig, SupportedLocale } from '../types'

const dicts: Record<SupportedLocale, Record<string, unknown>> = {
  zh: zh as Record<string, unknown>,
  en: en as Record<string, unknown>,
}

function getPath(obj: Record<string, unknown>, key: string): unknown {
  return key.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object' && part in (acc as object)) {
      return (acc as Record<string, unknown>)[part]
    }
    return undefined
  }, obj)
}

export function localeFromUrl(url: URL): SupportedLocale {
  const { pathname } = url
  if (pathname === '/en' || pathname.startsWith('/en/')) return 'en'
  return 'zh'
}

/** Normalize a locale-aware path according to the public URL policy. */
export function localePath(locale: SupportedLocale, path: string): string {
  const raw = path.startsWith('/') ? path : `/${path}`
  const normalized = raw === '/' ? '/' : `${raw.replace(/\/+$/, '')}/`
  if (locale === 'en') return normalized === '/' ? '/en/' : `/en${normalized}`
  return normalized === '/' ? '/' : `/zh${normalized}`
}

export function homeUrl(locale: SupportedLocale): string {
  return localePath(locale, '/')
}

/** Canonicalize the two intentionally addressable Chinese aliases. */
export function canonicalPath(pathname: string): string {
  if (pathname === '/zh' || pathname === '/zh/') return '/'
  if (pathname === '/tags' || pathname === '/tags/') return '/zh/tags/'
  return pathname
}

export type SiteSection = 'posts' | 'tags'

export function activeSection(url: URL): SiteSection {
  return /(^|\/)tags(?:\/|$)/.test(url.pathname) ? 'tags' : 'posts'
}

/** Return the equivalent path in the other locale. */
export function toggleUrl(url: URL): string {
  const { pathname } = url
  if (localeFromUrl(url) === 'en') {
    const rest = pathname.replace(/^\/en(?=\/|$)/, '') || '/'
    return localePath('zh', rest)
  }
  const rest = pathname.replace(/^\/zh(?=\/|$)/, '') || '/'
  return localePath('en', rest)
}

export function translate(locale: SupportedLocale, key: string): string {
  const primary = dicts[locale] ?? dicts.zh
  const fallback = locale === 'zh' ? dicts.en : dicts.zh
  const value = getPath(primary, key) ?? getPath(fallback, key)
  if (typeof value === 'string') return value
  return key.split('.').pop() || key
}

export const useLocale = (url: URL): LocaleConfig => {
  const locale = localeFromUrl(url)
  return {
    locale,
    t: (key: string) => translate(locale, key),
  }
}
