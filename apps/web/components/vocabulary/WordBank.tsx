'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search, Plus, Trash2 } from 'lucide-react'

import { cn } from '@/lib/utils'
import { getAllSeedWords, type VocabWordWithSet } from '@/lib/vocab'
import { useLearningStore, useHasHydrated, type WordStatus } from '@/lib/stores/learning-store'

type Filter = 'all' | WordStatus

const FILTERS: Array<{ value: Filter; label: string }> = [
  { value: 'all', label: 'Tất cả' },
  { value: 'new', label: 'Mới' },
  { value: 'learning', label: 'Đang học' },
  { value: 'learned', label: 'Đã thuộc' },
]

const STATUS_BADGE: Record<WordStatus, { label: string; className: string }> = {
  new: { label: 'Mới', className: 'bg-muted text-muted-foreground' },
  learning: { label: 'Đang học', className: 'bg-amber-100 text-amber-700' },
  learned: { label: 'Đã thuộc', className: 'bg-green-100 text-green-700' },
}

/**
 * Personal dictionary aggregating every seeded word plus the learner's own
 * custom words, with full-text search and status filtering.
 */
export function WordBank() {
  const hydrated = useHasHydrated()
  const statusOf = useLearningStore(s => s.statusOf)
  const customWords = useLearningStore(s => s.customWords)
  const removeCustomWord = useLearningStore(s => s.removeCustomWord)

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<Filter>('all')

  const allWords = useMemo<Array<VocabWordWithSet & { custom?: boolean }>>(() => {
    const seed = getAllSeedWords()
    const custom = customWords.map(w => ({
      id: w.id,
      word: w.word,
      phoneticUk: w.phoneticUk,
      phoneticUs: w.phoneticUs,
      partOfSpeech: w.partOfSpeech,
      definition: w.definition,
      exampleSentence: w.exampleSentence,
      setId: 'custom',
      setName: 'Của tôi',
      level: '—',
      custom: true,
    }))
    return [...custom, ...seed]
  }, [customWords])

  const counts = useMemo(() => {
    const c: Record<WordStatus, number> = { new: 0, learning: 0, learned: 0 }
    if (hydrated) for (const w of allWords) c[statusOf(w.id)] += 1
    return c
  }, [allWords, statusOf, hydrated])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return allWords.filter(w => {
      if (q && !w.word.toLowerCase().includes(q) && !w.definition.toLowerCase().includes(q)) return false
      if (filter !== 'all' && hydrated && statusOf(w.id) !== filter) return false
      return true
    })
  }, [allWords, search, filter, statusOf, hydrated])

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Link href="/vocabulary" className="p-2 rounded-xl hover:bg-muted transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Thư viện từ vựng</h1>
          <p className="text-sm text-muted-foreground">
            {allWords.length} từ · {hydrated ? `${counts.learned} đã thuộc, ${counts.learning} đang học` : 'đang tải tiến độ...'}
          </p>
        </div>
        <Link
          href="/vocabulary/add"
          className="flex items-center gap-1.5 bg-primary text-primary-foreground rounded-xl px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus size={16} /> Thêm từ
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Tìm từ hoặc nghĩa..."
          className="w-full rounded-xl border border-input bg-background pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Status filter */}
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              'px-3 py-1.5 rounded-full text-sm font-medium border transition-colors',
              filter === f.value ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-muted',
            )}
          >
            {f.label}
            {f.value !== 'all' && hydrated && (
              <span className="ml-1.5 opacity-70">{counts[f.value as WordStatus]}</span>
            )}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">Không tìm thấy từ nào.</p>
      ) : (
        <div className="space-y-2">
          {filtered.map(word => {
            const status = hydrated ? statusOf(word.id) : 'new'
            const badge = STATUS_BADGE[status]
            return (
              <div key={word.id} className="rounded-2xl border bg-card p-4 flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold">{word.word}</span>
                    {word.phoneticUk && <span className="text-xs text-muted-foreground">UK {word.phoneticUk}</span>}
                    <span className={cn('text-[11px] px-2 py-0.5 rounded-full font-medium', badge.className)}>{badge.label}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{word.setName}</span>
                  </div>
                  <p className="text-sm text-muted-foreground italic mt-0.5">
                    ({word.partOfSpeech}) {word.definition}
                  </p>
                  {word.exampleSentence && <p className="text-sm mt-1">{word.exampleSentence}</p>}
                </div>
                {word.custom && (
                  <button
                    onClick={() => removeCustomWord(word.id)}
                    className="p-2 rounded-lg text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-colors"
                    aria-label="Xóa từ"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
