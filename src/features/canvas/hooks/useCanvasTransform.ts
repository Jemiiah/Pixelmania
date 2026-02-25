import { useMemo } from 'react'
import { useCanvasStore } from '@/stores/canvasStore.ts'

export function useCanvasTransform() {
  const zoom = useCanvasStore((s) => s.zoom)
  const offset = useCanvasStore((s) => s.offset)

  const transformStyle = useMemo(
    () => ({
      transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
      transformOrigin: '0 0',
    }),
    [zoom, offset.x, offset.y],
  )

  return { transformStyle, zoom, offset }
}
