import type { NFTItem } from '@/lib/types.ts'
import { truncateAddress } from '@/lib/color-utils.ts'
import { formatDate } from '@/lib/format.ts'

interface NFTCardProps {
  nft: NFTItem
  onClick: () => void
}

function NFTCard({ nft, onClick }: NFTCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left bg-bg-surface border border-border-default rounded-lg overflow-hidden transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:border-border-strong hover:shadow-glow-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
    >
      <div
        className="w-full aspect-square"
        style={{ background: nft.imageUrl }}
      />
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary-500/15 text-secondary-400">
            {nft.seasonName}
          </span>
          <span className="text-[10px] text-text-tertiary">#{nft.tokenId}</span>
        </div>
        <p className="text-sm font-medium text-text-primary truncate">
          {nft.regionName}
        </p>
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span className="font-mono">{truncateAddress(nft.minter)}</span>
          <span>{formatDate(nft.mintDate)}</span>
        </div>
      </div>
    </button>
  )
}

export { NFTCard }
