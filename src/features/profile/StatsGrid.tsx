import type { User } from '@/lib/types.ts'
import { formatNumber, formatGDollars } from '@/lib/format.ts'

interface StatsGridProps {
  user: User
}

function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

function StatsGrid({ user }: StatsGridProps) {
  const stats = [
    {
      label: 'Pixels Placed',
      value: formatNumber(user.pixelsPlaced),
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="6" height="6" rx="1" />
          <rect x="11" y="3" width="6" height="6" rx="1" />
          <rect x="3" y="11" width="6" height="6" rx="1" />
          <rect x="11" y="11" width="6" height="6" rx="1" />
        </svg>
      ),
      accent: 'text-primary-400',
    },
    {
      label: 'G$ Spent',
      value: formatGDollars(user.gSpent),
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="10" cy="10" r="7" />
          <path d="M10 6v8M7.5 8.5h3.75a1.25 1.25 0 010 2.5H7.5h3.75a1.25 1.25 0 010 2.5H7.5" />
        </svg>
      ),
      accent: 'text-tertiary-400',
    },
    {
      label: 'NFTs Owned',
      value: String(user.nftsOwned),
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="14" height="14" rx="2" />
          <circle cx="7.5" cy="7.5" r="1.5" />
          <path d="M3 13l4-4 3 3 2-2 5 5" />
        </svg>
      ),
      accent: 'text-secondary-400',
    },
    {
      label: 'Current Rank',
      value: ordinal(user.rank),
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 2l2.5 5 5.5.8-4 3.9.9 5.3L10 14.5 5.1 17l.9-5.3-4-3.9 5.5-.8z" />
        </svg>
      ),
      accent: 'text-danger-400',
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-bg-surface border border-border-default rounded-lg p-4"
        >
          <div className={`mb-2 ${stat.accent}`}>{stat.icon}</div>
          <p className="text-xl font-bold text-text-primary">{stat.value}</p>
          <p className="text-xs text-text-secondary mt-0.5">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}

export { StatsGrid }
