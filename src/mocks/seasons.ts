import type { Season } from '@/lib/types.ts'
import { mockUsers } from './users.ts'

const DAY_MS = 86_400_000

export const mockCurrentSeason: Season = {
  id: 3,
  name: 'Season 3 — Celo Rainforest',
  theme: 'Lush tropical landscapes, exotic wildlife, and vibrant ecosystems of the rainforest',
  startDate: Date.now() - DAY_MS * 20,
  endDate: Date.now() + DAY_MS * 10,
  prizePool: 12_500,
  status: 'active',
  totalPixels: 184_320,
  totalParticipants: 347,
}

export const mockPastSeasons: Season[] = [
  {
    id: 2,
    name: 'Season 2 — Neon Cityscape',
    theme: 'Futuristic cityscapes glowing with neon lights and cyberpunk energy',
    startDate: Date.now() - DAY_MS * 75,
    endDate: Date.now() - DAY_MS * 45,
    prizePool: 10_000,
    status: 'ended',
    winner: mockUsers[0],
    totalPixels: 262_144,
    totalParticipants: 512,
  },
  {
    id: 1,
    name: 'Season 1 — Genesis Block',
    theme: 'The birth of Pixelmania — freeform collaborative pixel art on Celo',
    startDate: Date.now() - DAY_MS * 135,
    endDate: Date.now() - DAY_MS * 105,
    prizePool: 5_000,
    status: 'ended',
    winner: mockUsers[1],
    totalPixels: 131_072,
    totalParticipants: 289,
  },
]
