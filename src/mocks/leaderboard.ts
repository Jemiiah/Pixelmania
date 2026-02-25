import type { LeaderboardEntry } from '@/lib/types.ts'
import { mockUsers } from './users.ts'

function makeEntry(
  rank: number,
  username: string,
  address: string,
  avatarSeed: string,
  pixelsPlaced: number,
  gSpent: number,
  joinedAt: number,
): LeaderboardEntry {
  return {
    rank,
    user: {
      address,
      username,
      avatarSeed,
      pixelsPlaced,
      gSpent,
      nftsOwned: Math.floor(Math.random() * 6),
      rank,
      joinedAt,
    },
    pixelsPlaced,
    gSpent,
    score: Math.round(pixelsPlaced * 2 + gSpent * 10),
  }
}

const extraUsernames = [
  'celofan_123', 'goodbuilder99', 'pixel_punk', 'web3artist', 'chaindrawer',
  'nftcrafter', 'cubist_dao', 'raster_rebel', 'onchain_art', 'mosaic_king',
  'dotdotdot', 'blockbrush', 'canvas_whale', 'gridlocked', 'pixel_sensei',
  'hashpaint', 'celopixel', 'digitaldots', 'artchain42', 'spritemaster',
  'bitmapper', 'voxel_v', 'tilepro', 'layerzero_art', 'pixel_cowboy',
  'brushblock', 'paintnode', 'colorstack', 'pixelwaves', 'dotchain',
]

function generateAddress(index: number): string {
  const hex = (index + 100).toString(16).padStart(4, '0')
  return `0x${hex}${'a'.repeat(36)}`.slice(0, 42)
}

function generateEntries(topPixels: number, decay: number): LeaderboardEntry[] {
  const entries: LeaderboardEntry[] = []

  for (let i = 0; i < 20; i++) {
    const user = mockUsers[i]
    const pixels = Math.round(topPixels * Math.pow(decay, i))
    const gSpent = Math.round(pixels * 0.1 * 100) / 100
    entries.push(makeEntry(i + 1, user.username, user.address, user.avatarSeed, pixels, gSpent, user.joinedAt))
  }

  for (let i = 0; i < 30; i++) {
    const rank = 21 + i
    const pixels = Math.round(topPixels * Math.pow(decay, rank - 1))
    const gSpent = Math.round(pixels * 0.1 * 100) / 100
    entries.push(
      makeEntry(
        rank,
        extraUsernames[i],
        generateAddress(i),
        `seed-${(rank).toString().padStart(3, '0')}`,
        pixels,
        gSpent,
        Date.now() - 86_400_000 * (90 - i),
      ),
    )
  }

  return entries
}

export const seasonEntries: LeaderboardEntry[] = generateEntries(5000, 0.94)

export const allTimeEntries: LeaderboardEntry[] = generateEntries(8200, 0.93).map((e, i) => ({
  ...e,
  rank: i + 1,
  score: Math.round(e.pixelsPlaced * 2 + e.gSpent * 10),
}))

export const last24hEntries: LeaderboardEntry[] = generateEntries(320, 0.91).map((e, i) => ({
  ...e,
  rank: i + 1,
  score: Math.round(e.pixelsPlaced * 2 + e.gSpent * 10),
}))
