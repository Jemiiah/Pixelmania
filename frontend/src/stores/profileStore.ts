import { create } from 'zustand'
import type { User, ActivityItem } from '@/lib/types.ts'
import { mockUsers } from '@/mocks/users.ts'
import { mockApi } from '@/mocks/api.ts'

const mockActivity: ActivityItem[] = [
  {
    id: 'act-1',
    type: 'pixel_placed',
    timestamp: Date.now() - 60_000 * 5,
    data: { x: 142, y: 87, colorIndex: 4, colorName: 'Red' },
  },
  {
    id: 'act-2',
    type: 'pixel_placed',
    timestamp: Date.now() - 60_000 * 12,
    data: { x: 143, y: 87, colorIndex: 10, colorName: 'Green' },
  },
  {
    id: 'act-3',
    type: 'vote_cast',
    timestamp: Date.now() - 60_000 * 30,
    data: { regionId: 'region-5' },
  },
  {
    id: 'act-4',
    type: 'nft_minted',
    timestamp: Date.now() - 86_400_000 * 2,
    data: { nftId: 'nft-8', seasonId: 3 },
  },
  {
    id: 'act-5',
    type: 'pixel_placed',
    timestamp: Date.now() - 86_400_000 * 2 - 60_000 * 45,
    data: { x: 256, y: 200, colorIndex: 14, colorName: 'Blue' },
  },
  {
    id: 'act-6',
    type: 'season_joined',
    timestamp: Date.now() - 86_400_000 * 15,
    data: { seasonId: 3 },
  },
  {
    id: 'act-7',
    type: 'pixel_placed',
    timestamp: Date.now() - 86_400_000 * 3,
    data: { x: 100, y: 50, colorIndex: 8, colorName: 'Yellow' },
  },
  {
    id: 'act-8',
    type: 'pixel_placed',
    timestamp: Date.now() - 86_400_000 * 4,
    data: { x: 310, y: 128, colorIndex: 16, colorName: 'Purple' },
  },
  {
    id: 'act-9',
    type: 'vote_cast',
    timestamp: Date.now() - 86_400_000 * 7,
    data: { regionId: 'region-2' },
  },
  {
    id: 'act-10',
    type: 'nft_minted',
    timestamp: Date.now() - 86_400_000 * 15,
    data: { nftId: 'nft-4', seasonId: 2 },
  },
]

interface ProfileState {
  user: User | null
  activity: ActivityItem[]
  isLoading: boolean

  loadProfile: () => Promise<void>
  loadActivity: () => Promise<void>
}

export const useProfileStore = create<ProfileState>((set) => ({
  user: null,
  activity: [],
  isLoading: false,

  loadProfile: async () => {
    set({ isLoading: true })
    const user = await mockApi(mockUsers[0], 400)
    set({ user, isLoading: false })
  },

  loadActivity: async () => {
    const activity = await mockApi(mockActivity, 300)
    set({ activity })
  },
}))
