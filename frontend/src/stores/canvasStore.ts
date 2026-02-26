import { create } from 'zustand'
import {
  CANVAS_PIXEL_COUNT,
  ZOOM_DEFAULT,
  COOLDOWN_MS,
} from '@/lib/constants.ts'
import { isInBounds, pixelIndex } from '@/lib/canvas-math.ts'

interface CanvasState {
  pixels: Uint8Array
  zoom: number
  offset: { x: number; y: number }
  gridVisible: boolean
  hoveredPixel: { x: number; y: number } | null
  selectedColor: number
  isDragging: boolean
  lastPlacedAt: number | null

  setPixel: (x: number, y: number, colorIndex: number) => void
  setZoom: (zoom: number) => void
  setOffset: (x: number, y: number) => void
  toggleGrid: () => void
  setHoveredPixel: (pixel: { x: number; y: number } | null) => void
  setSelectedColor: (index: number) => void
  setIsDragging: (dragging: boolean) => void
  placePixel: (x: number, y: number) => void
}

export const useCanvasStore = create<CanvasState>((set, get) => ({
  pixels: new Uint8Array(CANVAS_PIXEL_COUNT).fill(0),
  zoom: ZOOM_DEFAULT,
  offset: { x: 0, y: 0 },
  gridVisible: true,
  hoveredPixel: null,
  selectedColor: 0,
  isDragging: false,
  lastPlacedAt: null,

  setPixel: (x, y, colorIndex) => {
    if (!isInBounds(x, y)) return
    const { pixels } = get()
    const idx = pixelIndex(x, y)
    if (pixels[idx] === colorIndex) return
    const next = new Uint8Array(pixels)
    next[idx] = colorIndex
    set({ pixels: next })
  },

  setZoom: (zoom) => set({ zoom }),

  setOffset: (x, y) => set({ offset: { x, y } }),

  toggleGrid: () => set((s) => ({ gridVisible: !s.gridVisible })),

  setHoveredPixel: (pixel) => set({ hoveredPixel: pixel }),

  setSelectedColor: (index) => set({ selectedColor: index }),

  setIsDragging: (dragging) => set({ isDragging: dragging }),

  placePixel: (x, y) => {
    const { selectedColor, lastPlacedAt } = get()
    if (!isInBounds(x, y)) return
    const now = Date.now()
    if (lastPlacedAt !== null && now - lastPlacedAt < COOLDOWN_MS) return
    const { pixels } = get()
    const idx = pixelIndex(x, y)
    const next = new Uint8Array(pixels)
    next[idx] = selectedColor
    set({ pixels: next, lastPlacedAt: now })
  },
}))
