import { formatDistanceToNow, format } from 'date-fns'

export function formatTimeAgo(timestamp: number): string {
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true })
}

export function formatDate(timestamp: number): string {
  return format(new Date(timestamp), 'MMM d, yyyy')
}

export function formatDateTime(timestamp: number): string {
  return format(new Date(timestamp), 'MMM d, yyyy HH:mm')
}

export function formatGDollars(amount: number): string {
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(1)}M G$`
  }
  if (amount >= 1_000) {
    return `${(amount / 1_000).toFixed(1)}K G$`
  }
  return `${amount.toFixed(0)} G$`
}

export function formatNumber(n: number): string {
  return n.toLocaleString()
}

export function formatCountdown(ms: number): {
  days: number
  hours: number
  minutes: number
  seconds: number
} {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000))
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return { days, hours, minutes, seconds }
}

export function padZero(n: number): string {
  return n.toString().padStart(2, '0')
}

export function formatCoordinate(x: number, y: number): string {
  return `(${x}, ${y})`
}
