import type { Metadata } from 'next'

import { GrammarHeader } from '@/components/grammar/GrammarHeader'
import { GrammarModeSelector } from '@/components/grammar/GrammarModeSelector'

export const metadata: Metadata = {
  title: 'Ngữ pháp & Cấu trúc',
}

export default function GrammarPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <GrammarHeader />
      <GrammarModeSelector />
    </div>
  )
}
