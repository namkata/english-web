import type { Metadata } from 'next'

import { ReadingHeader } from '@/components/reading/ReadingHeader'
import { AIGenerateCard } from '@/components/reading/AIGenerateCard'
import { LevelFilter } from '@/components/reading/LevelFilter'
import { PassageGrid } from '@/components/reading/PassageGrid'

export const metadata: Metadata = {
  title: 'Đọc hiểu',
}

export default function ReadingPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <ReadingHeader />
      <AIGenerateCard />
      <LevelFilter />
      <PassageGrid />
    </div>
  )
}
