import type { Metadata } from 'next'
import { WritingHistoryDetail } from '@/components/writing/WritingHistoryDetail'

interface Props {
  params: Promise<{ id: string }>
}

export const metadata: Metadata = { title: 'Chi tiết bài viết' }

export default async function WritingHistoryDetailPage({ params }: Props) {
  const { id } = await params
  return <WritingHistoryDetail id={id} />
}
