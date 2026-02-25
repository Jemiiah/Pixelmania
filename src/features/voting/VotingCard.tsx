import type { VotingRegion } from '@/lib/types.ts'
import { ProgressBar } from '@/components/ui/ProgressBar.tsx'
import { VoteButton } from '@/features/voting/VoteButton.tsx'
import { formatNumber } from '@/lib/format.ts'

interface VotingCardProps {
  region: VotingRegion
  totalVotes: number
}

function VotingCard({ region, totalVotes }: VotingCardProps) {
  const percentage = totalVotes > 0 ? (region.votes / totalVotes) * 100 : 0

  return (
    <div className="bg-bg-surface border border-border-default rounded-lg p-3 space-y-3">
      <div className="flex items-start gap-3">
        <div
          className="w-12 h-12 rounded-md shrink-0"
          style={{ background: region.thumbnail }}
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-text-primary truncate">
            {region.name}
          </p>
          <p className="text-xs text-text-secondary">
            {formatNumber(region.votes)} votes · {Math.round(percentage)}%
          </p>
        </div>
      </div>
      <ProgressBar value={percentage} color="primary" />
      <VoteButton regionId={region.id} />
    </div>
  )
}

export { VotingCard }
