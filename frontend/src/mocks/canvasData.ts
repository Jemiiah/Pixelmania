import { CANVAS_SIZE, CANVAS_PIXEL_COUNT } from '@/lib/constants.ts'

export function generateMockCanvas(): Uint8Array {
  // Dark background (index 0 = black) — already default in store
  const data = new Uint8Array(CANVAS_PIXEL_COUNT)

  const set = (x: number, y: number, color: number) => {
    if (x >= 0 && x < CANVAS_SIZE && y >= 0 && y < CANVAS_SIZE) {
      data[y * CANVAS_SIZE + x] = color
    }
  }

  const fillCircle = (cx: number, cy: number, r: number, color: number) => {
    const r2 = r * r
    for (let dy = -r; dy <= r; dy++) {
      for (let dx = -r; dx <= r; dx++) {
        if (dx * dx + dy * dy <= r2) set(cx + dx, cy + dy, color)
      }
    }
  }

  const fillRect = (x: number, y: number, w: number, h: number, color: number) => {
    for (let dy = 0; dy < h; dy++)
      for (let dx = 0; dx < w; dx++)
        set(x + dx, y + dy, color)
  }

  let seed = 42
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff
    return seed / 0x7fffffff
  }

  // ── Subtle dark grid pattern for "active canvas" feel ──
  for (let y = 0; y < CANVAS_SIZE; y += 32) {
    for (let x = 0; x < CANVAS_SIZE; x++) {
      set(x, y, 2) // gray gridline
    }
  }
  for (let x = 0; x < CANVAS_SIZE; x += 32) {
    for (let y = 0; y < CANVAS_SIZE; y++) {
      set(x, y, 2) // gray gridline
    }
  }

  // ── Celo logo: two interlocking circles (center of canvas) ──
  const celoX = 256, celoY = 200
  for (let a = 0; a < Math.PI * 2; a += 0.01) {
    for (let r = 42; r < 48; r++) {
      set(celoX - 18 + Math.round(Math.cos(a) * r), celoY + Math.round(Math.sin(a) * r), 10) // green
    }
    for (let r = 42; r < 48; r++) {
      set(celoX + 18 + Math.round(Math.cos(a) * r), celoY + Math.round(Math.sin(a) * r), 8) // yellow
    }
  }
  // Cut the overlap to make interlocking
  for (let y = celoY - 10; y < celoY + 10; y++) {
    for (let x = celoX - 5; x < celoX + 5; x++) {
      set(x, y, 0) // dark cutout
    }
  }

  // ── Smiley face (top-left quadrant) ──
  fillCircle(100, 100, 28, 8) // yellow
  fillCircle(100, 100, 25, 8)
  fillCircle(92, 92, 4, 0)    // left eye
  fillCircle(108, 92, 4, 0)   // right eye
  for (let angle = 0.2; angle < Math.PI - 0.2; angle += 0.05) {
    set(100 + Math.round(Math.cos(angle) * 15), 100 + Math.round(Math.sin(angle) * 15), 0)
    set(100 + Math.round(Math.cos(angle) * 14), 100 + Math.round(Math.sin(angle) * 14), 0)
  }

  // ── Heart (right area) ──
  for (let y = -20; y <= 20; y++) {
    for (let x = -20; x <= 20; x++) {
      const nx = x / 18, ny = y / 18
      const t = nx * nx + ny * ny - 1
      if (t * t * t - nx * nx * ny * ny * ny < 0) {
        set(380 + x, 120 - y, 4) // red
        if (Math.abs(x) < 6 && y > 5) set(380 + x, 120 - y, 5) // light red highlight
      }
    }
  }

  // ── Rainbow arc (bottom area) ──
  const rainbowColors = [4, 6, 8, 10, 12, 14, 16]
  for (let i = 0; i < rainbowColors.length; i++) {
    const r = 90 + i * 6
    for (let a = Math.PI * 0.15; a < Math.PI * 0.85; a += 0.003) {
      for (let dr = 0; dr < 5; dr++) {
        set(256 + Math.round(Math.cos(a) * (r + dr)), 420 + Math.round(Math.sin(a) * (r + dr)), rainbowColors[i])
      }
    }
  }

  // ── "G$" neon text (top center) ──
  const gChar = [
    '  XXXXXX  ',
    ' XX    XX ',
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
    '  XXXXXX  ',
    '    XX XX ',
    '  XXXXXX  ',
    '    XX    ',
  ]
  const drawChar = (pixels: string[], ox: number, oy: number, color: number, glow: number) => {
    for (let row = 0; row < pixels.length; row++) {
      for (let col = 0; col < pixels[row].length; col++) {
        if (pixels[row][col] === 'X') {
          // 3x scale
          for (let sy = 0; sy < 3; sy++)
            for (let sx = 0; sx < 3; sx++)
              set(ox + col * 3 + sx, oy + row * 3 + sy, color)
        }
      }
    }
    // Glow around the text
    for (let row = -1; row < pixels.length + 1; row++) {
      for (let col = -1; col < 11; col++) {
        const hasNeighbor = (r: number, c: number) =>
          r >= 0 && r < pixels.length && c >= 0 && c < pixels[r].length && pixels[r][c] === 'X'
        const near = hasNeighbor(row, col) || hasNeighbor(row - 1, col) || hasNeighbor(row + 1, col) ||
          hasNeighbor(row, col - 1) || hasNeighbor(row, col + 1)
        if (near && !(row >= 0 && row < pixels.length && col >= 0 && col < pixels[row].length && pixels[row][col] === 'X')) {
          for (let sy = 0; sy < 3; sy++)
            for (let sx = 0; sx < 3; sx++)
              set(ox + col * 3 + sx, oy + row * 3 + sy, glow)
        }
      }
    }
  }
  drawChar(gChar, 210, 40, 10, 11)   // Green with light green glow
  drawChar(dollarChar, 245, 43, 10, 11)

  // ── Pixel art tree cluster (left-center) ──
  for (let t = 0; t < 3; t++) {
    const tx = 60 + t * 35, ty = 280
    // Trunk
    fillRect(tx + 4, ty, 4, 12, 20) // brown
    // Leaves (triangle)
    for (let row = 0; row < 14; row++) {
      const w = row + 2
      fillRect(tx + 6 - w, ty - row - 4, w * 2, 1, 10) // green
    }
    // Darker leaves for depth
    for (let row = 0; row < 10; row++) {
      const w = Math.floor(row / 2)
      fillRect(tx + 2 - w, ty - row - 2, w, 1, 11) // light green highlight
    }
  }

  // ── Blockchain-style connected blocks (right side) ──
  for (let i = 0; i < 5; i++) {
    const bx = 400, by = 250 + i * 30
    fillRect(bx, by, 20, 14, 14) // blue block
    fillRect(bx + 1, by + 1, 18, 12, 15) // lighter inside
    fillRect(bx + 3, by + 3, 4, 4, 1)   // white data pixel
    fillRect(bx + 10, by + 3, 7, 2, 1)  // white line
    fillRect(bx + 10, by + 7, 5, 2, 1)  // white line
    // Connector line
    if (i < 4) {
      fillRect(bx + 9, by + 14, 2, 16, 12) // cyan connector
    }
  }

  // ── Stars / sparkle pixels scattered ──
  for (let i = 0; i < 60; i++) {
    const sx = Math.floor(rand() * CANVAS_SIZE)
    const sy = Math.floor(rand() * CANVAS_SIZE)
    const existing = data[sy * CANVAS_SIZE + sx]
    if (existing === 0 || existing === 2) { // only on dark/grid pixels
      const sparkleColors = [1, 3, 9, 13] // white, light gray, light yellow, light cyan
      set(sx, sy, sparkleColors[Math.floor(rand() * sparkleColors.length)])
    }
  }

  // ── Small pixel art creatures scattered ──
  // Tiny ghost
  const ghost = [
    ' XXX ',
    'XXXXX',
    'X X X',
    'XXXXX',
    'X X X',
  ]
  ghost.forEach((row, gy) => {
    for (let gx = 0; gx < row.length; gx++) {
      if (row[gx] === 'X') set(450 + gx * 2, 50 + gy * 2, 1)
      if (row[gx] === 'X') set(450 + gx * 2 + 1, 50 + gy * 2, 1)
      if (row[gx] === 'X') set(450 + gx * 2, 50 + gy * 2 + 1, 1)
      if (row[gx] === 'X') set(450 + gx * 2 + 1, 50 + gy * 2 + 1, 1)
    }
  })

  // Tiny mushroom
  const mush = [
    ' RRR ',
    'RRWRR',
    'RRRRR',
    ' WWW ',
    ' WWW ',
  ]
  const mushColors: Record<string, number> = { R: 4, W: 1 }
  mush.forEach((row, my) => {
    for (let mx = 0; mx < row.length; mx++) {
      const c = mushColors[row[mx]]
      if (c !== undefined) {
        set(480 + mx * 2, 360 + my * 2, c)
        set(480 + mx * 2 + 1, 360 + my * 2, c)
        set(480 + mx * 2, 360 + my * 2 + 1, c)
        set(480 + mx * 2 + 1, 360 + my * 2 + 1, c)
      }
    }
  })

  return data
}
