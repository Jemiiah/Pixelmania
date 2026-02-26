import type { HTMLAttributes } from 'react'
import clsx from 'clsx'

type BadgeColor = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'neutral'
type BadgeSize = 'sm' | 'md'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  color?: BadgeColor
  size?: BadgeSize
}

const colorClasses: Record<BadgeColor, string> = {
  primary: 'bg-primary-500/15 text-primary-400 border-primary-500/20',
  secondary: 'bg-secondary-500/15 text-secondary-400 border-secondary-500/20',
  tertiary: 'bg-tertiary-500/15 text-tertiary-400 border-tertiary-500/20',
  danger: 'bg-danger-500/15 text-danger-400 border-danger-500/20',
  neutral: 'bg-white/5 text-text-secondary border-border-default',
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-1.5 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
}

function Badge({
  color = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center font-medium rounded-full border',
        colorClasses[color],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export { Badge }
export type { BadgeProps, BadgeColor, BadgeSize }
