import { useEffect, useCallback } from 'react'
import { pixelPalette } from '@/design/tokens.ts'
import { usePaletteStore } from '@/stores/paletteStore.ts'
import { PALETTE_COLS } from '@/lib/constants.ts'
import { ColorSwatch } from './ColorSwatch.tsx'
import { ActiveColor } from './ActiveColor.tsx'

export function ColorPalette() {
  const selectedColor = usePaletteStore((s) => s.selectedColor)
  const selectColor = usePaletteStore((s) => s.selectColor)
  const isCooldownActive = usePaletteStore((s) => s.isCooldownActive)
  const cooldownEnd = usePaletteStore((s) => s.cooldownEnd)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const key = e.key
      if (key >= '1' && key <= '9') {
        selectColor(parseInt(key, 10) - 1)
      } else if (key === '0') {
        selectColor(9)
      }
    },
    [selectColor],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const cooldownActive = isCooldownActive()
  const cooldownProgress = cooldownActive && cooldownEnd
    ? Math.max(0, Math.min(1, (cooldownEnd - Date.now()) / 30_000))
    : 0

  return (
    <div className="flex flex-col gap-2" aria-label="Color palette">
      <div className="relative">
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: `repeat(${PALETTE_COLS}, 1fr)` }}
        >
          {pixelPalette.map((color) => (
            <ColorSwatch
              key={color.index}
              hex={color.hex}
              name={color.name}
              index={color.index}
              isSelected={selectedColor === color.index}
              onSelect={() => selectColor(color.index)}
            />
          ))}
        </div>

        {cooldownActive && (
          <div className="absolute inset-0 flex items-center justify-center rounded-md bg-bg-overlay">
            <div className="flex flex-col items-center gap-1">
              <svg className="h-10 w-10" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-text-tertiary opacity-30"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeDasharray={`${cooldownProgress * 94.25} 94.25`}
                  strokeLinecap="round"
                  className="text-primary-500"
                  transform="rotate(-90 18 18)"
                />
              </svg>
              <span className="text-xs text-text-secondary">Cooldown</span>
            </div>
          </div>
        )}
      </div>

      <ActiveColor />
    </div>
  )
}
