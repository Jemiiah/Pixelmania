import { useLeaderboardStore } from '@/stores/leaderboardStore.ts'
import { Tabs } from '@/components/ui/Tabs.tsx'

const filterTabs = [
  { id: 'season', label: 'Season', content: null },
  { id: 'allTime', label: 'All Time', content: null },
  { id: '24h', label: '24h', content: null },
]

export function LeaderboardFilters() {
  const filter = useLeaderboardStore((s) => s.filter)
  const setFilter = useLeaderboardStore((s) => s.setFilter)

  return (
    <Tabs
      tabs={filterTabs}
      activeTab={filter}
      onTabChange={(id) => setFilter(id as 'season' | 'allTime' | '24h')}
      className="[&>div:last-child]:pt-0"
    />
  )
}
