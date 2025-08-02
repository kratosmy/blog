import get from 'lodash/get'
import en from '../locales/en.yml'
import zh from '../locales/zh.yml'

// Extract locale from URL path
const getLocale = (url: URL) => {
  const pathname = url.pathname
  if (pathname.startsWith('/en/') || pathname === '/en') {
    return 'en'
  }
  if (pathname.startsWith('/zh/') || pathname === '/zh') {
    return 'zh'
  }
  // Default to Chinese for root paths
  return 'zh'
}

const useLocalePath = (lang: string) => {
  const normalizedLang = lang ?? ''
  const localeLang = normalizedLang === 'zh' ? '' : normalizedLang
  const start = localeLang ? '/en' : ''
  return (path: string) => {
    let url = start + path
    if (!url.endsWith('/')) url += '/'
    return url
  }
}

const useTranslation = (lang: string) => {
  const normalizedLang = lang || 'zh'
  return (key: string): string => {
    const data = normalizedLang === 'zh' ? [zh, en] : [en, zh]
    const r = get(data[0], key) as string
    if (!r) {
      console.warn(`Translation for "${key}" not found`)
      return key.split('.').pop() || key
    }
    return r
  }
}

export const useLocale = (url: URL) => {
  const locale = getLocale(url)
  return {
    path: useLocalePath(locale),
    t: useTranslation(locale),
    locale,
  }
}
