import type { Template } from '@/lib/types.ts'

function createPixelData(width: number, height: number, fill: number): Uint8Array {
  return new Uint8Array(width * height).fill(fill)
}

export const mockTemplates: Template[] = [
  {
    id: 'tpl-001',
    name: 'Celo Logo',
    creator: 'pixelartist42',
    width: 16,
    height: 16,
    pixels: createPixelData(16, 16, 10),
    thumbnail: '',
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
    thumbnail: '',
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
    thumbnail: '',
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
    thumbnail: '',
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
    thumbnail: '',
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
    thumbnail: '',
    x: 250,
    y: 300,
  },
]
