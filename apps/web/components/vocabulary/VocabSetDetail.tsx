'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, List, Layers, Sparkles } from 'lucide-react'

import { apiClient } from '@/lib/api-client'
import { cn } from '@/lib/utils'
import type { VocabWordItem } from '@/lib/vocab'
import { useLearningStore, useHasHydrated, type WordStatus } from '@/lib/stores/learning-store'
import { Flashcard } from './Flashcard'
import { ReviewSession } from './ReviewSession'

type Tab = 'list' | 'flashcard' | 'review'

const STATUS_BADGE: Record<WordStatus, { label: string; className: string }> = {
  new: { label: 'Mới', className: 'bg-muted text-muted-foreground' },
  learning: { label: 'Đang học', className: 'bg-amber-100 text-amber-700' },
  learned: { label: 'Đã thuộc', className: 'bg-green-100 text-green-700' },
}

function StatusBadge({ wordId }: { wordId: string }) {
  const hydrated = useHasHydrated()
  const statusOf = useLearningStore(s => s.statusOf)
  const status = hydrated ? statusOf(wordId) : 'new'
  const badge = STATUS_BADGE[status]
  return <span className={cn('text-[11px] px-2 py-0.5 rounded-full font-medium', badge.className)}>{badge.label}</span>
}

export function VocabSetDetail({ setId }: { setId: string }) {
  const [tab, setTab] = useState<Tab>('list')

  const { data, isLoading } = useQuery({
    queryKey: ['vocabulary', 'words', setId],
    queryFn: () => apiClient.vocabulary.getSetWords(setId),
  })

  const words = (data?.items ?? []) as unknown as VocabWordItem[]

  const tabs: Array<{ value: Tab; label: string; icon: typeof List }> = [
    { value: 'list', label: 'Danh sách', icon: List },
    { value: 'flashcard', label: 'Flashcard', icon: Layers },
    { value: 'review', label: 'Ôn tập', icon: Sparkles },
  ]

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Link href="/vocabulary" className="p-2 rounded-xl hover:bg-muted transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Từ vựng</h1>
          <p className="text-sm text-muted-foreground">{words.length} từ trong bộ</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex rounded-xl border bg-card p-1">
        {tabs.map(t => {
          const Icon = t.icon
          return (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors',
                tab === t.value ? 'bg-primary text-primary-foreground' : 'hover:bg-muted',
              )}
            >
              <Icon size={15} /> {t.label}
            </button>
          )
        })}
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 rounded-2xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : tab === 'list' ? (
        <div className="space-y-3">
          {words.map(word => (
            <div key={word.id} className="rounded-2xl border bg-card p-4 flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold">{word.word}</span>
                  {word.phoneticUk && <span className="text-xs text-muted-foreground">UK {word.phoneticUk}</span>}
                  {word.phoneticUs && <span className="text-xs text-muted-foreground">US {word.phoneticUs}</span>}
                  <StatusBadge wordId={word.id} />
                </div>
                <p className="text-sm text-muted-foreground italic mt-0.5">
                  ({word.partOfSpeech}) {word.definition}
                </p>
                <p className="text-sm mt-1">{word.exampleSentence}</p>
              </div>
            </div>
          ))}
        </div>
      ) : tab === 'flashcard' ? (
        <Flashcard words={words} />
      ) : (
        <ReviewSession words={words} />
      )}
    </div>
  )
}
