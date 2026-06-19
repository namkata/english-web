import type { Metadata } from 'next'
import { QuizHistoryDetail } from '@/components/quiz/QuizHistoryDetail'

interface Props {
  params: Promise<{ id: string }>
}

export const metadata: Metadata = { title: 'Chi tiết bài trắc nghiệm' }

export default async function QuizHistoryDetailPage({ params }: Props) {
  const { id } = await params
  return <QuizHistoryDetail id={id} />
}
