import type { Metadata } from 'next'

import { WordBank } from '@/components/vocabulary/WordBank'

export const metadata: Metadata = { title: 'Thư viện từ vựng' }

export default function WordLibraryPage() {
  return <WordBank />
}
