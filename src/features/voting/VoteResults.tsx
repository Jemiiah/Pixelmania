import { useVotingStore } from '@/stores/votingStore.ts'
import { ProgressBar } from '@/components/ui/ProgressBar.tsx'
import { formatNumber } from '@/lib/format.ts'
import clsx from 'clsx'

function VoteResults() {
  const regions = useVotingStore((s) => s.regions)
  const totalVotes = useVotingStore((s) => s.totalVotes)

  const sorted = [...regions].sort((a, b) => b.votes - a.votes)
  const winnerId = sorted.length > 0 ? sorted[0].id : null

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-text-primary">
        Voting Results
      </h2>

      <div className="space-y-3">
        {sorted.map((region, index) => {
          const percentage =
            totalVotes > 0 ? (region.votes / totalVotes) * 100 : 0
          const isWinner = region.id === winnerId

          return (
            <div
              key={region.id}
              className={clsx(
                'bg-bg-surface border rounded-lg p-4',
                isWinner
                  ? 'border-tertiary-500 shadow-glow-tertiary'
                  : 'border-border-default',
              )}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className={clsx(
                    'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
                    isWinner
                      ? 'bg-tertiary-500 text-text-inverse'
                      : 'bg-bg-elevated text-text-secondary',
                  )}
                >
                  {index + 1}
                </span>
                <div
                  className="w-10 h-10 rounded-md shrink-0"
                  style={{ background: region.thumbnail }}
                />
                <div className="min-w-0 flex-1">
                  <p
                    className={clsx(
                      'text-sm font-medium truncate',
                      isWinner ? 'text-tertiary-400' : 'text-text-primary',
                    )}
                  >
                    {region.name}
                    {isWinner && ' 👑'}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {formatNumber(region.votes)} votes · {Math.round(percentage)}%
                  </p>
                </div>
              </div>
              <ProgressBar
                value={percentage}
                color={isWinner ? 'tertiary' : 'primary'}
              />
            </div>
          )
        })}
      </div>

      <p className="text-xs text-text-tertiary text-center">
        Total votes cast: {formatNumber(totalVotes)}
      </p>
    </div>
  )
}

export { VoteResults }
