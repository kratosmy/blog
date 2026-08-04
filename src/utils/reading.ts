/**
 * Reading stats from post body text (language inferred from content).
 */
import type { ReadingStats } from '../types'

function countChineseChars(text: string): number {
  const chineseRegex = /[\u4e00-\u9fff]/g
  return (text.match(chineseRegex) || []).length
}

function countEnglishWords(text: string): number {
  const englishText = text.replace(/[\u4e00-\u9fff]/g, '')
  const words = englishText.match(/\b\w+\b/g)
  return words ? words.length : 0
}

function cleanMarkdown(content: string): string {
  return content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^[-*+]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/^>\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Compute word/char count and reading minutes from markdown body. */
export function calculateReadingStats(content: string): ReadingStats {
  const cleanContent = cleanMarkdown(content)

  const chineseChars = countChineseChars(cleanContent)
  const englishWords = countEnglishWords(cleanContent)

  const chineseReadingSpeed = 400
  const englishReadingSpeed = 250

  const totalReadingTime = Math.ceil(
    chineseChars / chineseReadingSpeed + englishWords / englishReadingSpeed,
  )

  const isMainlyChinese = chineseChars > englishWords * 2
  const totalCount = chineseChars + englishWords

  if (isMainlyChinese) {
    return {
      wordCount: totalCount,
      readingTime: Math.max(1, totalReadingTime),
      displayText: `${totalCount} 字`,
    }
  }
  return {
    wordCount: totalCount,
    readingTime: Math.max(1, totalReadingTime),
    displayText: `${totalCount} words`,
  }
}

export function formatReadingTime(
  minutes: number,
  locale: 'zh' | 'en' = 'zh',
): string {
  if (locale === 'zh') return `${minutes} 分钟`
  return minutes === 1 ? '1 min' : `${minutes} mins`
}
