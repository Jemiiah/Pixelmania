import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import { useUIStore } from '@/stores/uiStore'
import { WalletStatus } from '@/features/wallet/WalletStatus'
import { ROUTES } from '@/lib/constants'

const navLinks = [
  { label: 'Canvas', to: ROUTES.CANVAS },
  { label: 'Leaderboard', to: ROUTES.LEADERBOARD },
  { label: 'Gallery', to: ROUTES.GALLERY },
]

function Header() {
  const location = useLocation()
  const { toggleSidebar, isMobile } = useUIStore()

  return (
    <header className="fixed top-0 left-0 right-0 z-[20] h-14 glass flex items-center px-4 gap-4">
      {/* Gradient bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 shrink-0 group">
        <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500/30 to-secondary-500/20 border border-primary-500/30 flex items-center justify-center overflow-hidden group-hover:shadow-glow-primary transition-shadow duration-300">
          <div className="w-3 h-3 bg-primary-500 rounded-sm shadow-[0_0_12px_rgba(0,230,118,0.6)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-500/10 to-transparent" />
        </div>
        <span className="text-lg font-bold text-text-primary tracking-tight">
          Pixel
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-500 drop-shadow-[0_0_12px_rgba(0,230,118,0.5)]">
            mania
          </span>
        </span>
      </Link>

      {/* Desktop Nav */}
      {!isMobile && (
        <nav className="flex-1 flex items-center justify-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={clsx(
                'px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150',
                location.pathname === link.to
                  ? 'text-primary-500 bg-primary-500/10'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated',
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}

      <div className="flex items-center gap-2 ml-auto">
        <WalletStatus />

        {/* Sidebar toggle (desktop only) */}
        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors duration-150"
            aria-label="Toggle sidebar"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <rect x="1" y="1" width="16" height="16" rx="3" />
              <line x1="11" y1="1" x2="11" y2="17" />
            </svg>
          </button>
        )}
      </div>
    </header>
  )
}

export { Header }
