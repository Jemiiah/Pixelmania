import { create } from 'zustand'
import type { LeaderboardEntry } from '@/lib/types.ts'
import {
  seasonEntries,
  allTimeEntries,
  last24hEntries,
} from '@/mocks/leaderboard.ts'

type LeaderboardFilter = 'season' | 'allTime' | '24h'

interface LeaderboardState {
  entries: LeaderboardEntry[]
  filter: LeaderboardFilter
  isLoading: boolean

  setFilter: (filter: LeaderboardFilter) => void
  loadEntries: () => void
}

function entriesForFilter(filter: LeaderboardFilter): LeaderboardEntry[] {
  switch (filter) {
    case 'season':
      return seasonEntries
    case 'allTime':
      return allTimeEntries
    case '24h':
      return last24hEntries
  }
}

export const useLeaderboardStore = create<LeaderboardState>((set, get) => ({
  entries: seasonEntries,
  filter: 'season',
  isLoading: false,

  setFilter: (filter) => {
    set({ filter, entries: entriesForFilter(filter) })
  },

  loadEntries: () => {
    const { filter } = get()
    set({ isLoading: true })
    // Simulate async load
    setTimeout(() => {
      set({ entries: entriesForFilter(filter), isLoading: false })
    }, 300)
  },
}))
