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
      <div className="flex flex-wrap items-center gap-3 px-4 py-2 border-b border-border-subtle bg-bg-surface/50">
        <div className="flex-1 min-w-0">
          <SeasonBanner />
        </div>
        <div className="flex items-center gap-3">
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
          <div className="absolute inset-0 z-[5] flex items-center justify-center bg-bg-base/60 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4 rounded-xl border border-border-default bg-bg-surface p-8 shadow-lg text-center max-w-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-500/10">
                <svg className="h-8 w-8 text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="6" width="20" height="14" rx="3" />
                  <path d="M2 10h20" />
                  <circle cx="17" cy="15" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Connect to Place Pixels</h3>
                <p className="mt-1 text-sm text-text-secondary">
                  Connect your wallet to start creating pixel art and earn G$ rewards.
                </p>
              </div>
              <button
                onClick={() => setWalletModalOpen(true)}
                className="rounded-md bg-primary-500 px-6 py-2.5 text-sm font-medium text-text-inverse transition-all hover:bg-primary-600 hover:shadow-glow-primary"
              >
                Connect Wallet
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom palette bar (mobile) or side palette */}
      <div
        className={clsx(
          'border-t border-border-subtle bg-bg-surface',
          isMobile ? 'px-3 py-2' : 'absolute left-4 bottom-16 z-10 rounded-lg border border-border-default bg-bg-surface/90 backdrop-blur-sm p-3 shadow-lg',
        )}
      >
        <ColorPalette />
      </div>

      <ConnectWallet isOpen={walletModalOpen} onClose={() => setWalletModalOpen(false)} />
    </div>
  )
}

export { CanvasPage }
