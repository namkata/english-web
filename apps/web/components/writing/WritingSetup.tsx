'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, RefreshCw, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'


const DIFFICULTIES = [
  { value: 'easy', label: 'Vừa sức', time: '15–20 phút', desc: '3–6 câu, nội dung gần gũi, từ vựng quen thuộc' },
  { value: 'medium', label: 'Nâng dần', time: '20–30 phút', desc: '4–7 câu, cấu trúc đa dạng hơn, có thêm thử thách' },
  { value: 'hard', label: 'Thử thách', time: '30–40 phút', desc: '5–7 câu, ý phức tạp hơn, câu dài hơn, từ vựng khó hơn' },
]

const DEFAULT_TOPICS = ['At the dentist', 'Travel plans', 'At the airport', 'Festivals in Vietnam', 'School supplies', 'My best friend']

const MODES = [
  { value: 'sentence_writing', label: 'Luyện viết từng câu', desc: 'AI tạo đoạn văn theo topic, bạn viết lại từng câu và nhận chấm điểm chi tiết.' },
  { value: 'sentence_rewrite', label: 'Luyện viết lại câu', desc: 'AI tạo một bộ câu cùng topic để bạn paraphrase và luyện đổi cấu trúc tự nhiên hơn.' },
]

export function WritingSetup() {
  const router = useRouter()
  const [difficulty, setDifficulty] = useState('easy')
  const [topic, setTopic] = useState('')
  const [mode, setMode] = useState('sentence_writing')
  const [loading, setLoading] = useState(false)

  const handleStart = async () => {
    setLoading(true)
    const params = new URLSearchParams({ mode, topic, difficulty })
    router.push(`/writing/session/new?${params.toString()}`)
  }

  const startLabel = mode === 'sentence_rewrite' ? 'Bắt đầu luyện viết lại câu →' : 'Bắt đầu luyện viết từng câu →'

  return (
    <div className="rounded-2xl border bg-card p-6 space-y-6">
      {/* Step 1 */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">BƯỚC 1: CHỌN MỨC BÀI LUYỆN</p>
        <div className="grid grid-cols-3 gap-3">
          {DIFFICULTIES.map(d => (
            <button key={d.value} onClick={() => setDifficulty(d.value)}
              className={cn('p-4 rounded-xl border text-left transition-colors', difficulty === d.value ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground')}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">{d.label}</span>
                <span className="text-xs text-muted-foreground">{d.time}</span>
              </div>
              <p className="text-xs text-muted-foreground">{d.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2 */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">BƯỚC 2: CHỌN CHỦ ĐỀ</p>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><RefreshCw size={12} /> Làm mới</button>
            <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><Sparkles size={12} /> AI</button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {DEFAULT_TOPICS.map(t => (
            <button key={t} onClick={() => setTopic(t)}
              className={cn('p-3 rounded-xl border text-sm text-left transition-colors', topic === t ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground')}>
              {t}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mb-1.5">Hoặc tự nhập chủ đề riêng</p>
        <input value={topic} onChange={e => setTopic(e.target.value)}
          placeholder="Ví dụ: how smartphones changed study habits"
          className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
      </div>

      {/* Step 3 */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">BƯỚC 3: CHỌN KIỂU LUYỆN</p>
        <div className="grid grid-cols-2 gap-3">
          {MODES.map(m => (
            <button key={m.value} onClick={() => setMode(m.value)}
              className={cn('p-4 rounded-xl border text-left transition-colors', mode === m.value ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground')}>
              <p className="font-medium text-sm mb-1">{m.label}</p>
              <p className="text-xs text-muted-foreground">{m.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <button onClick={handleStart} disabled={!topic || loading}
          className="flex items-center justify-center gap-2 w-full rounded-xl bg-primary text-primary-foreground py-3 text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity">
          {loading && <Loader2 size={16} className="animate-spin" />}
          {startLabel}
        </button>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Bạn cần có nguồn AI để sử dụng tính năng. <a href="/settings" className="text-primary hover:underline">Xem gói AI hệ thống</a> hoặc <a href="/settings" className="text-primary hover:underline">thêm API riêng</a>.
        </p>
      </div>
    </div>
  )
}
