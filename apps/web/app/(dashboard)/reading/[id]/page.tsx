import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PassageExercise } from '@/components/reading/PassageExercise'
import { apiClient } from '@/lib/api-client'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  try {
    const passage = await apiClient.reading.getPassage(id)
    return { title: passage.title }
  } catch {
    return { title: 'Bài đọc' }
  }
}

export default async function PassagePage({ params }: Props) {
  const { id } = await params
  const passage = await apiClient.reading.getPassage(id).catch(() => null)
  if (!passage) notFound()

  return <PassageExercise passage={passage} />
}
