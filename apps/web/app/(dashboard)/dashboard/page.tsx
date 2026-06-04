import type { Metadata } from 'next'

import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { XPProgress } from '@/components/dashboard/XPProgress'
import { ActivityHeatmap } from '@/components/dashboard/ActivityHeatmap'
import { DailyChallenges } from '@/components/dashboard/DailyChallenges'
import { WeeklyRanking } from '@/components/dashboard/WeeklyRanking'
import { LearningModules } from '@/components/dashboard/LearningModules'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <DashboardHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: XP + Activity */}
        <div className="lg:col-span-2 space-y-4">
          <XPProgress />
          <ActivityHeatmap />
        </div>

        {/* Right: Challenges + Ranking */}
        <div className="space-y-4">
          <DailyChallenges />
          <WeeklyRanking />
        </div>
      </div>

      <LearningModules />
    </div>
  )
}
