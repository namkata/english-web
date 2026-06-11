'use client'

import { UserPlus, UserCheck } from 'lucide-react'

import { cn } from '@/lib/utils'
import { COMMUNITY_AUTHORS } from '@/lib/seed-data/community'
import { useCommunityStore } from '@/lib/stores/community-store'
import { useHasHydrated } from '@/lib/stores/learning-store'
import { CommunityFeed } from './CommunityFeed'

export function FollowingPanel() {
  const hydrated = useHasHydrated()
  const following = useCommunityStore(s => s.following)
  const toggleFollow = useCommunityStore(s => s.toggleFollow)

  if (!hydrated) return <div className="h-64 rounded-2xl bg-muted animate-pulse" />

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-semibold mb-3">Gợi ý theo dõi</h2>
        <div className="space-y-2">
          {COMMUNITY_AUTHORS.map(author => {
            const isFollowing = following.includes(author.id)
            return (
              <div key={author.id} className="flex items-center gap-3 rounded-2xl border bg-card p-3">
                <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-sm font-bold border border-brand-200">
                  {author.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{author.name}</span>
                    <span className="text-[11px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full">{author.level}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{author.bio}</p>
                </div>
                <button
                  onClick={() => toggleFollow(author.id)}
                  className={cn(
                    'flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors flex-shrink-0',
                    isFollowing ? 'text-muted-foreground hover:bg-muted' : 'text-primary border-primary hover:bg-primary/5',
                  )}
                >
                  {isFollowing ? <UserCheck size={13} /> : <UserPlus size={13} />}
                  {isFollowing ? 'Đang theo dõi' : 'Theo dõi'}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      <div>
        <h2 className="font-semibold mb-3">Bài từ người bạn theo dõi</h2>
        <CommunityFeed onlyFollowing />
      </div>
    </div>
  )
}
