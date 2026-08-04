/**
 * Locale module — sole seam for language detection, path policy, and i18n.
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
  const pathname = url.pathname
  if (pathname === '/en' || pathname.startsWith('/en/')) return 'en'
  if (pathname === '/zh' || pathname.startsWith('/zh/')) return 'zh'
  // Root and unprefixed paths default to Chinese
  return 'zh'
}

/** Locale-prefixed path. Chinese uses `/zh` for non-root pages; root home is `/`. */
export function localePath(locale: SupportedLocale, path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (locale === 'en') {
    const base = `/en${normalized === '/' ? '/' : normalized}`
    return base.endsWith('/') ? base : `${base}/`
  }
  // zh: keep root home as `/`; other paths use `/zh/...` for consistency with existing routes
  if (normalized === '/') return '/'
  const base = `/zh${normalized}`
  return base.endsWith('/') ? base : `${base}/`
}

export function homeUrl(locale: SupportedLocale): string {
  return locale === 'en' ? '/en/' : '/'
}

export function toggleUrl(url: URL): string {
  const locale = localeFromUrl(url)
  const { pathname } = url
  if (locale === 'zh') {
    if (pathname === '/' || pathname === '/zh' || pathname === '/zh/')
      return '/en/'
    if (pathname.startsWith('/zh/')) return pathname.replace(/^\/zh/, '/en')
    // root-level paths like /tags/
    return `/en${pathname.endsWith('/') ? pathname : `${pathname}/`}`
  }
  if (pathname.startsWith('/en/') || pathname === '/en') {
    const rest = pathname.replace(/^\/en/, '') || '/'
    if (rest === '/' || rest === '') return '/'
    return `/zh${rest.endsWith('/') ? rest : `${rest}/`}`
  }
  return pathname
}

export function navUrl(locale: SupportedLocale, item: string): string {
  if (locale === 'en') return `/en/${item}/`
  // Chinese tags also exist at /tags/ (root); prefer /zh/ for consistency with posts
  return `/zh/${item}/`
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
    path: (p: string) => localePath(locale, p),
    t: (key: string) => translate(locale, key),
  }
}
