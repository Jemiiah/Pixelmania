import type { Template } from '@/lib/types.ts'
import { Button } from '@/components/ui/Button.tsx'
import clsx from 'clsx'

interface TemplateCardProps {
  template: Template
  isSelected: boolean
  onApply: (template: Template) => void
}

export function TemplateCard({ template, isSelected, onApply }: TemplateCardProps) {
  return (
    <div
      className={clsx(
        'rounded-lg p-3 transition-all duration-200 web3-card',
        isSelected
          ? 'gradient-border-animated shadow-glow-primary'
          : 'border border-border-subtle hover:border-border-strong hover:shadow-md',
      )}
    >
      {/* Thumbnail */}
      <div className="mb-2 flex h-20 items-center justify-center rounded-md bg-bg-base/80 overflow-hidden">
        {template.thumbnail ? (
          <img
            src={template.thumbnail}
            alt={template.name}
            className="pixel-render max-h-full max-w-full object-contain"
          />
        ) : (
          <span className="text-2xl opacity-30">🎨</span>
        )}
      </div>

      <h4 className="text-sm font-semibold text-text-primary truncate">
        {template.name}
      </h4>
      <p className="mt-0.5 text-xs text-text-secondary">
        by {template.creator}
      </p>
      <p className="text-[10px] font-mono text-text-tertiary">
        {template.width}&times;{template.height}px
      </p>

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
