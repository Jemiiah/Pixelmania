import type { HTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

type CardPadding = 'sm' | 'md' | 'lg'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  header?: ReactNode
  padding?: CardPadding
  hoverable?: boolean
}

const paddingClasses: Record<CardPadding, string> = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
}

function Card({
  header,
  padding = 'md',
  hoverable = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(
        'bg-bg-surface border border-border-default rounded-lg',
        hoverable &&
          'transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 hover:border-border-strong hover:shadow-md',
        className,
      )}
      {...props}
    >
      {header && (
        <div className="px-4 py-3 border-b border-border-subtle">{header}</div>
      )}
      <div className={paddingClasses[padding]}>{children}</div>
    </div>
  )
}

export { Card }
export type { CardProps, CardPadding }
