import { useState, useEffect, useRef } from 'react'
import { formatCountdown, padZero } from '@/lib/format'
import clsx from 'clsx'

interface CountdownTimerProps {
  target: number
  className?: string
  onExpire?: () => void
}

function CountdownTimer({ target, className, onExpire }: CountdownTimerProps) {
  const [remaining, setRemaining] = useState(() => target - Date.now())
  const [tickKey, setTickKey] = useState(0)
  const expiredRef = useRef(false)

  useEffect(() => {
    const interval = setInterval(() => {
      const ms = target - Date.now()
      setRemaining(ms)
      setTickKey((k) => k + 1)
      if (ms <= 0 && !expiredRef.current) {
        expiredRef.current = true
        onExpire?.()
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [target, onExpire])

  const { days, hours, minutes, seconds } = formatCountdown(remaining)

  const blocks = [
    { value: padZero(days), label: 'D' },
    { value: padZero(hours), label: 'H' },
    { value: padZero(minutes), label: 'M' },
    { value: padZero(seconds), label: 'S' },
  ]

  return (
    <div className={clsx('flex items-center gap-1.5', className)}>
      {blocks.map((block, i) => (
        <div key={block.label} className="flex items-center gap-1.5">
          <div className="flex flex-col items-center">
            <div
              key={`${block.label}-${tickKey}`}
              className="flex items-center justify-center w-10 h-10 bg-bg-elevated border border-border-default rounded-md font-mono text-lg font-semibold text-text-primary animate-[countdownTick_300ms_cubic-bezier(0.34,1.56,0.64,1)]"
            >
              {block.value}
            </div>
            <span className="mt-1 text-[10px] text-text-tertiary font-medium">
              {block.label}
            </span>
          </div>
          {i < blocks.length - 1 && (
            <span className="text-text-tertiary font-mono text-lg mb-4">:</span>
          )}
        </div>
      ))}
    </div>
  )
}

export { CountdownTimer }
export type { CountdownTimerProps }
