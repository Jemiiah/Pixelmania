import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { CANVAS_SIZE, GRID_VISIBLE_ZOOM } from '@/lib/constants.ts'
import { useCanvasStore } from '@/stores/canvasStore.ts'

interface CanvasGridProps {
  gridCanvasRef: RefObject<HTMLCanvasElement | null>
}

export function CanvasGrid({ gridCanvasRef }: CanvasGridProps) {
  const zoom = useCanvasStore((s) => s.zoom)
  const gridVisible = useCanvasStore((s) => s.gridVisible)
  const prevStateRef = useRef<{ zoom: number; visible: boolean } | null>(null)

  useEffect(() => {
    const canvas = gridCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const shouldShow = gridVisible && zoom >= GRID_VISIBLE_ZOOM
    const prevState = prevStateRef.current

    // Skip if nothing changed
    if (prevState && prevState.zoom === zoom && prevState.visible === shouldShow) {
      return
    }
    prevStateRef.current = { zoom, visible: shouldShow }

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

    if (!shouldShow) return

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'
    ctx.lineWidth = 1 / zoom // scale-independent 1px lines

    ctx.beginPath()
    for (let x = 0; x <= CANVAS_SIZE; x++) {
      ctx.moveTo(x, 0)
      ctx.lineTo(x, CANVAS_SIZE)
    }
    for (let y = 0; y <= CANVAS_SIZE; y++) {
      ctx.moveTo(0, y)
      ctx.lineTo(CANVAS_SIZE, y)
    }
    ctx.stroke()
  }, [zoom, gridVisible, gridCanvasRef])

  return null
}
