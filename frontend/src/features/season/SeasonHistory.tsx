import { clsx } from 'clsx'
import { useSeasonStore } from '@/stores/seasonStore.ts'
import { formatDate, formatNumber } from '@/lib/format.ts'
import { truncateAddress } from '@/lib/color-utils.ts'
import type { Season } from '@/lib/types.ts'

function StatusBadge({ status }: { status: Season['status'] }) {
  return (
    <span
      className={clsx(
        'inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider',
        status === 'active' && 'bg-primary-500/20 text-primary-400',
        status === 'voting' && 'bg-secondary-500/20 text-secondary-400',
        status === 'ended' && 'bg-text-tertiary/20 text-text-tertiary',
        status === 'upcoming' && 'bg-tertiary-500/20 text-tertiary-400',
      )}
    >
      {status}
    </span>
  )
}

function SeasonCard({ season }: { season: Season }) {
  return (
    <div className="rounded-lg border border-border-default bg-bg-surface p-4 transition-shadow hover:shadow-md">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">{season.name}</h3>
        <StatusBadge status={season.status} />
      </div>
      <p className="mb-3 text-xs text-text-secondary">
        {formatDate(season.startDate)} — {formatDate(season.endDate)}
      </p>
      <div className="flex items-center justify-between text-xs">
        <div className="flex flex-col gap-1">
          <span className="text-text-tertiary">Pixels</span>
          <span className="font-mono text-text-primary">{formatNumber(season.totalPixels)}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-text-tertiary">Prize</span>
          <span className="font-mono text-tertiary-400">{formatNumber(season.prizePool)} G$</span>
        </div>
        {season.winner && (
          <div className="flex flex-col gap-1">
            <span className="text-text-tertiary">Winner</span>
            <span className="font-mono text-primary-400">
              {truncateAddress(season.winner.address)}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export function SeasonHistory() {
  const currentSeason = useSeasonStore((s) => s.currentSeason)
  const pastSeasons = useSeasonStore((s) => s.pastSeasons)
  const allSeasons = [currentSeason, ...pastSeasons]

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
        Seasons
      </h2>
      <div className="flex flex-col gap-3">
        {allSeasons.map((season) => (
          <SeasonCard key={season.id} season={season} />
        ))}
      </div>
    </div>
  )
}
