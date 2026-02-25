import { Button } from '@/components/ui/Button.tsx'
import { useWalletStore } from '@/stores/walletStore.ts'
import { useVotingStore } from '@/stores/votingStore.ts'

interface VoteButtonProps {
  regionId: string
}

function VoteButton({ regionId }: VoteButtonProps) {
  const address = useWalletStore((s) => s.address)
  const userVote = useVotingStore((s) => s.userVote)
  const castVote = useVotingStore((s) => s.castVote)

  if (!address) {
    return (
      <Button variant="secondary" size="sm" fullWidth disabled>
        Connect wallet to vote
      </Button>
    )
  }

  if (userVote === regionId) {
    return (
      <Button
        size="sm"
        fullWidth
        disabled
        className="!bg-primary-700 !text-primary-100 !opacity-100"
      >
        Voted ✓
      </Button>
    )
  }

  if (userVote) {
    return (
      <Button variant="secondary" size="sm" fullWidth disabled>
        Vote
      </Button>
    )
  }

  return (
    <Button size="sm" fullWidth onClick={() => castVote(regionId)}>
      Vote
    </Button>
  )
}

export { VoteButton }
