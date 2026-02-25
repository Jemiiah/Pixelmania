import { useState, useRef, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'
import clsx from 'clsx'

interface Tab {
  id: string
  label: ReactNode
  content: ReactNode
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  activeTab?: string
  onTabChange?: (id: string) => void
  className?: string
}

function Tabs({
  tabs,
  defaultTab,
  activeTab: controlledActive,
  onTabChange,
  className,
}: TabsProps) {
  const [internalActive, setInternalActive] = useState(
    defaultTab ?? tabs[0]?.id ?? '',
  )
  const active = controlledActive ?? internalActive
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map())
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })

  const updateIndicator = useCallback(() => {
    const el = tabRefs.current.get(active)
    if (el) {
      const parent = el.parentElement
      if (parent) {
        setIndicator({
          left: el.offsetLeft - parent.offsetLeft,
          width: el.offsetWidth,
        })
      }
    }
  }, [active])

  useEffect(() => {
    updateIndicator()
  }, [updateIndicator])

  const handleTabClick = (id: string) => {
    if (controlledActive === undefined) setInternalActive(id)
    onTabChange?.(id)
  }

  const activeContent = tabs.find((t) => t.id === active)?.content

  return (
    <div className={className}>
      <div className="relative flex border-b border-border-subtle">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={(el) => {
              if (el) tabRefs.current.set(tab.id, el)
            }}
            onClick={() => handleTabClick(tab.id)}
            className={clsx(
              'px-4 py-2.5 text-sm font-medium transition-colors duration-150',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              active === tab.id
                ? 'text-primary-500'
                : 'text-text-secondary hover:text-text-primary',
            )}
          >
            {tab.label}
          </button>
        ))}
        <div
          className="absolute bottom-0 h-0.5 bg-primary-500 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ left: indicator.left, width: indicator.width }}
        />
      </div>
      <div className="pt-4">{activeContent}</div>
    </div>
  )
}

export { Tabs }
export type { TabsProps, Tab }
