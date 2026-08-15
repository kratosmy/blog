import type { PostFrontmatter } from '../content.config'

/** Supported site locales. Default locale is Chinese (`zh`). */
export type SupportedLocale = 'zh' | 'en'

/** Published post as presented to pages (frontmatter + routing fields). */
export type Post = PostFrontmatter & {
  id: string
  url: string
  locale: SupportedLocale
  /** Clean identifier without the locale prefix. */
  pathSlug: string
  body: string
  description: string
}

export interface PostCollection {
  posts: Post[]
  tags: Set<string>
}

export interface LocaleConfig {
  t: (key: string) => string
  locale: SupportedLocale
}

export interface ReadingStats {
  wordCount: number
  readingTime: number
  displayText: string
}
