import type { Metadata } from 'next'
import { ReadingHistory } from '@/components/reading/ReadingHistory'

export const metadata: Metadata = { title: 'Lịch sử đọc hiểu' }

export default function ReadingHistoryPage() {
  return <ReadingHistory />
}
