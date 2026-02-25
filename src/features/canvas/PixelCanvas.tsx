import { useEffect, useRef } from 'react'
import { useCanvasStore } from '@/stores/canvasStore.ts'
import { useCanvasRenderer } from './hooks/useCanvasRenderer.ts'
import { useCanvasInteraction } from './hooks/useCanvasInteraction.ts'
import { useCanvasTransform } from './hooks/useCanvasTransform.ts'
import { CanvasGrid } from './CanvasGrid.tsx'
import { CanvasControls } from './CanvasControls.tsx'
import { PixelInfo } from './PixelInfo.tsx'
import { generateMockCanvas } from '@/mocks/canvasData.ts'
import { CANVAS_SIZE } from '@/lib/constants.ts'

export function PixelCanvas() {
  const pixels = useCanvasStore((s) => s.pixels)
  const setPixel = useCanvasStore((s) => s.setPixel)

  const containerRef = useRef<HTMLDivElement>(null)
  const mainCanvasRef = useRef<HTMLCanvasElement>(null)
  const gridCanvasRef = useRef<HTMLCanvasElement>(null)
  const templateCanvasRef = useRef<HTMLCanvasElement>(null)

  useCanvasRenderer(pixels, mainCanvasRef)
  const { transformStyle } = useCanvasTransform()
  const handlers = useCanvasInteraction(containerRef)

  // Populate with mock data on mount
  useEffect(() => {
    const mockData = generateMockCanvas()
    for (let i = 0; i < mockData.length; i++) {
      if (mockData[i] !== 1) {
        const x = i % CANVAS_SIZE
        const y = (i / CANVAS_SIZE) | 0
        setPixel(x, y, mockData[i])
      }
    }
  }, [setPixel])

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden bg-bg-base outline-none"
      tabIndex={0}
      onMouseDown={handlers.onMouseDown}
      onMouseMove={handlers.onMouseMove}
      onMouseUp={handlers.onMouseUp}
      onMouseLeave={handlers.onMouseLeave}
      onWheel={handlers.onWheel}
      onTouchStart={handlers.onTouchStart}
      onTouchMove={handlers.onTouchMove}
      onTouchEnd={handlers.onTouchEnd}
      onKeyDown={handlers.onKeyDown}
    >
      <div style={transformStyle}>
        {/* Main pixel canvas */}
        <canvas
          ref={mainCanvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="pixel-render absolute left-0 top-0"
        />

        {/* Grid overlay */}
        <canvas
          ref={gridCanvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="pointer-events-none absolute left-0 top-0"
        />

        {/* Template overlay (future use) */}
        <canvas
          ref={templateCanvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="pointer-events-none absolute left-0 top-0 hidden"
        />
      </div>

      <CanvasGrid gridCanvasRef={gridCanvasRef} />
      <CanvasControls />
      <PixelInfo />
    </div>
  )
}
