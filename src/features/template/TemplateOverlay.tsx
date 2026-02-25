import { useRef, useEffect } from 'react'
import type { Template } from '@/lib/types.ts'
import { useCanvasStore } from '@/stores/canvasStore.ts'
import { pixelPalette } from '@/design/tokens.ts'
import clsx from 'clsx'

interface TemplateOverlayProps {
  template: Template | null
  opacity: number
  visible: boolean
}

export function TemplateOverlay({ template, opacity, visible }: TemplateOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const zoom = useCanvasStore((s) => s.zoom)
  const offset = useCanvasStore((s) => s.offset)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !template || !visible) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = template.width * zoom
    canvas.height = template.height * zoom

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.globalAlpha = opacity / 100

    for (let y = 0; y < template.height; y++) {
      for (let x = 0; x < template.width; x++) {
        const colorIndex = template.pixels[y * template.width + x] ?? 1
        const hex = pixelPalette[colorIndex]?.hex ?? '#ffffff'
        ctx.fillStyle = hex
        ctx.fillRect(x * zoom, y * zoom, zoom, zoom)
      }
    }
  }, [template, opacity, visible, zoom])

  if (!template || !visible) return null

  const left = template.x * zoom + offset.x
  const top = template.y * zoom + offset.y

  return (
    <canvas
      ref={canvasRef}
      className={clsx('absolute pointer-events-none pixel-render')}
      style={{ left, top }}
    />
  )
}
