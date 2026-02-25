import type { LeaderboardEntry } from '@/lib/types.ts'
import { formatNumber } from '@/lib/format.ts'
import clsx from 'clsx'

interface LeaderboardRowProps {
  entry: LeaderboardEntry
  isCurrentUser?: boolean
}

const rankBg: Record<number, string> = {
  1: 'bg-gradient-to-r from-tertiary-500/20 to-transparent',
  2: 'bg-gradient-to-r from-[#c0c0c0]/10 to-transparent',
  3: 'bg-gradient-to-r from-[#cd7f32]/10 to-transparent',
}

const rankLabels: Record<number, string> = {
  1: '\u{1F947}',
  2: '\u{1F948}',
  3: '\u{1F949}',
}

function addressToHue(address: string): number {
  let hash = 0
  for (let i = 2; i < 8; i++) hash = address.charCodeAt(i) + ((hash << 5) - hash)
  return Math.abs(hash) % 360
}

export function LeaderboardRow({ entry, isCurrentUser }: LeaderboardRowProps) {
  const { rank, user, pixelsPlaced } = entry
  const hue = addressToHue(user.address)

  return (
    <div
      className={clsx(
        'flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200',
        isCurrentUser
          ? 'bg-primary-500/10 border border-primary-500/20 shadow-glow-primary'
          : rankBg[rank] ?? 'hover:bg-bg-elevated/60',
      )}
    >
      <span className="w-7 shrink-0 text-center text-sm font-bold text-text-tertiary">
        {rankLabels[rank] ?? rank}
      </span>

      {/* Avatar with gradient ring */}
      <div
        className="h-8 w-8 shrink-0 rounded-full p-[2px]"
        style={{ background: `linear-gradient(135deg, hsl(${hue}, 70%, 60%), hsl(${hue + 60}, 70%, 50%))` }}
      >
        <div
          className="h-full w-full rounded-full"
          style={{ backgroundColor: `hsl(${hue}, 50%, 35%)` }}
        />
      </div>

      <span className="min-w-0 flex-1 truncate text-sm font-medium text-text-primary">
        {user.username}
      </span>

      <span className="shrink-0 text-xs font-mono text-text-secondary tabular-nums">
        {formatNumber(pixelsPlaced)}
        <span className="text-text-tertiary ml-0.5">px</span>
      </span>
    </div>
  )
}
