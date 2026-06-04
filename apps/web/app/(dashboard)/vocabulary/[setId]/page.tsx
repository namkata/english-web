import type { Metadata } from 'next'

import { VocabSetDetail } from '@/components/vocabulary/VocabSetDetail'

interface Props {
  params: Promise<{ setId: string }>
}

export const metadata: Metadata = { title: 'Bộ từ vựng' }

export default async function VocabSetPage({ params }: Props) {
  const { setId } = await params
  return <VocabSetDetail setId={setId} />
}
