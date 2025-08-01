/**
 * 计算文本的字数和阅读时间
 */

interface ReadingStats {
  wordCount: number
  readingTime: number // 分钟
  displayText: string
}

/**
 * 计算中文字符数
 */
function countChineseChars(text: string): number {
  const chineseRegex = /[\u4e00-\u9fff]/g
  return (text.match(chineseRegex) || []).length
}

/**
 * 计算英文单词数
 */
function countEnglishWords(text: string): number {
  // 移除中文字符后计算英文单词
  const englishText = text.replace(/[\u4e00-\u9fff]/g, '')
  const words = englishText.match(/\b\w+\b/g)
  return words ? words.length : 0
}

/**
 * 清理 Markdown 内容
 */
function cleanMarkdown(content: string): string {
  return (
    content
      // 移除代码块
      .replace(/```[\s\S]*?```/g, '')
      // 移除行内代码
      .replace(/`[^`]*`/g, '')
      // 移除链接
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      // 移除图片
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, '')
      // 移除标题标记
      .replace(/^#{1,6}\s+/gm, '')
      // 移除列表标记
      .replace(/^[-*+]\s+/gm, '')
      .replace(/^\d+\.\s+/gm, '')
      // 移除引用标记
      .replace(/^>\s+/gm, '')
      // 移除多余空白
      .replace(/\s+/g, ' ')
      .trim()
  )
}

/**
 * 计算阅读统计信息
 */
export function calculateReadingStats(
  content: string,
  locale = 'zh',
): ReadingStats {
  const cleanContent = cleanMarkdown(content)

  const chineseChars = countChineseChars(cleanContent)
  const englishWords = countEnglishWords(cleanContent)

  // 中文阅读速度：300-500字/分钟，取400
  // 英文阅读速度：200-300词/分钟，取250
  const chineseReadingSpeed = 400
  const englishReadingSpeed = 250

  const chineseReadingTime = chineseChars / chineseReadingSpeed
  const englishReadingTime = englishWords / englishReadingSpeed
  const totalReadingTime = Math.ceil(chineseReadingTime + englishReadingTime)

  // 智能判断内容主要语言
  const isMainlyChinese = chineseChars > englishWords * 2
  const totalCount = chineseChars + englishWords

  // 根据内容主要语言决定显示方式（忽略 locale 参数，因为它可能不准确）
  if (isMainlyChinese) {
    // 主要是中文内容：显示总字符数
    return {
      wordCount: totalCount,
      readingTime: Math.max(1, totalReadingTime), // 至少1分钟
      displayText: `${totalCount} 字`,
    }
  } else {
    // 主要是英文内容：显示总单词数
    return {
      wordCount: totalCount,
      readingTime: Math.max(1, totalReadingTime),
      displayText: `${totalCount} words`,
    }
  }
}

/**
 * 格式化阅读时间显示
 */
export function formatReadingTime(minutes: number, locale = 'zh'): string {
  if (locale === 'zh') {
    return `${minutes} 分钟`
  } else {
    return minutes === 1 ? '1 min' : `${minutes} mins`
  }
}
