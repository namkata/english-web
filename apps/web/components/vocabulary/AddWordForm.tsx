'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, CheckCircle2 } from 'lucide-react'

import { useLearningStore } from '@/lib/stores/learning-store'
import { PART_OF_SPEECH_OPTIONS } from '@/lib/vocab'

const EMPTY = {
  word: '',
  phoneticUk: '',
  phoneticUs: '',
  partOfSpeech: 'noun',
  definition: '',
  exampleSentence: '',
}

/** Form to add a personal word to the learner's word bank. */
export function AddWordForm() {
  const addCustomWord = useLearningStore(s => s.addCustomWord)
  const [form, setForm] = useState(EMPTY)
  const [saved, setSaved] = useState(false)

  const set = (key: keyof typeof EMPTY, value: string) => setForm(f => ({ ...f, [key]: value }))
  const canSave = form.word.trim() && form.definition.trim()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSave) return
    addCustomWord({
      word: form.word.trim(),
      phoneticUk: form.phoneticUk.trim(),
      phoneticUs: form.phoneticUs.trim(),
      partOfSpeech: form.partOfSpeech,
      definition: form.definition.trim(),
      exampleSentence: form.exampleSentence.trim(),
    })
    setSaved(true)
    setForm(EMPTY)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Link href="/vocabulary" className="p-2 rounded-xl hover:bg-muted transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Thêm từ mới</h1>
          <p className="text-sm text-muted-foreground">Lưu vào thư viện từ vựng cá nhân của bạn.</p>
        </div>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          <CheckCircle2 size={16} />
          Đã lưu từ vào thư viện.{' '}
          <Link href="/vocabulary/library" className="font-medium underline">
            Xem thư viện
          </Link>
        </div>
      )}

      <form onSubmit={handleSubmit} className="rounded-2xl border bg-card p-6 space-y-4">
        <div>
          <label className="text-sm font-medium">Từ tiếng Anh *</label>
          <input
            value={form.word}
            onChange={e => set('word', e.target.value)}
            placeholder="ví dụ: accomplish"
            className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Phiên âm UK</label>
            <input
              value={form.phoneticUk}
              onChange={e => set('phoneticUk', e.target.value)}
              placeholder="/əˈkʌm.plɪʃ/"
              className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Phiên âm US</label>
            <input
              value={form.phoneticUs}
              onChange={e => set('phoneticUs', e.target.value)}
              placeholder="/əˈkɑːm.plɪʃ/"
              className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Loại từ</label>
          <select
            value={form.partOfSpeech}
            onChange={e => set('partOfSpeech', e.target.value)}
            className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
          >
            {PART_OF_SPEECH_OPTIONS.map(p => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Nghĩa tiếng Việt *</label>
          <input
            value={form.definition}
            onChange={e => set('definition', e.target.value)}
            placeholder="hoàn thành, đạt được"
            className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Câu ví dụ</label>
          <textarea
            value={form.exampleSentence}
            onChange={e => set('exampleSentence', e.target.value)}
            placeholder="She accomplished her goal."
            className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring min-h-[80px] resize-y"
          />
        </div>

        <button
          type="submit"
          disabled={!canSave}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          <Plus size={16} /> Lưu từ
        </button>
      </form>
    </div>
  )
}
