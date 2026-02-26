export type Pixel = {
  x: number
  y: number
  colorIndex: number
  placedBy: string
  timestamp: number
}

export type CanvasState = {
  pixels: Uint8Array
  width: number
  height: number
}

export type PaletteColor = {
  index: number
  name: string
  hex: string
  r: number
  g: number
  b: number
}

export type User = {
  address: string
  username: string
  avatarSeed: string
  pixelsPlaced: number
  gSpent: number
  nftsOwned: number
  rank: number
  joinedAt: number
}

export type Season = {
  id: number
  name: string
  theme: string
  startDate: number
  endDate: number
  prizePool: number
  status: 'upcoming' | 'active' | 'voting' | 'ended'
  winner?: User
  totalPixels: number
  totalParticipants: number
}

export type LeaderboardEntry = {
  rank: number
  user: User
  pixelsPlaced: number
  gSpent: number
  score: number
}

export type VotingRegion = {
  id: string
  name: string
  x: number
  y: number
  width: number
  height: number
  votes: number
  thumbnail: string
}

export type Vote = {
  userId: string
  regionId: string
  timestamp: number
}

export type NFTItem = {
  id: string
  seasonId: number
  seasonName: string
  imageUrl: string
  minter: string
  mintDate: number
  regionName: string
  tokenId: number
  transactionHash: string
}

export type Template = {
  id: string
  name: string
  creator: string
  width: number
  height: number
  pixels: Uint8Array
  thumbnail: string
  x: number
  y: number
}

export type ActivityItem = {
  id: string
  type: 'pixel_placed' | 'vote_cast' | 'nft_minted' | 'season_joined'
  timestamp: number
  data: {
    x?: number
    y?: number
    colorIndex?: number
    colorName?: string
    regionId?: string
    nftId?: string
    seasonId?: number
  }
}

export type Toast = {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
  duration?: number
}

export type WalletProvider = {
  id: string
  name: string
  icon: string
  description: string
}

export type SidebarPanel = 'leaderboard' | 'voting' | 'templates' | null
