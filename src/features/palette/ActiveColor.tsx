import { pixelPalette } from '@/design/tokens.ts'
import { usePaletteStore } from '@/stores/paletteStore.ts'

export function ActiveColor() {
  const selectedColor = usePaletteStore((s) => s.selectedColor)
  const color = pixelPalette[selectedColor]

  return (
    <div className="flex items-center gap-3 pt-2">
      <div
        className="h-10 w-10 rounded-md border border-border-default shadow-sm"
        style={{ backgroundColor: color.hex }}
        aria-label={`Selected color: ${color.name}`}
      />
      <div className="flex flex-col">
        <span className="text-sm font-medium text-text-primary">{color.name}</span>
        <span className="font-mono text-xs text-text-secondary">{color.hex}</span>
      </div>
    </div>
  )
}
