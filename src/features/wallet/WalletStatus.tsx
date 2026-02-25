import { useState, useCallback } from 'react'
import { clsx } from 'clsx'
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
          className={clsx(
            'rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-text-inverse',
            'transition-all duration-150 hover:bg-primary-600 hover:shadow-glow-primary',
          )}
        >
          Connect Wallet
        </button>
        <ConnectWallet isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </>
    )
  }

  return (
    <>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleCopyAddress}
          className="flex items-center gap-2 rounded-md border border-border-default bg-bg-surface px-3 py-1.5 transition-colors hover:border-border-strong"
          title={copied ? 'Copied!' : 'Click to copy address'}
        >
          <span className="font-mono text-xs text-text-primary">{formattedAddress}</span>
          {copied && <span className="text-xs text-primary-500">Copied</span>}
        </button>
        <span className="text-sm font-medium text-primary-400">{formattedBalance}</span>
        <button
          type="button"
          onClick={disconnect}
          className="rounded-md px-2 py-1 text-xs text-text-tertiary transition-colors hover:bg-bg-elevated hover:text-text-secondary"
          title="Disconnect wallet"
        >
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm5 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm4-1a1 1 0 011 1v4a1 1 0 11-2 0V7a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <ConnectWallet isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
