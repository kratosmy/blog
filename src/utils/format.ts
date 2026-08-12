/** Format a date as `D Mon, YYYY` (e.g. 4 Aug, 2026). */
export function formatDateYMD(dateStr: string | number | Date): string {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const d = new Date(dateStr)
  const day = d.getDate()
  const month = months[d.getMonth()]
  const year = d.getFullYear()
  return `${day} ${month}, ${year}`
}

/** Format an archive date without local-time drift. */
export function formatArchiveDate(
  dateStr: string,
  locale: 'zh' | 'en',
): string {
  const [year, month, day] = dateStr.slice(0, 10).split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  return new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
    month: 'short',
    day: '2-digit',
    timeZone: 'UTC',
  }).format(date)
}
