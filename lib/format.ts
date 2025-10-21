import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(utc)
dayjs.extend(relativeTime)

// Format numbers with commas
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num)
}

// Format large numbers with K/M/B suffixes
export function formatCompactNumber(num: number): string {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + 'B'
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + 'M'
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + 'K'
  }
  return num.toString()
}

// Format percentage
export function formatPercentage(value: number, total: number): string {
  if (total === 0) return '0%'
  return ((value / total) * 100).toFixed(1) + '%'
}

// Format date in UTC
export function formatDate(date: string | Date): string {
  return dayjs(date).utc().format('YYYY-MM-DD HH:mm:ss UTC')
}

// Format relative time
export function formatRelativeTime(date: string | Date): string {
  return dayjs(date).utc().fromNow()
}

// Format serial range
export function formatSerialRange(start: number, end: number): string {
  return `${formatNumber(start)}–${formatNumber(end)}`
}

// Truncate hash for display
export function truncateHash(hash: string, length = 8): string {
  if (hash.length <= length * 2) return hash
  return `${hash.slice(0, length)}...${hash.slice(-length)}`
}

// Validate and sanitize URL
export function sanitizeUrl(url: string): string | null {
  try {
    const parsed = new URL(url)
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.toString()
    }
    return null
  } catch {
    return null
  }
}

// Generate external link props
export function getExternalLinkProps(url: string) {
  return {
    href: url,
    target: '_blank',
    rel: 'noopener noreferrer'
  }
}
