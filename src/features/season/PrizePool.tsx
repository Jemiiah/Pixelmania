import { useSeasonStore } from '@/stores/seasonStore.ts'
import { formatNumber } from '@/lib/format.ts'

export function PrizePool() {
  const prizePool = useSeasonStore((s) => s.currentSeason.prizePool)

  return (
    <div className="relative overflow-hidden rounded-xl gradient-border">
      <div className="flex items-center gap-3 bg-gradient-to-r from-tertiary-900/60 to-bg-elevated px-4 py-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-tertiary-500/20">
          <span className="text-xl">&#x1F3C6;</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-tertiary-400">
            Prize Pool
          </span>
          <span className="font-mono text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-tertiary-300 to-tertiary-500">
            {formatNumber(prizePool)} G$
          </span>
        </div>
      </div>
    </div>
  )
}
