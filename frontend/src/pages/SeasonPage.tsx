import { SeasonBanner } from '@/features/season/SeasonBanner'
import { SeasonTimer } from '@/features/season/SeasonTimer'
import { PrizePool } from '@/features/season/PrizePool'
import { SeasonHistory } from '@/features/season/SeasonHistory'
import { VoteResults } from '@/features/voting/VoteResults'
import { useSeasonStore } from '@/stores/seasonStore'
import { formatNumber } from '@/lib/format'

function SeasonPage() {
  const currentSeason = useSeasonStore((s) => s.currentSeason)

  return (
    <div className="mx-auto max-w-3xl p-6 space-y-8">
      <SeasonBanner />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col items-center gap-3 rounded-lg border border-border-default bg-bg-surface p-6">
          <span className="text-xs font-medium uppercase tracking-wider text-text-tertiary">Time Remaining</span>
          <SeasonTimer />
        </div>
        <PrizePool />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-border-default bg-bg-surface p-4 text-center">
          <span className="text-xs text-text-tertiary">Total Pixels</span>
          <p className="text-xl font-bold text-text-primary font-mono">{formatNumber(currentSeason.totalPixels)}</p>
        </div>
        <div className="rounded-lg border border-border-default bg-bg-surface p-4 text-center">
          <span className="text-xs text-text-tertiary">Participants</span>
          <p className="text-xl font-bold text-text-primary font-mono">{formatNumber(currentSeason.totalParticipants)}</p>
        </div>
      </div>

      <VoteResults />

      <SeasonHistory />
    </div>
  )
}

export { SeasonPage }
