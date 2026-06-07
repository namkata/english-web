import Link from 'next/link'
import { PenLine, BookOpen, ClipboardList, FileText, Headphones, BookMarked } from 'lucide-react'
import { cn } from '@/lib/utils'

const modules = [
  {
    href: '/writing',
    label: 'Kỹ năng Viết',
    sublabel: 'LUYỆN VIẾT CÓ AI',
    description: 'Viết theo chủ đề và nhận phản hồi AI về cấu trúc, ngữ pháp và vốn từ theo cấp độ.',
    icon: PenLine,
    iconBg: 'bg-teal-100 text-teal-600',
    cta: 'Đi tới luyện viết',
    stats: { left: '4', leftLabel: 'bài đã luyện', right: '—%', rightLabel: 'điểm trung bình' },
    tags: [],
    comingSoon: false,
  },
  {
    href: '/reading',
    label: 'Đọc hiểu',
    sublabel: 'COMPREHENSION',
    description: 'Luyện đọc theo chủ đề và trả lời câu hỏi để tăng tốc hiểu ý chính và chi tiết.',
    icon: BookOpen,
    iconBg: 'bg-blue-100 text-blue-600',
    cta: 'Đọc theo cấp độ →',
    stats: { left: '1', leftLabel: 'bài đã làm', right: '60%', rightLabel: 'điểm TB' },
    tags: [],
    comingSoon: false,
  },
  {
    href: '/quiz',
    label: 'Trắc nghiệm',
    sublabel: 'QUIZ MODE',
    description: 'Làm đề theo chủ điểm ngữ pháp, từ vựng và đọc hiểu để tiến bộ hơn.',
    icon: ClipboardList,
    iconBg: 'bg-yellow-100 text-yellow-700',
    cta: 'Luyện ngay ↗',
    stats: { left: '0', leftLabel: 'bài đã làm', right: '—', rightLabel: 'chính xác' },
    tags: ['27 loại câu hỏi', '6 cấp độ', '15 -> 100 câu hỏi'],
    comingSoon: false,
  },
  {
    href: '/vocabulary',
    label: 'Ôn từ vựng',
    sublabel: 'SPACED REPETITION',
    description: 'Flashcard + spaced repetition. Lưu từ mới khi gặp trong bài.',
    icon: FileText,
    iconBg: 'bg-purple-100 text-purple-600',
    cta: 'Xem từ vựng của tôi ↗',
    stats: { left: '7', leftLabel: 'bộ từ', right: '82', rightLabel: 'từ đã lưu' },
    tags: ['Flashcard', 'Ôn nhanh', 'Xếp chữ', 'Nối từ', 'Bài tập từ vựng', 'Nối nghĩa', 'Nhiều bộ từ vựng có sẵn'],
    comingSoon: false,
  },
  {
    href: '/grammar',
    label: 'Ngữ pháp & Số lỗi',
    sublabel: 'SỬA ĐÚNG TỪ GỐC',
    description: 'Ôn quy tắc ngữ pháp và rà lỗi hay gặp để sửa đúng ngay trong bài học.',
    icon: BookMarked,
    iconBg: 'bg-orange-100 text-orange-600',
    cta: 'Vào ngữ pháp ↗',
    stats: { left: '4', leftLabel: 'lỗi đã ghi nhận', right: '3', rightLabel: 'chủ điểm ngữ pháp' },
    tags: ['Mạo từ', 'Sự đồng nhất giữa chủ ngữ và động từ', 'Chọn giới từ'],
    comingSoon: false,
  },
  {
    href: '/listening',
    label: 'Luyện nghe',
    sublabel: 'NGHE HIỂU THEO CẤP ĐỘ',
    description: 'Dictation và nghe hiểu theo cấp độ. Tính năng đang được phát triển. Sắp ra mắt!',
    icon: Headphones,
    iconBg: 'bg-slate-100 text-slate-600',
    cta: 'Sắp ra mắt',
    stats: null,
    tags: ['Dictation', 'Nghe hội thoại', 'Luyện nghe theo cấp độ'],
    comingSoon: true,
  },
]

export function LearningModules() {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Luyện tập hôm nay</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((mod) => (
          <div
            key={mod.href}
            className={cn(
              'relative rounded-2xl border bg-card p-5 flex flex-col gap-3 overflow-hidden',
              mod.comingSoon && 'opacity-60',
            )}
          >
            {/* Ghost icon */}
            <mod.icon
              size={80}
              className="absolute -right-2 -bottom-2 text-muted/10 pointer-events-none"
              strokeWidth={1}
            />
            <div className="flex items-center gap-3 relative z-10">
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', mod.iconBg)}>
                <mod.icon size={20} />
              </div>
              <div>
                <p className="font-semibold text-sm">{mod.label}</p>
                <p className="text-xs text-muted-foreground">{mod.sublabel}</p>
              </div>
              {mod.comingSoon && (
                <span className="ml-auto text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                  COMING SOON
                </span>
              )}
            </div>

            <p className="text-sm text-muted-foreground relative z-10">{mod.description}</p>

            {mod.stats && (
              <div className="flex items-center gap-6 relative z-10">
                <div>
                  <p className="text-xl font-bold">{mod.stats.left}</p>
                  <p className="text-xs text-muted-foreground">{mod.stats.leftLabel}</p>
                </div>
                <div>
                  <p className="text-xl font-bold">{mod.stats.right}</p>
                  <p className="text-xs text-muted-foreground">{mod.stats.rightLabel}</p>
                </div>
              </div>
            )}

            {mod.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 relative z-10">
                {mod.tags.map((tag, i) => {
                  const colors = [
                    'bg-amber-100 text-amber-700',
                    'bg-green-100 text-green-700',
                    'bg-blue-100 text-blue-700',
                    'bg-orange-100 text-orange-700',
                    'bg-purple-100 text-purple-700',
                    'bg-pink-100 text-pink-700',
                    'bg-teal-100 text-teal-700',
                  ]
                  return (
                    <span key={tag} className={cn('text-xs px-2 py-0.5 rounded-full font-medium', colors[i % colors.length])}>
                      {tag}
                    </span>
                  )
                })}
              </div>
            )}

            {!mod.comingSoon && (
              <Link
                href={mod.href as any}
                className="mt-auto text-sm text-primary font-medium hover:underline inline-flex items-center gap-1 relative z-10"
              >
                {mod.cta}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
