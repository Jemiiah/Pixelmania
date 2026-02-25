import { useState } from 'react'
import { PixelCanvas } from '@/features/canvas/PixelCanvas'
import { Minimap } from '@/features/canvas/Minimap'
import { ColorPalette } from '@/features/palette/ColorPalette'
import { SeasonBanner } from '@/features/season/SeasonBanner'
import { SeasonTimer } from '@/features/season/SeasonTimer'
import { PrizePool } from '@/features/season/PrizePool'
import { useWalletMock } from '@/features/wallet/hooks/useWalletMock'
import { ConnectWallet } from '@/features/wallet/ConnectWallet'
import { useUIStore } from '@/stores/uiStore'
import clsx from 'clsx'

function CanvasPage() {
  const { isConnected } = useWalletMock()
  const isMobile = useUIStore((s) => s.isMobile)
  const [walletModalOpen, setWalletModalOpen] = useState(false)

  return (
    <div className="relative flex h-[calc(100vh-56px)] flex-col">
      {/* Season info bar */}
      <div className="flex flex-wrap items-center gap-3 px-4 py-2 border-b border-border-subtle bg-bg-surface/30 backdrop-blur-sm">
        <div className="flex-1 min-w-0">
          <SeasonBanner />
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <SeasonTimer />
          <PrizePool />
        </div>
      </div>

      {/* Canvas area */}
      <div className="relative flex-1 overflow-hidden">
        <PixelCanvas />
        <Minimap />

        {/* Wallet gate overlay */}
        {!isConnected && (
          <div className="absolute inset-0 z-[5] flex items-center justify-center bg-bg-base/70 backdrop-blur-md">
            <div className="relative flex flex-col items-center gap-5 rounded-2xl p-10 text-center max-w-md gradient-border-animated web3-card noise-bg">
              <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500/20 to-secondary-500/10">
                <svg className="h-10 w-10 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="6" width="20" height="14" rx="3" />
                  <path d="M2 10h20" />
                  <circle cx="17" cy="15" r="1.5" fill="currentColor" />
                </svg>
                <div className="absolute inset-0 rounded-2xl animate-glow-pulse opacity-40" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary">Connect to Place Pixels</h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  Connect your wallet to start creating pixel art on the Celo blockchain and earn G$ rewards.
                </p>
              </div>
              <button
                onClick={() => setWalletModalOpen(true)}
                className="relative rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-3 text-sm font-semibold text-text-inverse transition-all hover:shadow-glow-primary hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative z-10">Connect Wallet</span>
              </button>
              <p className="text-xs text-text-tertiary">Supports MetaMask, Valora & GoodWallet</p>
            </div>
          </div>
        )}
      </div>

      {/* Palette panel */}
      <div
        className={clsx(
          isMobile
            ? 'border-t border-border-subtle bg-bg-surface/90 backdrop-blur-sm px-3 py-2'
            : 'absolute left-4 bottom-16 z-10 rounded-xl web3-card gradient-border p-3 shadow-lg',
        )}
      >
        <ColorPalette />
      </div>

      <ConnectWallet isOpen={walletModalOpen} onClose={() => setWalletModalOpen(false)} />
    </div>
  )
}

export { CanvasPage }
