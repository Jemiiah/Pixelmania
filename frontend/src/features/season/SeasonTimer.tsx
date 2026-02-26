import { useEffect, useRef } from 'react'
import { clsx } from 'clsx'
import { useSeasonStore } from '@/stores/seasonStore.ts'
import { formatCountdown, padZero } from '@/lib/format.ts'

const DAY_MS = 86_400_000
const HOUR_MS = 3_600_000

function TimeBox({ value, label, urgency }: { value: string; label: string; urgency: 'normal' | 'amber' | 'red' }) {
  const prevValue = useRef(value)
  const shouldTick = prevValue.current !== value
  prevValue.current = value

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={clsx(
          'flex h-10 w-10 items-center justify-center rounded-md border font-mono text-lg font-semibold',
          shouldTick && 'animate-countdown-tick',
          urgency === 'normal' && 'border-border-default bg-bg-surface text-text-primary',
          urgency === 'amber' && 'border-tertiary-600 bg-tertiary-900 text-tertiary-400',
          urgency === 'red' && 'border-danger-600 bg-danger-900 text-danger-400',
        )}
      >
        {value}
      </div>
      <span className="text-[10px] uppercase tracking-wider text-text-tertiary">{label}</span>
    </div>
  )
}

export function SeasonTimer() {
  const timeRemaining = useSeasonStore((s) => s.timeRemaining)
  const tickTimer = useSeasonStore((s) => s.tickTimer)

  useEffect(() => {
    const interval = setInterval(tickTimer, 1000)
    return () => clearInterval(interval)
  }, [tickTimer])

  const { days, hours, minutes, seconds } = formatCountdown(timeRemaining)

  const urgency: 'normal' | 'amber' | 'red' =
    timeRemaining < HOUR_MS ? 'red' : timeRemaining < DAY_MS ? 'amber' : 'normal'

  return (
    <div className="flex items-center gap-2" aria-label="Season countdown timer">
      <TimeBox value={padZero(days)} label="D" urgency={urgency} />
      <span className="text-text-tertiary">:</span>
      <TimeBox value={padZero(hours)} label="H" urgency={urgency} />
      <span className="text-text-tertiary">:</span>
      <TimeBox value={padZero(minutes)} label="M" urgency={urgency} />
      <span className="text-text-tertiary">:</span>
      <TimeBox value={padZero(seconds)} label="S" urgency={urgency} />
    </div>
  )
}
