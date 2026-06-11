import type { Metadata } from 'next'

import { CommunityTabs } from '@/components/community/CommunityTabs'

export const metadata: Metadata = { title: 'Cộng đồng' }

export default function CommunityPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Cộng đồng</h1>
        <p className="text-muted-foreground mt-1 text-sm">Chia sẻ bài viết, đặt câu hỏi và thi đua cùng người học khác.</p>
      </div>
      <CommunityTabs />
    </div>
  )
}
