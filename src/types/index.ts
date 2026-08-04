import type { PostFrontmatter } from '../content.config'

/** Supported site locales. Default locale is Chinese (`zh`). */
export type SupportedLocale = 'zh' | 'en'

/** Published post as presented to pages (frontmatter + routing fields). */
export type Post = PostFrontmatter & {
  url: string
  slug: string
  locale: SupportedLocale
  /** Clean slug without locale prefix */
  pathSlug: string
}

export interface PostCollection {
  posts: Post[]
  tags: Set<string>
}

export interface LocaleConfig {
  path: (path: string) => string
  t: (key: string) => string
  locale: SupportedLocale
}

export interface ReadingStats {
  wordCount: number
  readingTime: number
  displayText: string
}
