// 通用类型定义

export interface Post {
  title?: string
  'title-en'?: string
  tags?: string[]
  date: string
  lastModified?: Date
  notificationTypes?: string[]
  isDraft?: boolean
  url: string
  slug?: string
}

export interface PostCollection {
  posts: Post[]
  tags: Set<string>
}

export interface LocaleConfig {
  path: (path: string) => string
  t: (key: string) => string
  locale: string
}

export type SupportedLocale = 'zh' | 'en'

export interface ReadingStats {
  wordCount: number
  readingTime: number // 分钟
  displayText: string
}
