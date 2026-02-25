import { Link } from 'react-router-dom'
import { useLeaderboardStore } from '@/stores/leaderboardStore.ts'
import { LeaderboardFilters } from './LeaderboardFilters.tsx'
import { LeaderboardRow } from './LeaderboardRow.tsx'
import { Button } from '@/components/ui/Button.tsx'

export function LeaderboardPanel() {
  const entries = useLeaderboardStore((s) => s.entries)
  const isLoading = useLeaderboardStore((s) => s.isLoading)
  const top10 = entries.slice(0, 10)

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center gap-2 px-1">
        <svg
          className="h-5 w-5 text-tertiary-400"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
        <h3 className="text-base font-bold text-text-primary">Leaderboard</h3>
      </div>

      {/* Filters */}
      <LeaderboardFilters />

      {/* List */}
      <div className="flex flex-col gap-0.5">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="skeleton h-11 rounded-md"
            />
          ))
        ) : (
          top10.map((entry) => (
            <LeaderboardRow key={entry.rank} entry={entry} />
          ))
        )}
      </div>

      {/* View All */}
      <Link to="/leaderboard">
        <Button variant="ghost" size="sm" fullWidth>
          View All
        </Button>
      </Link>
    </div>
  )
}
