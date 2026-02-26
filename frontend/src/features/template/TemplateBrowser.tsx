import { useState } from 'react'
import type { Template } from '@/lib/types.ts'
import { mockTemplates } from '@/mocks/templates.ts'
import { TemplateCard } from './TemplateCard.tsx'

interface TemplateBrowserProps {
  selectedId: string | null
  onSelect: (template: Template) => void
}

export function TemplateBrowser({ selectedId, onSelect }: TemplateBrowserProps) {
  const [search, setSearch] = useState('')

  const filtered = mockTemplates.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center gap-2 px-1">
        <svg
          className="h-5 w-5 text-secondary-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
        </svg>
        <h3 className="text-base font-bold text-text-primary">Templates</h3>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search templates..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-md border border-border-default bg-bg-elevated px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-primary-500 transition-colors duration-150"
      />

      {/* Grid */}
      <div className="grid grid-cols-2 gap-2">
        {filtered.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            isSelected={selectedId === template.id}
            onApply={onSelect}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-8 text-center text-sm text-text-tertiary">
          No templates found
        </p>
      )}
    </div>
  )
}
