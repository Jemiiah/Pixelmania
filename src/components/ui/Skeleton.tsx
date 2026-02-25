import type { HTMLAttributes } from 'react'
import clsx from 'clsx'

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string | number
  height?: string | number
  rounded?: 'sm' | 'md' | 'lg' | 'full'
}

function Skeleton({
  width,
  height,
  rounded = 'md',
  className,
  style,
  ...props
}: SkeletonProps) {
  const roundedClasses: Record<string, string> = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  }

  return (
    <div
      className={clsx('skeleton', roundedClasses[rounded], className)}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        ...style,
      }}
      {...props}
    />
  )
}

export { Skeleton }
export type { SkeletonProps }
