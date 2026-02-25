import { useSeasonStore } from '@/stores/seasonStore.ts'

export function SeasonBanner() {
  const currentSeason = useSeasonStore((s) => s.currentSeason)

  return (
    <div className="relative overflow-hidden rounded-lg border border-border-subtle bg-gradient-to-r from-primary-900 via-bg-elevated to-secondary-900 px-6 py-4">
      <div className="absolute inset-0 animate-glow-pulse opacity-20" />
      <div className="relative">
        <h2 className="text-lg font-bold text-text-primary">{currentSeason.name}</h2>
        <p className="mt-1 text-sm text-text-secondary">{currentSeason.theme}</p>
      </div>
    </div>
  )
}
