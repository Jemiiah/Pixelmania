import { useCallback, useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { pixelPalette } from '@/design/tokens.ts'
import { CANVAS_SIZE } from '@/lib/constants.ts'

/** Pre-computed RGBA lookup table: index => [r, g, b, 255] */
function buildRGBATable(): Uint8Array {
  const table = new Uint8Array(24 * 4)
  for (let i = 0; i < 24; i++) {
    const hex = pixelPalette[i].hex
    table[i * 4] = parseInt(hex.slice(1, 3), 16)
    table[i * 4 + 1] = parseInt(hex.slice(3, 5), 16)
    table[i * 4 + 2] = parseInt(hex.slice(5, 7), 16)
    table[i * 4 + 3] = 255
  }
  return table
}

const rgbaTable = buildRGBATable()

export function useCanvasRenderer(
  pixels: Uint8Array,
  canvasRef: RefObject<HTMLCanvasElement | null>,
) {
  const prevPixelsRef = useRef<Uint8Array | null>(null)

  const renderFull = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: false })
    if (!ctx) return

    const imageData = ctx.createImageData(CANVAS_SIZE, CANVAS_SIZE)
    const buf = imageData.data
    const len = pixels.length

    for (let i = 0; i < len; i++) {
      const colorIdx = pixels[i]
      const tableOffset = colorIdx * 4
      const bufOffset = i * 4
      buf[bufOffset] = rgbaTable[tableOffset]
      buf[bufOffset + 1] = rgbaTable[tableOffset + 1]
      buf[bufOffset + 2] = rgbaTable[tableOffset + 2]
      buf[bufOffset + 3] = 255
    }

    ctx.putImageData(imageData, 0, 0)
    prevPixelsRef.current = pixels
  }, [pixels, canvasRef])

  const renderDirty = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: false })
    if (!ctx) return

    const prev = prevPixelsRef.current
    if (!prev || prev.length !== pixels.length) {
      renderFull()
      return
    }

    // Find dirty bounding box
    let minX = CANVAS_SIZE
    let minY = CANVAS_SIZE
    let maxX = -1
    let maxY = -1

    const len = pixels.length
    for (let i = 0; i < len; i++) {
      if (pixels[i] !== prev[i]) {
        const x = i % CANVAS_SIZE
        const y = (i / CANVAS_SIZE) | 0
        if (x < minX) minX = x
        if (x > maxX) maxX = x
        if (y < minY) minY = y
        if (y > maxY) maxY = y
      }
    }

    if (maxX < 0) return // no changes

    const w = maxX - minX + 1
    const h = maxY - minY + 1
    const imageData = ctx.createImageData(w, h)
    const buf = imageData.data

    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const srcIdx = y * CANVAS_SIZE + x
        const colorIdx = pixels[srcIdx]
        const tableOffset = colorIdx * 4
        const dstIdx = ((y - minY) * w + (x - minX)) * 4
        buf[dstIdx] = rgbaTable[tableOffset]
        buf[dstIdx + 1] = rgbaTable[tableOffset + 1]
        buf[dstIdx + 2] = rgbaTable[tableOffset + 2]
        buf[dstIdx + 3] = 255
      }
    }

    ctx.putImageData(imageData, minX, minY)
    prevPixelsRef.current = pixels
  }, [pixels, canvasRef, renderFull])

  // Initial full render
  useEffect(() => {
    renderFull()
  }, [renderFull])

  // Dirty render on pixel changes
  useEffect(() => {
    if (prevPixelsRef.current && prevPixelsRef.current !== pixels) {
      renderDirty()
    }
  }, [pixels, renderDirty])

  return { renderFull, renderDirty }
}
