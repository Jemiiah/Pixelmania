import { create } from 'zustand'
import type { NFTItem } from '@/lib/types.ts'
import { mockNfts } from '@/mocks/nfts.ts'
import { mockApi } from '@/mocks/api.ts'

interface NFTState {
  nfts: NFTItem[]
  selectedNft: NFTItem | null
  isLoading: boolean

  selectNft: (nft: NFTItem | null) => void
  loadNfts: () => Promise<void>
}

export const useNftStore = create<NFTState>((set) => ({
  nfts: [],
  selectedNft: null,
  isLoading: false,

  selectNft: (nft) => set({ selectedNft: nft }),

  loadNfts: async () => {
    set({ isLoading: true })
    const nfts = await mockApi(mockNfts, 600)
    set({ nfts, isLoading: false })
  },
}))
