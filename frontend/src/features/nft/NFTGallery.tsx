import { useEffect } from 'react'
import { useNftStore } from '@/stores/nftStore.ts'
import { NFTCard } from '@/features/nft/NFTCard.tsx'
import { NFTDetail } from '@/features/nft/NFTDetail.tsx'

function NFTGallery() {
  const nfts = useNftStore((s) => s.nfts)
  const selectedNft = useNftStore((s) => s.selectedNft)
  const isLoading = useNftStore((s) => s.isLoading)
  const selectNft = useNftStore((s) => s.selectNft)
  const loadNfts = useNftStore((s) => s.loadNfts)

  useEffect(() => {
    if (nfts.length === 0) {
      loadNfts()
    }
  }, [nfts.length, loadNfts])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">NFT Gallery</h1>
          <p className="text-sm text-text-secondary mt-1">
            {isLoading ? 'Loading...' : `${nfts.length} collectibles`}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-bg-surface border border-border-default rounded-lg overflow-hidden">
              <div className="w-full aspect-square skeleton" />
              <div className="p-3 space-y-2">
                <div className="h-4 w-20 skeleton rounded" />
                <div className="h-4 w-full skeleton rounded" />
                <div className="h-3 w-24 skeleton rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {nfts.map((nft) => (
            <NFTCard
              key={nft.id}
              nft={nft}
              onClick={() => selectNft(nft)}
            />
          ))}
        </div>
      )}

      <NFTDetail nft={selectedNft} onClose={() => selectNft(null)} />
    </div>
  )
}

export { NFTGallery }
