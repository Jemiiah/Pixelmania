import type { Template } from '@/lib/types.ts'

function createPixelData(width: number, height: number, fill: number): Uint8Array {
  return new Uint8Array(width * height).fill(fill)
}

// Generate a small canvas data URL from pixel indices
function generateThumbnail(pattern: string[], colorMap: Record<string, string>): string {
  const h = pattern.length
  const w = pattern[0].length
  const scale = 4
  const canvas = `<svg xmlns="http://www.w3.org/2000/svg" width="${w * scale}" height="${h * scale}" viewBox="0 0 ${w * scale} ${h * scale}">${pattern
    .map((row, y) =>
      row
        .split('')
        .map((ch, x) => {
          const color = colorMap[ch]
          return color ? `<rect x="${x * scale}" y="${y * scale}" width="${scale}" height="${scale}" fill="${color}"/>` : ''
        })
        .join(''),
    )
    .join('')}</svg>`
  return `data:image/svg+xml,${encodeURIComponent(canvas)}`
}

const celoThumbnail = generateThumbnail(
  [
    '    GGGG    YYYY    ',
    '  GG    GG YY  YY  ',
    ' GG      GYY    YY ',
    'GG       GY      YY',
    'GG       GY      YY',
    ' GG      GYY    YY ',
    '  GG    GG YY  YY  ',
    '    GGGG    YYYY    ',
  ],
  { G: '#00e676', Y: '#ffb300' },
)

const heartThumbnail = generateThumbnail(
  [
    '  RR  RR  ',
    ' RRRRRRRR ',
    'RRRRRRRRRR',
    'RRRRRRRRRR',
    ' RRRRRRRR ',
    '  RRRRRR  ',
    '   RRRR   ',
    '    RR    ',
  ],
  { R: '#ff5739' },
)

const rainbowThumbnail = generateThumbnail(
  [
    'RRRRRRRRRRRRRRRRRRRRRRRR',
    'RRRRRRRRRRRRRRRRRRRRRRRR',
    'OOOOOOOOOOOOOOOOOOOOOOOO',
    'OOOOOOOOOOOOOOOOOOOOOOOO',
    'YYYYYYYYYYYYYYYYYYYYYYYY',
    'YYYYYYYYYYYYYYYYYYYYYYYY',
    'GGGGGGGGGGGGGGGGGGGGGGGG',
    'GGGGGGGGGGGGGGGGGGGGGGGG',
    'BBBBBBBBBBBBBBBBBBBBBBBB',
    'BBBBBBBBBBBBBBBBBBBBBBBB',
    'PPPPPPPPPPPPPPPPPPPPPPPP',
    'PPPPPPPPPPPPPPPPPPPPPPPP',
  ],
  { R: '#ff0000', O: '#ff7f00', Y: '#ffff00', G: '#00ff00', B: '#0000ff', P: '#7f00ff' },
)

const gdollarThumbnail = generateThumbnail(
  [
    '      GG          ',
    '    GGGGGG        ',
    '   GG GG          ',
    '    GGGGGG        ',
    '      GG GG       ',
    '    GGGGGG        ',
    '      GG          ',
  ],
  { G: '#00e676' },
)

const catThumbnail = generateThumbnail(
  [
    ' O    O ',
    'OO    OO',
    'OOOOOOOO',
    'OO OO OO',
    'OOOOOOOO',
    'OO    OO',
    ' OOOOOO ',
    '  O  O  ',
  ],
  { O: '#ff7f00' },
)

const smileyThumbnail = generateThumbnail(
  [
    '  YYYY  ',
    ' YYYYYY ',
    'YYBYYBYY',
    'YYYYYYYY',
    'YBY  YBY',
    'Y BYYYB Y',
    ' YYYYYY ',
    '  YYYY  ',
  ],
  { Y: '#ffff00', B: '#000000' },
)

export const mockTemplates: Template[] = [
  {
    id: 'tpl-001',
    name: 'Celo Logo',
    creator: 'pixelartist42',
    width: 16,
    height: 16,
    pixels: createPixelData(16, 16, 10),
    thumbnail: celoThumbnail,
    x: 100,
    y: 100,
  },
  {
    id: 'tpl-002',
    name: 'Heart Pattern',
    creator: 'celowhale',
    width: 12,
    height: 10,
    pixels: createPixelData(12, 10, 4),
    thumbnail: heartThumbnail,
    x: 200,
    y: 150,
  },
  {
    id: 'tpl-003',
    name: 'Rainbow Flag',
    creator: 'blockmosaics',
    width: 24,
    height: 16,
    pixels: createPixelData(24, 16, 8),
    thumbnail: rainbowThumbnail,
    x: 50,
    y: 50,
  },
  {
    id: 'tpl-004',
    name: 'GoodDollar G$',
    creator: 'goodbuilder',
    width: 20,
    height: 20,
    pixels: createPixelData(20, 20, 11),
    thumbnail: gdollarThumbnail,
    x: 300,
    y: 200,
  },
  {
    id: 'tpl-005',
    name: 'Pixel Cat',
    creator: 'neonpixel',
    width: 16,
    height: 14,
    pixels: createPixelData(16, 14, 6),
    thumbnail: catThumbnail,
    x: 400,
    y: 100,
  },
  {
    id: 'tpl-006',
    name: 'Smiley Face',
    creator: 'pixelqueen',
    width: 10,
    height: 10,
    pixels: createPixelData(10, 10, 8),
    thumbnail: smileyThumbnail,
    x: 250,
    y: 300,
  },
]
