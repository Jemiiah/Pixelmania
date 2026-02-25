import type { Template } from '@/lib/types.ts'
import { pixelPalette } from '@/design/tokens.ts'
import { Button } from '@/components/ui/Button.tsx'
import clsx from 'clsx'

interface TemplateCardProps {
  template: Template
  isSelected: boolean
  onApply: (template: Template) => void
}

function thumbnailColor(pixels: Uint8Array): string {
  const idx = pixels[0] ?? 1
  return pixelPalette[idx]?.hex ?? '#ffffff'
}

export function TemplateCard({ template, isSelected, onApply }: TemplateCardProps) {
  return (
    <div
      className={clsx(
        'rounded-lg border p-3 transition-all duration-150',
        isSelected
          ? 'border-primary-500 bg-primary-500/5 shadow-glow-primary'
          : 'border-border-default bg-bg-surface hover:border-border-strong',
      )}
    >
      {/* Thumbnail */}
      <div
        className="mb-2 flex h-20 items-center justify-center rounded-md"
        style={{ backgroundColor: thumbnailColor(template.pixels) + '33' }}
      >
        <div
          className="rounded"
          style={{
            width: Math.min(template.width * 3, 60),
            height: Math.min(template.height * 3, 48),
            backgroundColor: thumbnailColor(template.pixels),
          }}
        />
      </div>

      {/* Info */}
      <h4 className="text-sm font-semibold text-text-primary truncate">
        {template.name}
      </h4>
      <p className="mt-0.5 text-xs text-text-secondary">
        by {template.creator}
      </p>
      <p className="text-xs text-text-tertiary">
        {template.width}x{template.height}px
      </p>

      {/* Apply button */}
      <Button
        variant={isSelected ? 'secondary' : 'primary'}
        size="sm"
        fullWidth
        className="mt-2"
        onClick={() => onApply(template)}
      >
        {isSelected ? 'Selected' : 'Apply'}
      </Button>
    </div>
  )
}
