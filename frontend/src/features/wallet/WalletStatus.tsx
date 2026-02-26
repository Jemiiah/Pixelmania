import { useState, useCallback } from 'react'
import { useWalletMock } from './hooks/useWalletMock.ts'
import { useWalletStore } from '@/stores/walletStore.ts'
import { ConnectWallet } from './ConnectWallet.tsx'

export function WalletStatus() {
  const { isConnected, formattedAddress, formattedBalance, disconnect } = useWalletMock()
  const [modalOpen, setModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopyAddress = useCallback(() => {
    const fullAddress = useWalletStore.getState().address
    if (!fullAddress) return
    void navigator.clipboard.writeText(fullAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [])

  if (!isConnected) {
    return (
      <>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="relative rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-2 text-sm font-semibold text-text-inverse transition-all duration-200 hover:shadow-glow-primary hover:scale-[1.03] active:scale-[0.97]"
        >
          Connect Wallet
        </button>
        <ConnectWallet isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </>
    )
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleCopyAddress}
          className="flex items-center gap-2 rounded-lg border border-border-subtle bg-bg-elevated/60 px-3 py-1.5 transition-all hover:border-primary-500/30 hover:bg-bg-elevated"
          title={copied ? 'Copied!' : 'Click to copy address'}
        >
          <div className="h-2 w-2 rounded-full bg-primary-500 shadow-[0_0_6px_rgba(0,230,118,0.5)]" />
          <span className="font-mono text-xs text-text-primary">{formattedAddress}</span>
          {copied && <span className="text-[10px] text-primary-400">Copied!</span>}
        </button>
        <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-300">{formattedBalance}</span>
        <button
          type="button"
          onClick={disconnect}
          className="rounded-md p-1.5 text-text-tertiary transition-colors hover:bg-danger-500/10 hover:text-danger-400"
          title="Disconnect wallet"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <ConnectWallet isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
