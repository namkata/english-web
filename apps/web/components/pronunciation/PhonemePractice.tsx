'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Volume2, Play, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { apiClient } from '@/lib/api-client'

export function PhonemePractice() {
  const { data, isLoading } = useQuery({
    queryKey: ['pronunciation', 'phonemes'],
    queryFn: () => apiClient.pronunciation.getPhonemes(),
  })

  const [category, setCategory] = useState('vowels')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [showMouth, setShowMouth] = useState(false)
  const [attempted, setAttempted] = useState<Set<string>>(new Set())

  const categories = data?.categories ?? []
  const phonemes = (data?.phonemes?.[category] ?? []) as Array<{
    id: string
    symbol: string
    example: string
    exampleVi: string
    audioHint: string
    mouthPosition: string
  }>

  if (isLoading) return <div className="h-64 rounded-2xl bg-muted animate-pulse" />
  if (phonemes.length === 0) return <div className="text-muted-foreground">Không có dữ liệu âm.</div>

  const phoneme = (phonemes[currentIndex] ?? phonemes[0])!

  const handleNext = () => {
    setCurrentIndex(i => (i + 1) % phonemes.length)
    setShowHint(false)
    setShowMouth(false)
  }

  const handlePractice = () => {
    setAttempted(s => new Set(s).add(phoneme.id))
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {categories.map(c => (
          <button
            key={c.key}
            onClick={() => {
              setCategory(c.key)
              setCurrentIndex(0)
              setShowHint(false)
              setShowMouth(false)
            }}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-xl text-sm border transition-colors',
              category === c.key
                ? 'bg-brand-50 text-brand-700 border-brand-200'
                : 'bg-card border-border text-muted-foreground hover:border-muted-foreground',
            )}
          >
            {c.label}
            <span className="text-xs text-muted-foreground">({c.count})</span>
          </button>
        ))}
      </div>

      <div className="rounded-2xl border bg-card p-6 space-y-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            {currentIndex + 1}/{phonemes.length}
          </span>
          <span className="text-xs text-muted-foreground">{categories.find(c => c.key === category)?.label}</span>
          {attempted.has(phoneme.id) && (
            <span className="ml-auto text-xs text-green-600 flex items-center gap-1">
              <Volume2 size={12} /> Đã luyện
            </span>
          )}
        </div>

        <div className="text-center space-y-3">
          <div className="text-5xl font-bold font-mono text-primary">{phoneme.symbol}</div>
          <div className="text-lg font-medium">
            {phoneme.example} <span className="text-muted-foreground">— {phoneme.exampleVi}</span>
          </div>
        </div>

        <div className="space-y-2">
          {showHint && (
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
              <p className="text-sm text-blue-700">
                <span className="font-semibold">Gợi ý phát âm:</span> {phoneme.audioHint}
              </p>
            </div>
          )}
          {showMouth && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
              <p className="text-sm text-amber-700">
                <span className="font-semibold">Vị trí miệng:</span> {phoneme.mouthPosition}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => handlePractice()}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Play size={16} /> Nghe mẫu
          </button>
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm text-muted-foreground hover:bg-muted transition-colors"
          >
            {showHint ? 'Ẩn' : 'Gợi ý'} phát âm
          </button>
          <button
            onClick={() => setShowMouth(!showMouth)}
            className="flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm text-muted-foreground hover:bg-muted transition-colors"
          >
            {showMouth ? 'Ẩn' : 'Xem'} vị trí miệng
          </button>
          <button
            onClick={handlePractice}
            className="flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm text-muted-foreground hover:bg-muted transition-colors"
          >
            <Volume2 size={16} /> Đã luyện
          </button>
          <button
            onClick={handleNext}
            className="ml-auto flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm text-muted-foreground hover:bg-muted transition-colors"
          >
            <ArrowRight size={16} /> Âm tiếp theo
          </button>
        </div>
      </div>
    </div>
  )
}
