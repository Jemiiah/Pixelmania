import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import { useUIStore } from '@/stores/uiStore'
import { ROUTES } from '@/lib/constants'

const tabs = [
  {
    label: 'Canvas',
    to: ROUTES.CANVAS,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="16" height="16" rx="2" />
        <rect x="6" y="6" width="3" height="3" fill="currentColor" stroke="none" />
        <rect x="11" y="6" width="3" height="3" fill="currentColor" stroke="none" />
        <rect x="6" y="11" width="3" height="3" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Leaderboard',
    to: ROUTES.LEADERBOARD,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="10" width="4" height="8" rx="1" />
        <rect x="8" y="4" width="4" height="14" rx="1" />
        <rect x="14" y="7" width="4" height="11" rx="1" />
      </svg>
    ),
  },
  {
    label: 'Gallery',
    to: ROUTES.GALLERY,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="7" height="7" rx="1.5" />
        <rect x="11" y="2" width="7" height="7" rx="1.5" />
        <rect x="2" y="11" width="7" height="7" rx="1.5" />
        <rect x="11" y="11" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    label: 'Profile',
    to: ROUTES.PROFILE,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="10" cy="7" r="3.5" />
        <path d="M3 17.5c0-3.5 3.134-6 7-6s7 2.5 7 6" />
      </svg>
    ),
  },
]

function MobileNav() {
  const location = useLocation()
  const { isMobile } = useUIStore()

  if (!isMobile) return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[20] glass">
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const active = location.pathname === tab.to
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={clsx(
                'flex flex-col items-center gap-0.5 px-3 py-1.5 transition-colors duration-150',
                active
                  ? 'text-primary-500'
                  : 'text-text-tertiary hover:text-text-secondary',
              )}
            >
              {tab.icon}
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export { MobileNav }
