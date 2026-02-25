import { useCanvasStore } from '@/stores/canvasStore.ts'
import { clampZoom } from '@/lib/canvas-math.ts'
import { ZOOM_STEP } from '@/lib/constants.ts'

export function CanvasControls() {
  const zoom = useCanvasStore((s) => s.zoom)
  const gridVisible = useCanvasStore((s) => s.gridVisible)
  const hoveredPixel = useCanvasStore((s) => s.hoveredPixel)
  const setZoom = useCanvasStore((s) => s.setZoom)
  const toggleGrid = useCanvasStore((s) => s.toggleGrid)

  const zoomIn = () => setZoom(clampZoom(zoom * ZOOM_STEP))
  const zoomOut = () => setZoom(clampZoom(zoom / ZOOM_STEP))
  const zoomPercent = Math.round(zoom * 100)

  return (
    <div className="glass absolute bottom-4 left-4 flex items-center gap-2 rounded-lg px-3 py-2">
      <button
        type="button"
        onClick={zoomOut}
        className="flex h-7 w-7 items-center justify-center rounded-md text-text-secondary hover:bg-bg-elevated hover:text-text-primary"
        aria-label="Zoom out"
      >
        -
      </button>

      <span className="min-w-[3.5rem] text-center font-mono text-xs text-text-secondary">
        {zoomPercent}%
      </span>

      <button
        type="button"
        onClick={zoomIn}
        className="flex h-7 w-7 items-center justify-center rounded-md text-text-secondary hover:bg-bg-elevated hover:text-text-primary"
        aria-label="Zoom in"
      >
        +
      </button>

      <div className="mx-1 h-4 w-px bg-border-subtle" />

      <button
        type="button"
        onClick={toggleGrid}
        className={`flex h-7 w-7 items-center justify-center rounded-md text-xs ${
          gridVisible
            ? 'text-primary-500'
            : 'text-text-secondary hover:text-text-primary'
        } hover:bg-bg-elevated`}
        aria-label="Toggle grid"
        title="Toggle grid"
      >
        #
      </button>

      {hoveredPixel && (
        <>
          <div className="mx-1 h-4 w-px bg-border-subtle" />
          <span className="font-mono text-xs text-text-secondary">
            ({hoveredPixel.x}, {hoveredPixel.y})
          </span>
        </>
      )}
    </div>
  )
}
