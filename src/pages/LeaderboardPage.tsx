import { useEffect } from 'react'
import { useLeaderboardStore } from '@/stores/leaderboardStore'
import { LeaderboardFilters } from '@/features/leaderboard/LeaderboardFilters'
import { LeaderboardRow } from '@/features/leaderboard/LeaderboardRow'

function LeaderboardPage() {
  const entries = useLeaderboardStore((s) => s.entries)
  const isLoading = useLeaderboardStore((s) => s.isLoading)
  const loadEntries = useLeaderboardStore((s) => s.loadEntries)

  useEffect(() => {
    loadEntries()
  }, [loadEntries])

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Leaderboard</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Top pixel artists ranked by activity and contributions
        </p>
      </div>

      <div className="mb-4">
        <LeaderboardFilters />
      </div>

      {/* Column headers */}
      <div className="flex items-center gap-3 px-3 py-2 text-xs font-medium uppercase tracking-wider text-text-tertiary border-b border-border-subtle">
        <span className="w-8 text-center">Rank</span>
        <span className="flex-1">User</span>
        <span className="w-20 text-right">Pixels</span>
        <span className="w-20 text-right">G$ Spent</span>
      </div>

      <div className="flex flex-col">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="skeleton h-12 my-0.5 rounded-md" />
          ))
        ) : (
          entries.map((entry) => (
            <LeaderboardRow key={entry.rank} entry={entry} />
          ))
        )}
      </div>
    </div>
  )
}

export { LeaderboardPage }
