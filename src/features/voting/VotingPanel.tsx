import { useEffect } from 'react'
import { useVotingStore } from '@/stores/votingStore.ts'
import { VotingCard } from '@/features/voting/VotingCard.tsx'
import { formatNumber } from '@/lib/format.ts'

function VotingPanel() {
  const regions = useVotingStore((s) => s.regions)
  const userVote = useVotingStore((s) => s.userVote)
  const totalVotes = useVotingStore((s) => s.totalVotes)
  const isVotingActive = useVotingStore((s) => s.isVotingActive)
  const loadRegions = useVotingStore((s) => s.loadRegions)

  useEffect(() => {
    if (regions.length === 0) {
      loadRegions()
    }
  }, [regions.length, loadRegions])

  const votedRegion = userVote
    ? regions.find((r) => r.id === userVote)
    : null

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-border-subtle">
        <h2 className="text-base font-semibold text-text-primary">
          Vote for Best Region
        </h2>
        <p className="text-xs text-text-secondary mt-0.5">
          {isVotingActive ? 'Voting phase is active' : 'Voting has ended'}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {regions.map((region) => (
          <VotingCard
            key={region.id}
            region={region}
            totalVotes={totalVotes}
          />
        ))}
      </div>

      <div className="px-4 py-3 border-t border-border-subtle space-y-1">
        <p className="text-xs text-text-secondary">
          Total votes: <span className="text-text-primary font-medium">{formatNumber(totalVotes)}</span>
        </p>
        {votedRegion && (
          <p className="text-xs text-primary-400">
            You voted for: {votedRegion.name}
          </p>
        )}
      </div>
    </div>
  )
}

export { VotingPanel }
