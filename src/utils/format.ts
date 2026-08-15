export function asUtcDate(dateValue: string | number | Date): Date {
  if (dateValue instanceof Date || typeof dateValue === 'number') {
    return new Date(dateValue)
  }
  const isoDay = dateValue.slice(0, 10)
  if (/^\d{4}-\d{2}-\d{2}$/.test(isoDay)) {
    return new Date(`${isoDay}T00:00:00Z`)
  }
  return new Date(dateValue)
}

/** Serialize a date or date-only value at a stable UTC instant. */
export function toIsoTimestamp(dateValue: string | number | Date): string {
  return asUtcDate(dateValue).toISOString()
}

/** Format a full date for the active locale without local-time drift. */
export function formatDateYMD(
  dateValue: string | number | Date,
  locale: 'zh' | 'en' = 'en',
): string {
  return new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: locale === 'zh' ? 'long' : 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(asUtcDate(dateValue))
}

/** Format a compact archive date without local-time drift. */
export function formatArchiveDate(
  dateStr: string,
  locale: 'zh' | 'en',
): string {
  return new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
    month: 'short',
    day: '2-digit',
    timeZone: 'UTC',
  }).format(asUtcDate(dateStr))
}
