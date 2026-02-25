import clsx from 'clsx'

type ProgressColor = 'primary' | 'secondary' | 'tertiary'

interface ProgressBarProps {
  value: number
  color?: ProgressColor
  label?: string
  showPercent?: boolean
  className?: string
}

const colorClasses: Record<ProgressColor, string> = {
  primary: 'bg-primary-500',
  secondary: 'bg-secondary-500',
  tertiary: 'bg-tertiary-500',
}

function ProgressBar({
  value,
  color = 'primary',
  label,
  showPercent = false,
  className,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className={clsx('w-full', className)}>
      {(label || showPercent) && (
        <div className="flex items-center justify-between mb-1.5 text-xs text-text-secondary">
          {label && <span>{label}</span>}
          {showPercent && <span>{Math.round(clamped)}%</span>}
        </div>
      )}
      <div className="h-2 w-full bg-bg-elevated rounded-full overflow-hidden">
        <div
          className={clsx(
            'h-full rounded-full transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
            colorClasses[color],
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}

export { ProgressBar }
export type { ProgressBarProps, ProgressColor }
