import { clsx } from 'clsx'

interface ColorSwatchProps {
  hex: string
  name: string
  index: number
  isSelected: boolean
  onSelect: () => void
}

export function ColorSwatch({ hex, name, isSelected, onSelect }: ColorSwatchProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={clsx(
        'relative h-8 w-8 rounded-sm border transition-all duration-150',
        'hover:scale-110 hover:shadow-glow-secondary focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2',
        isSelected
          ? 'scale-110 border-white ring-2 ring-white shadow-glow-primary z-10'
          : 'border-border-subtle hover:border-border-strong',
      )}
      style={{ backgroundColor: hex }}
      aria-label={name}
      title={name}
    />
  )
}
