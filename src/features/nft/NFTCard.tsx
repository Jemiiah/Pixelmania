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
      className="group w-full text-left rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-secondary-500/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 web3-card"
    >
      <div className="relative w-full aspect-square overflow-hidden">
        <div
          className="w-full h-full transition-transform duration-500 group-hover:scale-110"
          style={{ background: nft.imageUrl }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-base/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute top-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded-full bg-bg-base/60 backdrop-blur-sm text-text-secondary border border-border-subtle">
          #{nft.tokenId}
        </span>
      </div>
      <div className="p-3 space-y-2">
        <span className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-secondary-500/15 to-primary-500/10 text-secondary-400">
          {nft.seasonName}
        </span>
        <p className="text-sm font-semibold text-text-primary truncate">
          {nft.regionName}
        </p>
        <div className="flex items-center justify-between text-xs text-text-tertiary">
          <span className="font-mono">{truncateAddress(nft.minter)}</span>
          <span>{formatDate(nft.mintDate)}</span>
        </div>
      </div>
    </button>
  )
}

export { NFTCard }
