import { useState, useRef, useCallback } from 'react'
import type { ReactNode } from 'react'
import clsx from 'clsx'

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'

interface TooltipProps {
  content: ReactNode
  position?: TooltipPosition
  children: ReactNode
  delay?: number
}

const positionClasses: Record<TooltipPosition, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
}

const arrowClasses: Record<TooltipPosition, string> = {
  top: 'top-full left-1/2 -translate-x-1/2 border-t-bg-elevated border-x-transparent border-b-transparent',
  bottom:
    'bottom-full left-1/2 -translate-x-1/2 border-b-bg-elevated border-x-transparent border-t-transparent',
  left: 'left-full top-1/2 -translate-y-1/2 border-l-bg-elevated border-y-transparent border-r-transparent',
  right:
    'right-full top-1/2 -translate-y-1/2 border-r-bg-elevated border-y-transparent border-l-transparent',
}

function Tooltip({
  content,
  position = 'top',
  children,
  delay = 300,
}: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

  const show = useCallback(() => {
    timerRef.current = setTimeout(() => setVisible(true), delay)
  }, [delay])

  const hide = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setVisible(false)
  }, [])

  return (
    <div className="relative inline-flex" onMouseEnter={show} onMouseLeave={hide}>
      {children}
      {visible && (
        <div
          className={clsx(
            'absolute z-[60] pointer-events-none',
            'animate-[fadeIn_150ms_ease-out_forwards]',
            positionClasses[position],
          )}
        >
          <div className="px-2.5 py-1.5 text-xs font-medium text-text-primary bg-bg-elevated border border-border-default rounded-md shadow-md whitespace-nowrap">
            {content}
          </div>
          <div
            className={clsx(
              'absolute w-0 h-0 border-4',
              arrowClasses[position],
            )}
          />
        </div>
      )}
    </div>
  )
}

export { Tooltip }
export type { TooltipProps, TooltipPosition }
