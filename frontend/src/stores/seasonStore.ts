import { create } from 'zustand'
import type { Season } from '@/lib/types.ts'
import { mockCurrentSeason, mockPastSeasons } from '@/mocks/seasons.ts'

interface SeasonState {
  currentSeason: Season
  pastSeasons: Season[]
  timeRemaining: number

  tickTimer: () => void
  loadSeasons: () => void
}

export const useSeasonStore = create<SeasonState>((set, get) => ({
  currentSeason: mockCurrentSeason,
  pastSeasons: mockPastSeasons,
  timeRemaining: Math.max(0, mockCurrentSeason.endDate - Date.now()),

  tickTimer: () => {
    const { currentSeason } = get()
    const remaining = Math.max(0, currentSeason.endDate - Date.now())
    set({ timeRemaining: remaining })
  },

  loadSeasons: () =>
    set({
      currentSeason: mockCurrentSeason,
      pastSeasons: mockPastSeasons,
      timeRemaining: Math.max(0, mockCurrentSeason.endDate - Date.now()),
    }),
}))
