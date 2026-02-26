import { create } from 'zustand'
import type { VotingRegion } from '@/lib/types.ts'
import { mockVotingRegions } from '@/mocks/votes.ts'
import { mockApi } from '@/mocks/api.ts'

interface VotingState {
  regions: VotingRegion[]
  userVote: string | null
  isVotingActive: boolean
  totalVotes: number

  castVote: (regionId: string) => void
  loadRegions: () => Promise<void>
}

export const useVotingStore = create<VotingState>((set, get) => ({
  regions: [],
  userVote: null,
  isVotingActive: true,
  totalVotes: 0,

  castVote: (regionId) => {
    const { userVote, regions, totalVotes } = get()
    if (userVote) return

    set({
      userVote: regionId,
      totalVotes: totalVotes + 1,
      regions: regions.map((r) =>
        r.id === regionId ? { ...r, votes: r.votes + 1 } : r,
      ),
    })
  },

  loadRegions: async () => {
    const regions = await mockApi(mockVotingRegions)
    const totalVotes = regions.reduce((sum, r) => sum + r.votes, 0)
    set({ regions, totalVotes })
  },
}))
