import type { ActivityItem } from '@/lib/types.ts'
import { formatTimeAgo } from '@/lib/format.ts'

interface ActivityFeedProps {
  activity: ActivityItem[]
}

function activityDescription(item: ActivityItem): string {
  switch (item.type) {
    case 'pixel_placed':
      return `Placed pixel at (${item.data.x}, ${item.data.y}) with ${item.data.colorName}`
    case 'vote_cast':
      return `Voted for region ${item.data.regionId}`
    case 'nft_minted':
      return `Minted NFT from Season ${item.data.seasonId}`
    case 'season_joined':
      return `Joined Season ${item.data.seasonId}`
  }
}

function activityIcon(type: ActivityItem['type']) {
  switch (type) {
    case 'pixel_placed':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <rect x="4" y="4" width="8" height="8" rx="1" />
        </svg>
      )
    case 'vote_cast':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 8l3 3 5-5" />
        </svg>
      )
    case 'nft_minted':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <rect x="2" y="2" width="12" height="12" rx="2" />
          <path d="M5 11l2-3 2 2 2-3" />
        </svg>
      )
    case 'season_joined':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M8 3v10M3 8h10" />
        </svg>
      )
  }
}

const typeColors: Record<ActivityItem['type'], string> = {
  pixel_placed: 'text-primary-400 bg-primary-500/10',
  vote_cast: 'text-secondary-400 bg-secondary-500/10',
  nft_minted: 'text-tertiary-400 bg-tertiary-500/10',
  season_joined: 'text-danger-400 bg-danger-500/10',
}

function ActivityFeed({ activity }: ActivityFeedProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-base font-semibold text-text-primary">
        Recent Activity
      </h3>
      <div className="relative max-h-80 overflow-y-auto space-y-2">
        {activity.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 p-2 rounded-md hover:bg-bg-elevated/50 transition-colors duration-150"
          >
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${typeColors[item.type]}`}
            >
              {activityIcon(item.type)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-text-primary">
                {activityDescription(item)}
              </p>
              <p className="text-xs text-text-tertiary">
                {formatTimeAgo(item.timestamp)}
              </p>
            </div>
          </div>
        ))}
        <div className="sticky bottom-0 h-8 bg-gradient-to-t from-bg-base to-transparent pointer-events-none" />
      </div>
    </div>
  )
}

export { ActivityFeed }
