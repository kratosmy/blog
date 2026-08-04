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
