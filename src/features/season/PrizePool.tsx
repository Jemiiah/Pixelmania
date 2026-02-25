import { useSeasonStore } from '@/stores/seasonStore.ts'
import { formatNumber } from '@/lib/format.ts'

export function PrizePool() {
  const prizePool = useSeasonStore((s) => s.currentSeason.prizePool)

  return (
    <div className="flex items-center gap-3 rounded-lg border border-tertiary-700/50 bg-tertiary-900/30 px-4 py-3">
      <span className="text-2xl" role="img" aria-label="Trophy">
        &#x1F3C6;
      </span>
      <div className="flex flex-col">
        <span className="text-xs font-medium uppercase tracking-wider text-tertiary-400">
          Prize Pool
        </span>
        <span className="animate-glow-pulse font-mono text-xl font-bold text-tertiary-300">
          {formatNumber(prizePool)} G$
        </span>
      </div>
    </div>
  )
}
