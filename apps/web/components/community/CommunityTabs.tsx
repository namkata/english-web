'use client'

import { useState } from 'react'
import { Newspaper, Trophy, Users } from 'lucide-react'

import { cn } from '@/lib/utils'
import { CommunityFeed } from './CommunityFeed'
import { Leaderboard } from './Leaderboard'
import { FollowingPanel } from './FollowingPanel'

type Tab = 'feed' | 'leaderboard' | 'following'

const TABS: Array<{ value: Tab; label: string; icon: typeof Newspaper }> = [
  { value: 'feed', label: 'Bảng tin', icon: Newspaper },
  { value: 'leaderboard', label: 'Xếp hạng', icon: Trophy },
  { value: 'following', label: 'Theo dõi', icon: Users },
]

export function CommunityTabs() {
  const [tab, setTab] = useState<Tab>('feed')

  return (
    <div className="space-y-6">
      <div className="flex rounded-xl border bg-card p-1">
        {TABS.map(t => {
          const Icon = t.icon
          return (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors',
                tab === t.value ? 'bg-primary text-primary-foreground' : 'hover:bg-muted',
              )}
            >
              <Icon size={15} /> {t.label}
            </button>
          )
        })}
      </div>

      {tab === 'feed' && <CommunityFeed />}
      {tab === 'leaderboard' && <Leaderboard />}
      {tab === 'following' && <FollowingPanel />}
    </div>
  )
}
