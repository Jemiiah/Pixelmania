import { useEffect } from 'react'
import { useProfileStore } from '@/stores/profileStore.ts'
import { generateAvatarColor } from '@/lib/color-utils.ts'
import { formatDate } from '@/lib/format.ts'
import { StatsGrid } from '@/features/profile/StatsGrid.tsx'
import { ActivityFeed } from '@/features/profile/ActivityFeed.tsx'

function UserProfile() {
  const user = useProfileStore((s) => s.user)
  const activity = useProfileStore((s) => s.activity)
  const isLoading = useProfileStore((s) => s.isLoading)
  const loadProfile = useProfileStore((s) => s.loadProfile)
  const loadActivity = useProfileStore((s) => s.loadActivity)

  useEffect(() => {
    if (!user) {
      loadProfile()
      loadActivity()
    }
  }, [user, loadProfile, loadActivity])

  if (isLoading || !user) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full skeleton" />
          <div className="space-y-2">
            <div className="h-5 w-32 skeleton rounded" />
            <div className="h-3 w-48 skeleton rounded" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 skeleton rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  const avatarColor = generateAvatarColor(user.address)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white shrink-0"
          style={{ backgroundColor: avatarColor }}
        >
          {user.username.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <h1 className="text-xl font-bold text-text-primary">{user.username}</h1>
          <p className="text-xs font-mono text-text-secondary truncate">
            {user.address}
          </p>
          <p className="text-xs text-text-tertiary mt-0.5">
            Joined {formatDate(user.joinedAt)}
          </p>
        </div>
      </div>

      <StatsGrid user={user} />

      {activity.length > 0 && <ActivityFeed activity={activity} />}
    </div>
  )
}

export { UserProfile }
