import { useRef, useEffect, useCallback, useState } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'
import { useCanvasStore } from '@/stores/canvasStore.ts'
import { CANVAS_SIZE, MINIMAP_SIZE } from '@/lib/constants.ts'
import { pixelPalette } from '@/design/tokens.ts'
import clsx from 'clsx'

const SCALE = MINIMAP_SIZE / CANVAS_SIZE // 128/512 = 0.25

export function Minimap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pixels = useCanvasStore((s) => s.pixels)
  const zoom = useCanvasStore((s) => s.zoom)
  const offset = useCanvasStore((s) => s.offset)
  const setOffset = useCanvasStore((s) => s.setOffset)
  const [visible, setVisible] = useState(true)

  // Keyboard toggle
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'm' || e.key === 'M') {
        // Ignore if typing in an input
        const tag = (e.target as HTMLElement).tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA') return
        setVisible((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Render minimap
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const imgData = ctx.createImageData(MINIMAP_SIZE, MINIMAP_SIZE)
    const data = imgData.data

    for (let my = 0; my < MINIMAP_SIZE; my++) {
      for (let mx = 0; mx < MINIMAP_SIZE; mx++) {
        // Sample every 4th pixel (since scale = 0.25)
        const cx = Math.floor(mx / SCALE)
        const cy = Math.floor(my / SCALE)
        const colorIndex = pixels[cy * CANVAS_SIZE + cx] ?? 1
        const hex = pixelPalette[colorIndex]?.hex ?? '#ffffff'

        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)

        const idx = (my * MINIMAP_SIZE + mx) * 4
        data[idx] = r
        data[idx + 1] = g
        data[idx + 2] = b
        data[idx + 3] = 255
      }
    }

    ctx.putImageData(imgData, 0, 0)

    // Draw viewport rectangle
    const viewW = (window.innerWidth - 320) // approx canvas viewport
    const viewH = window.innerHeight - 56

    const rectX = (-offset.x / zoom) * SCALE
    const rectY = (-offset.y / zoom) * SCALE
    const rectW = (viewW / zoom) * SCALE
    const rectH = (viewH / zoom) * SCALE

    ctx.strokeStyle = 'rgba(0, 102, 255, 0.8)'
    ctx.lineWidth = 1.5
    ctx.strokeRect(
      Math.max(0, rectX),
      Math.max(0, rectY),
      Math.min(MINIMAP_SIZE - rectX, rectW),
      Math.min(MINIMAP_SIZE - rectY, rectH),
    )

    ctx.fillStyle = 'rgba(0, 102, 255, 0.1)'
    ctx.fillRect(
      Math.max(0, rectX),
      Math.max(0, rectY),
      Math.min(MINIMAP_SIZE - rectX, rectW),
      Math.min(MINIMAP_SIZE - rectY, rectH),
    )
  }, [pixels, zoom, offset])

  const handleClick = useCallback(
    (e: ReactMouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top

      // Convert minimap coords to canvas coords
      const cx = mx / SCALE
      const cy = my / SCALE

      // Center viewport on clicked point
      const viewW = window.innerWidth - 320
      const viewH = window.innerHeight - 56

      const newOffsetX = -(cx * zoom - viewW / 2)
      const newOffsetY = -(cy * zoom - viewH / 2)
      setOffset(newOffsetX, newOffsetY)
    },
    [zoom, setOffset],
  )

  if (!visible) return null

  return (
    <div
      className={clsx(
        'absolute bottom-4 right-4 z-10',
        'rounded-lg border border-border-default bg-bg-surface/80 backdrop-blur-sm p-1.5',
        'shadow-md',
      )}
    >
      <canvas
        ref={canvasRef}
        width={MINIMAP_SIZE}
        height={MINIMAP_SIZE}
        onClick={handleClick}
        className="block cursor-crosshair rounded pixel-render"
      />
    </div>
  )
}
