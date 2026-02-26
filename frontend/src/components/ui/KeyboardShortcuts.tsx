import { useEffect } from 'react'
import { useCanvasStore } from '@/stores/canvasStore'
import { usePaletteStore } from '@/stores/paletteStore'
import { clampZoom } from '@/lib/canvas-math'
import { ZOOM_STEP } from '@/lib/constants'

export function KeyboardShortcuts() {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return

      const canvas = useCanvasStore.getState()
      const palette = usePaletteStore.getState()

      switch (e.key.toLowerCase()) {
        case 'g':
          canvas.toggleGrid()
          break
        case '=':
        case '+':
          canvas.setZoom(clampZoom(canvas.zoom * ZOOM_STEP))
          break
        case '-':
          canvas.setZoom(clampZoom(canvas.zoom / ZOOM_STEP))
          break
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          palette.selectColor(parseInt(e.key) - 1)
          break
        case '0':
          palette.selectColor(9)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return null
}
