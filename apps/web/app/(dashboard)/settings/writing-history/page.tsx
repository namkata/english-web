import type { Metadata } from 'next'

import { WritingHistorySettings } from '@/components/settings/WritingHistorySettings'

export const metadata: Metadata = { title: 'Cài đặt · Lịch sử bài viết' }

export default function WritingHistoryPage() {
  return <WritingHistorySettings />
}
