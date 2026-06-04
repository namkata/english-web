'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, CheckSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

const QUESTION_TYPES = [
  'Chọn từ thích hợp nhất', 'Chia động từ', 'Câu điều kiện', 'Câu gián tiếp',
  'Điền vào chỗ trống', 'Đọc hiểu văn bản', 'Ngữ pháp', 'Phối hợp từ',
  'Từ đồng nghĩa/trái nghĩa', 'Từ vựng', 'Xác định lỗi sai', 'Chuyển đổi từ loại',
  'Câu bị động', 'Mệnh đề quan hệ', 'Câu so sánh', 'Câu đảo ngữ',
  'Mạo từ', 'Giới từ', 'Thành ngữ', 'Câu đồng nghĩa',
  'Trọng âm và phát âm', 'Đọc điền từ (Cloze Test)', 'Nối câu', 'Chọn tiêu đề phù hợp',
  'Hoàn thành đoạn hội thoại', 'Sắp xếp câu', 'Tìm nghĩa từ trong ngữ cảnh',
]

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

export function QuizSetup() {
  const router = useRouter()
  const [source, setSource] = useState<'bank' | 'ai'>('bank')
  const [count, setCount] = useState(15)
  const [level, setLevel] = useState('B1')
  const [examMode, setExamMode] = useState(false)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const toggleType = (t: string) => {
    setSelectedTypes(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t])
  }

  const handleCreate = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    router.push('/quiz/session/demo')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left: Settings */}
      <div className="space-y-5">
        <div className="rounded-2xl border bg-card p-5">
          <h3 className="font-semibold mb-4">Nguồn tạo đề</h3>
          <div className="flex rounded-xl border overflow-hidden">
            {(['bank', 'ai'] as const).map(s => (
              <button key={s} onClick={() => setSource(s)}
                className={cn('flex-1 py-2.5 text-sm font-medium transition-colors', source === s ? 'bg-primary text-primary-foreground' : 'hover:bg-muted')}>
                {s === 'bank' ? 'Ngân hàng đề' : 'AI'}
              </button>
            ))}
          </div>
          {source === 'ai' && <p className="text-xs text-muted-foreground mt-2">AI cần nguồn AI. <a href="/settings" className="underline text-primary">Gói AI hệ thống</a> hoặc <a href="/settings" className="underline text-primary">thêm API riêng</a>.</p>}
        </div>

        <div className="rounded-2xl border bg-card p-5 space-y-4">
          <h3 className="font-semibold">Cài đặt</h3>
          <div className="flex items-center gap-3">
            <label className="text-sm w-40">Số lượng câu hỏi</label>
            <input type="number" value={count} onChange={e => setCount(Number(e.target.value))}
              min={5} max={100}
              className="flex-1 rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm w-40">Trình độ</label>
            <select value={level} onChange={e => setLevel(e.target.value)}
              className="flex-1 rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring">
              {LEVELS.map(l => <option key={l} value={l}>{l} - {l === 'A1' ? 'Beginner' : l === 'A2' ? 'Elementary' : l === 'B1' ? 'Intermediate' : l === 'B2' ? 'Upper Intermediate' : l === 'C1' ? 'Advanced' : 'Mastery'}</option>)}
            </select>
          </div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={examMode} onChange={e => setExamMode(e.target.checked)} className="mt-0.5 accent-primary" />
            <div>
              <p className="text-sm font-medium">Chế độ thi</p>
              <p className="text-xs text-muted-foreground">Bật để dùng strict timer, cảnh báo khi rời trang, và giao diện tập trung hơn.</p>
            </div>
          </label>
        </div>

        <button onClick={handleCreate} disabled={loading || selectedTypes.length === 0}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground py-3 text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity">
          {loading ? <Loader2 size={16} className="animate-spin" /> : <CheckSquare size={16} />}
          ✨ TẠO BÀI TẬP
        </button>
      </div>

      {/* Right: Question Types */}
      <div className="rounded-2xl border bg-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Loại câu hỏi</h3>
          <button onClick={() => setSelectedTypes(selectedTypes.length === QUESTION_TYPES.length ? [] : [...QUESTION_TYPES])}
            className="text-xs text-primary hover:underline">
            {selectedTypes.length === QUESTION_TYPES.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto pr-1">
          {QUESTION_TYPES.map(t => (
            <label key={t} className="flex items-center gap-2 cursor-pointer p-2 rounded-xl hover:bg-muted transition-colors">
              <input type="checkbox" checked={selectedTypes.includes(t)} onChange={() => toggleType(t)} className="accent-primary" />
              <span className="text-sm">{t}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
