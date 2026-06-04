import type { Metadata } from 'next'

import { VocabHeader } from '@/components/vocabulary/VocabHeader'
import { VocabSetList } from '@/components/vocabulary/VocabSetList'
import { WordLibraryBanner } from '@/components/vocabulary/WordLibraryBanner'

export const metadata: Metadata = {
  title: 'Từ vựng',
}

export default function VocabularyPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <VocabHeader />
      <WordLibraryBanner />
      <VocabSetList />
    </div>
  )
}
