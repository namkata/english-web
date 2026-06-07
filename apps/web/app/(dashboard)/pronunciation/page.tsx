import type { Metadata } from 'next'

import { PronunciationHeader } from '@/components/pronunciation/PronunciationHeader'
import { PronunciationLevels } from '@/components/pronunciation/PronunciationLevels'

export const metadata: Metadata = {
  title: 'Luyện phát âm',
}

export default function PronunciationPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PronunciationHeader />
      <PronunciationLevels />
    </div>
  )
}
