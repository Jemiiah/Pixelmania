import type { NFTItem } from '@/lib/types.ts'
import { Modal } from '@/components/ui/Modal.tsx'
import { Button } from '@/components/ui/Button.tsx'
import { truncateAddress } from '@/lib/color-utils.ts'
import { formatDate } from '@/lib/format.ts'

interface NFTDetailProps {
  nft: NFTItem | null
  onClose: () => void
}

function NFTDetail({ nft, onClose }: NFTDetailProps) {
  if (!nft) return null

  return (
    <Modal open={!!nft} onClose={onClose} title={`NFT #${nft.tokenId}`}>
      <div className="space-y-4">
        <div
          className="w-full aspect-square rounded-lg"
          style={{ background: nft.imageUrl }}
        />

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary-500/15 text-secondary-400">
              {nft.seasonName}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-text-primary">
            {nft.regionName}
          </h3>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-text-tertiary text-xs">Minter</p>
              <p className="text-text-primary font-mono text-xs">
                {truncateAddress(nft.minter, 6)}
              </p>
            </div>
            <div>
              <p className="text-text-tertiary text-xs">Mint Date</p>
              <p className="text-text-primary text-xs">
                {formatDate(nft.mintDate)}
              </p>
            </div>
            <div>
              <p className="text-text-tertiary text-xs">Token ID</p>
              <p className="text-text-primary text-xs">{nft.tokenId}</p>
            </div>
            <div>
              <p className="text-text-tertiary text-xs">Season</p>
              <p className="text-text-primary text-xs">{nft.seasonName}</p>
            </div>
          </div>

          <div>
            <p className="text-text-tertiary text-xs mb-1">Transaction Hash</p>
            <p className="text-text-secondary font-mono text-[10px] break-all">
              {nft.transactionHash}
            </p>
          </div>
        </div>

        <Button variant="secondary" fullWidth>
          View on Explorer
        </Button>
      </div>
    </Modal>
  )
}

export { NFTDetail }
