'use client'

import { useState } from 'react'
import { Languages, PenTool, Layers } from 'lucide-react'
import { cn } from '@/lib/utils'

import { VocabPractice } from './VocabPractice'
import { FillInBlank } from './FillInBlank'
import { StructurePractice } from './StructurePractice'

const MODES = [
  { key: 'vocab', label: 'Từ vựng Vi↔En', icon: Languages, desc: 'Dịch câu và nhập từ vựng mục tiêu' },
  { key: 'fill-in-blank', label: 'Điền từ trống', icon: PenTool, desc: 'Điền từ/cấu trúc còn thiếu trong câu' },
  { key: 'structure', label: 'Cấu trúc câu', icon: Layers, desc: 'Sắp xếp và phân tích cấu trúc câu' },
]

export function GrammarModeSelector() {
  const [activeMode, setActiveMode] = useState('vocab')

  return (
    <div className="space-y-5">
      {/* Mode Tabs */}
      <div className="flex gap-2">
        {MODES.map(({ key, label, icon: Icon }) => {
          const isActive = activeMode === key
          return (
            <button
              key={key}
              onClick={() => setActiveMode(key)}
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

      {/* Active Mode Content */}
      {activeMode === 'vocab' && <VocabPractice />}
      {activeMode === 'fill-in-blank' && <FillInBlank />}
      {activeMode === 'structure' && <StructurePractice />}
    </div>
  )
}
