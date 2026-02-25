import { useWalletStore } from '@/stores/walletStore.ts'
import { truncateAddress } from '@/lib/color-utils.ts'
import { formatGDollars } from '@/lib/format.ts'

export function useWalletMock() {
  const address = useWalletStore((s) => s.address)
  const balance = useWalletStore((s) => s.balance)
  const isConnecting = useWalletStore((s) => s.isConnecting)
  const provider = useWalletStore((s) => s.provider)
  const connect = useWalletStore((s) => s.connect)
  const disconnect = useWalletStore((s) => s.disconnect)

  return {
    address,
    balance,
    isConnected: address !== null,
    isConnecting,
    provider,
    connect,
    disconnect,
    formattedAddress: address ? truncateAddress(address) : null,
    formattedBalance: formatGDollars(balance),
  }
}
