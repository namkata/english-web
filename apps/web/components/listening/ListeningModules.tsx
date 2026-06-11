import { Headphones, MessageCircle, MessagesSquare, Mic } from 'lucide-react'

const modules = [
  { label: 'Dictation', icon: Headphones, description: 'Nghe và chép lại chính xác từng câu theo cấp độ.' },
  { label: 'Question Response', icon: MessageCircle, description: 'Nghe câu hỏi ngắn và chọn câu trả lời phù hợp.' },
  { label: 'Conversation', icon: MessagesSquare, description: 'Nghe hội thoại thực tế và trả lời câu hỏi nội dung.' },
  { label: 'Talk', icon: Mic, description: 'Nghe bài nói dài, luyện nắm ý chính và chi tiết.' },
]

export function ListeningModules() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {modules.map(({ label, icon: Icon, description }) => (
        <div
          key={label}
          className="rounded-2xl border bg-card p-5 flex flex-col gap-3 opacity-70"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
              <Icon size={20} className="text-slate-500" />
            </div>
            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
              Coming soon
            </span>
          </div>
          <div>
            <p className="font-semibold">{label}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
