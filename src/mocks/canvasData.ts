import { CANVAS_SIZE, CANVAS_PIXEL_COUNT } from '@/lib/constants.ts'

/**
 * Generate a mock 512x512 pixel canvas with sample artwork.
 * Each byte is a palette index (0-23). Background is white (1).
 */
export function generateMockCanvas(): Uint8Array {
  const data = new Uint8Array(CANVAS_PIXEL_COUNT).fill(1) // white background

  const set = (x: number, y: number, color: number) => {
    if (x >= 0 && x < CANVAS_SIZE && y >= 0 && y < CANVAS_SIZE) {
      data[y * CANVAS_SIZE + x] = color
    }
  }

  const fillCircle = (cx: number, cy: number, r: number, color: number) => {
    const r2 = r * r
    for (let dy = -r; dy <= r; dy++) {
      for (let dx = -r; dx <= r; dx++) {
        if (dx * dx + dy * dy <= r2) {
          set(cx + dx, cy + dy, color)
        }
      }
    }
  }

  // ── Smiley face centered at (128, 128), ~40px diameter ──
  fillCircle(128, 128, 20, 8) // yellow face (index 8 = Yellow)
  // Eyes
  fillCircle(122, 122, 3, 0) // left eye (Black)
  fillCircle(134, 122, 3, 0) // right eye (Black)
  // Mouth (arc of black pixels)
  for (let angle = 0.3; angle < Math.PI - 0.3; angle += 0.08) {
    const mx = Math.round(128 + Math.cos(angle) * 12)
    const my = Math.round(128 + Math.sin(angle) * 12)
    set(mx, my, 0)
  }

  // ── Red heart centered at (300, 200), ~30px ──
  for (let y = -15; y <= 15; y++) {
    for (let x = -15; x <= 15; x++) {
      const nx = x / 15
      const ny = y / 15
      // heart equation: (x^2 + y^2 - 1)^3 - x^2 * y^3 < 0
      const t = nx * nx + ny * ny - 1
      if (t * t * t - nx * nx * ny * ny * ny < 0) {
        // flip y so heart is right-side up
        set(300 + x, 200 - y, 4) // Red
      }
    }
  }

  // ── Rainbow stripes from y=400 to y=440 ──
  const rainbowColors = [4, 6, 8, 10, 14, 16, 18] // Red, Orange, Yellow, Green, Blue, Purple, Magenta
  const bandHeight = Math.floor(40 / rainbowColors.length)
  for (let i = 0; i < rainbowColors.length; i++) {
    const yStart = 400 + i * bandHeight
    for (let y = yStart; y < yStart + bandHeight && y < 440; y++) {
      for (let x = 50; x < 462; x++) {
        set(x, y, rainbowColors[i])
      }
    }
  }

  // ── Green "G$" text at (400, 100), ~30px tall ──
  // "G" character (pixel art, approx 12x16)
  const gChar = [
    '  XXXXXX  ',
    ' XX    XX ',
    'XX        ',
    'XX        ',
    'XX        ',
    'XX   XXXXX',
    'XX      XX',
    ' XX    XX ',
    '  XXXXXX  ',
  ]
  const dollarChar = [
    '    XX    ',
    '  XXXXXX  ',
    ' XX XX    ',
    ' XX XX    ',
    '  XXXXXX  ',
    '    XX XX ',
    '    XX XX ',
    '  XXXXXX  ',
    '    XX    ',
  ]

  const drawChar = (pixels: string[], ox: number, oy: number, color: number) => {
    for (let row = 0; row < pixels.length; row++) {
      for (let col = 0; col < pixels[row].length; col++) {
        if (pixels[row][col] === 'X') {
          // Scale 2x for visibility
          set(ox + col * 2, oy + row * 2, color)
          set(ox + col * 2 + 1, oy + row * 2, color)
          set(ox + col * 2, oy + row * 2 + 1, color)
          set(ox + col * 2 + 1, oy + row * 2 + 1, color)
        }
      }
    }
  }

  drawChar(gChar, 400, 100, 10)  // Green
  drawChar(dollarChar, 422, 100, 10)  // Green

  // ── Scattered random pixels (150) ──
  let seed = 42
  const pseudoRandom = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff
    return seed / 0x7fffffff
  }
  for (let i = 0; i < 150; i++) {
    const rx = Math.floor(pseudoRandom() * CANVAS_SIZE)
    const ry = Math.floor(pseudoRandom() * CANVAS_SIZE)
    const rc = Math.floor(pseudoRandom() * 24)
    set(rx, ry, rc)
  }

  return data
}
