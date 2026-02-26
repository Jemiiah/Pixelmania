import { useSeasonStore } from '@/stores/seasonStore.ts'

export function SeasonBanner() {
  const currentSeason = useSeasonStore((s) => s.currentSeason)

  return (
    <div className="relative overflow-hidden rounded-lg gradient-border-animated">
      <div className="relative bg-gradient-to-r from-primary-900/80 via-bg-elevated to-secondary-900/80 px-5 py-3">
        {/* Animated glow orbs */}
        <div className="absolute -top-8 -left-8 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-secondary-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="relative flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-500/20 shrink-0">
            <span className="text-lg">🌿</span>
          </div>
          <div className="min-w-0">
            <h2 className="text-base font-bold text-text-primary leading-tight">{currentSeason.name}</h2>
            <p className="text-xs text-text-secondary truncate">{currentSeason.theme}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
