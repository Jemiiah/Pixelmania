import type { LeaderboardEntry } from '@/lib/types.ts'
import { formatNumber } from '@/lib/format.ts'
import clsx from 'clsx'

interface LeaderboardRowProps {
  entry: LeaderboardEntry
  isCurrentUser?: boolean
}

const rankColors: Record<number, string> = {
  1: 'text-tertiary-400',
  2: 'text-[#c0c0c0]',
  3: 'text-[#cd7f32]',
}

const rankLabels: Record<number, string> = {
  1: '\u{1F947}',
  2: '\u{1F948}',
  3: '\u{1F949}',
}

function addressToColor(address: string): string {
  const hash = address.slice(2, 8)
  return `#${hash}`
}

export function LeaderboardRow({ entry, isCurrentUser }: LeaderboardRowProps) {
  const { rank, user, pixelsPlaced } = entry

  return (
    <div
      className={clsx(
        'flex items-center gap-3 rounded-md px-3 py-2 transition-colors duration-150',
        isCurrentUser
          ? 'bg-primary-500/10 border border-primary-500/20'
          : 'hover:bg-bg-elevated',
      )}
    >
      {/* Rank */}
      <span
        className={clsx(
          'w-7 shrink-0 text-center text-sm font-bold',
          rankColors[rank] ?? 'text-text-tertiary',
        )}
      >
        {rankLabels[rank] ?? rank}
      </span>

      {/* Avatar */}
      <div
        className="h-7 w-7 shrink-0 rounded-full"
        style={{ backgroundColor: addressToColor(user.address) }}
      />

      {/* Username */}
      <span className="min-w-0 flex-1 truncate text-sm font-medium text-text-primary">
        {user.username}
      </span>

      {/* Pixel count */}
      <span className="shrink-0 text-xs font-mono text-text-secondary">
        {formatNumber(pixelsPlaced)} px
      </span>
    </div>
  )
}
