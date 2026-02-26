import { useCanvasStore } from '@/stores/canvasStore.ts'
import { pixelPalette } from '@/design/tokens.ts'
import { canvasToScreen } from '@/lib/canvas-math.ts'

export function PixelInfo() {
  const hoveredPixel = useCanvasStore((s) => s.hoveredPixel)
  const zoom = useCanvasStore((s) => s.zoom)
  const offset = useCanvasStore((s) => s.offset)
  const pixels = useCanvasStore((s) => s.pixels)

  if (!hoveredPixel) return null

  const colorIndex = pixels[hoveredPixel.y * 512 + hoveredPixel.x]
  const color = pixelPalette[colorIndex] ?? pixelPalette[0]

  const screenPos = canvasToScreen(
    hoveredPixel.x,
    hoveredPixel.y,
    zoom,
    offset.x,
    offset.y,
  )

  return (
    <div
      className="glass pointer-events-none absolute z-tooltip rounded-md px-2.5 py-1.5"
      style={{
        left: screenPos.x + zoom + 12,
        top: screenPos.y - 8,
      }}
    >
      <div className="flex items-center gap-2">
        <div
          className="h-3 w-3 rounded-sm border border-border-default"
          style={{ backgroundColor: color.hex }}
        />
        <span className="font-mono text-xs text-text-primary">
          ({hoveredPixel.x}, {hoveredPixel.y})
        </span>
        <span className="text-xs text-text-secondary">{color.name}</span>
      </div>
    </div>
  )
}
