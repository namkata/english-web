import type { Metadata } from 'next'

import { FollowingPanel } from '@/components/community/FollowingPanel'

export const metadata: Metadata = { title: 'Cài đặt · Theo dõi' }

export default function FollowingSettingsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Theo dõi</h1>
        <p className="text-sm text-muted-foreground">Quản lý người bạn theo dõi và xem bài viết của họ.</p>
      </div>
      <FollowingPanel />
    </div>
  )
}
