import { useState, useEffect } from 'react'
import { clsx } from 'clsx'
import { useWalletMock } from './hooks/useWalletMock.ts'
import { WalletProviderList } from './WalletProviderList.tsx'

interface ConnectWalletProps {
  isOpen: boolean
  onClose: () => void
}

export function ConnectWallet({ isOpen, onClose }: ConnectWalletProps) {
  const { isConnected, isConnecting, connect } = useWalletMock()
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (isConnected && !showSuccess) {
      setShowSuccess(true)
      const timer = setTimeout(() => {
        setShowSuccess(false)
        onClose()
      }, 1200)
      return () => clearTimeout(timer)
    }
  }, [isConnected, showSuccess, onClose])

  useEffect(() => {
    if (!isOpen) {
      setShowSuccess(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center bg-bg-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className={clsx(
          'w-full max-w-md rounded-lg border border-border-default bg-bg-elevated p-6 shadow-lg',
          'animate-scale-in',
        )}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text-primary">Connect Wallet</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-text-secondary transition-colors hover:text-text-primary"
            aria-label="Close"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {showSuccess ? (
          <div className="flex flex-col items-center gap-3 py-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-500/20">
              <svg className="h-8 w-8 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-sm font-medium text-primary-500">Connected!</span>
          </div>
        ) : isConnecting ? (
          <div className="flex flex-col items-center gap-3 py-8">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
            <span className="text-sm text-text-secondary">Connecting...</span>
          </div>
        ) : (
          <WalletProviderList onSelect={connect} disabled={isConnecting} />
        )}
      </div>
    </div>
  )
}
