import { useEffect } from 'react'
import type { ReactNode } from 'react'
import clsx from 'clsx'
import { useUIStore } from '@/stores/uiStore'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { MobileNav } from './MobileNav'

interface AppShellProps {
  children: ReactNode
}

function AppShell({ children }: AppShellProps) {
  const { sidebarOpen, isMobile, setIsMobile } = useUIStore()

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [setIsMobile])

  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <Header />
      <Sidebar />
      <main
        className={clsx(
          'pt-14 transition-[margin] duration-300 ease-[cubic-bezier(0,0,0.2,1)]',
          !isMobile && sidebarOpen ? 'mr-80' : 'mr-0',
          isMobile && 'pb-16',
        )}
      >
        {children}
      </main>
      <MobileNav />
    </div>
  )
}

export { AppShell }
export type { AppShellProps }
