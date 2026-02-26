import { useState } from 'react'
import clsx from 'clsx'
import { useUIStore } from '@/stores/uiStore'
import { LeaderboardPanel } from '@/features/leaderboard/LeaderboardPanel'
import { VotingPanel } from '@/features/voting/VotingPanel'
import { TemplateBrowser } from '@/features/template/TemplateBrowser'
import type { SidebarPanel } from '@/lib/types'
import type { Template } from '@/lib/types'

const panels: { id: SidebarPanel; label: string }[] = [
  { id: 'leaderboard', label: 'Leaderboard' },
  { id: 'voting', label: 'Voting' },
  { id: 'templates', label: 'Templates' },
]

function Sidebar() {
  const { sidebarOpen, sidebarPanel, setSidebarPanel, isMobile } = useUIStore()
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null)

  if (isMobile) return null

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplateId(template.id === selectedTemplateId ? null : template.id)
  }

  return (
    <aside
      className={clsx(
        'fixed top-14 right-0 bottom-0 w-80 z-[10]',
        'bg-gradient-to-b from-bg-surface to-bg-base border-l border-border-subtle',
        'transition-transform duration-300 ease-[cubic-bezier(0,0,0.2,1)]',
        sidebarOpen ? 'translate-x-0' : 'translate-x-full',
      )}
    >
      {/* Tab bar */}
      <div className="flex border-b border-border-subtle">
        {panels.map((panel) => (
          <button
            key={panel.id}
            onClick={() => setSidebarPanel(panel.id)}
            className={clsx(
              'flex-1 px-3 py-3 text-xs font-medium transition-colors duration-150',
              sidebarPanel === panel.id
                ? 'text-primary-500 border-b-2 border-primary-500'
                : 'text-text-secondary hover:text-text-primary',
            )}
          >
            {panel.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 overflow-y-auto h-[calc(100%-45px)]">
        {sidebarPanel === 'leaderboard' && <LeaderboardPanel />}
        {sidebarPanel === 'voting' && <VotingPanel />}
        {sidebarPanel === 'templates' && (
          <TemplateBrowser
            selectedId={selectedTemplateId}
            onSelect={handleTemplateSelect}
          />
        )}
      </div>
    </aside>
  )
}

export { Sidebar }
