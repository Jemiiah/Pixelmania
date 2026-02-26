import { create } from 'zustand'
import { MOCK_WALLET_DELAY_MS } from '@/lib/constants.ts'

type ProviderType = 'metamask' | 'valora' | 'goodwallet'

interface WalletState {
  address: string | null
  balance: number
  isConnecting: boolean
  provider: ProviderType | null

  connect: (provider: ProviderType) => Promise<void>
  disconnect: () => void
  setBalance: (amount: number) => void
}

const MOCK_ADDRESS = '0x742d35Cc6634C0532925a3b844Bc9e7595f2bD38'
const MOCK_BALANCE = 1250

export const useWalletStore = create<WalletState>((set) => ({
  address: null,
  balance: 0,
  isConnecting: false,
  provider: null,

  connect: async (provider) => {
    set({ isConnecting: true })
    await new Promise((resolve) => setTimeout(resolve, MOCK_WALLET_DELAY_MS))
    set({
      address: MOCK_ADDRESS,
      balance: MOCK_BALANCE,
      isConnecting: false,
      provider,
    })
  },

  disconnect: () =>
    set({
      address: null,
      balance: 0,
      isConnecting: false,
      provider: null,
    }),

  setBalance: (amount) => set({ balance: amount }),
}))
