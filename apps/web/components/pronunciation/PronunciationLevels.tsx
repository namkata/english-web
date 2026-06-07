'use client'

import { useState } from 'react'
import { AudioLines, BookOpen, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

import { PhonemePractice } from './PhonemePractice'
import { WordPractice } from './WordPractice'
import { SentencePractice } from './SentencePractice'

const LEVELS = [
  { key: 'phonemes', label: 'Âm đơn', icon: AudioLines, desc: 'Luyện từng âm cơ bản và âm khó' },
  { key: 'words', label: 'Từ vựng', icon: BookOpen, desc: 'Luyện từ chứa âm đã học' },
  { key: 'sentences', label: 'Câu hoàn chỉnh', icon: MessageSquare, desc: 'Luyện phát âm trong câu dài' },
]

export function PronunciationLevels() {
  const [activeLevel, setActiveLevel] = useState('phonemes')

  return (
    <div className="space-y-5">
      {/* Level Tabs */}
      <div className="flex gap-2">
        {LEVELS.map(({ key, label, icon: Icon }) => {
          const isActive = activeLevel === key
          return (
            <button
              key={key}
              onClick={() => setActiveLevel(key)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors border',
                isActive
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card border-border hover:border-muted-foreground text-muted-foreground',
              )}
            >
              <Icon size={16} />
              {label}
            </button>
          )
        })}
      </div>

      {/* Active Level Content */}
      {activeLevel === 'phonemes' && <PhonemePractice />}
      {activeLevel === 'words' && <WordPractice />}
      {activeLevel === 'sentences' && <SentencePractice />}
    </div>
  )
}
