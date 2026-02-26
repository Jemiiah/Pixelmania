export const CANVAS_SIZE = 512
export const CANVAS_PIXEL_COUNT = CANVAS_SIZE * CANVAS_SIZE
export const PALETTE_SIZE = 24
export const PALETTE_COLS = 6
export const PALETTE_ROWS = 4

export const ZOOM_MIN = 1
export const ZOOM_MAX = 40
export const ZOOM_DEFAULT = 4
export const ZOOM_STEP = 1.2
export const GRID_VISIBLE_ZOOM = 4

export const MINIMAP_SIZE = 128

export const COOLDOWN_MS = 30_000
export const MOCK_WALLET_DELAY_MS = 1_000

export const SIDEBAR_WIDTH = 320

export const ROUTES = {
  CANVAS: '/',
  LEADERBOARD: '/leaderboard',
  GALLERY: '/gallery',
  PROFILE: '/profile',
  SEASON: '/season/:id',
} as const
