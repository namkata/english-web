const topics = [
  { label: 'Mạo từ', count: 2 },
  { label: 'Sự đồng nhất giữa chủ ngữ và động từ', count: 1 },
  { label: 'Chọn giới từ', count: 1 },
]

export function GrammarTopics() {
  return (
    <div className="space-y-2">
      {topics.map(t => (
        <div key={t.label} className="flex items-center justify-between p-4 rounded-2xl border bg-card">
          <span className="text-sm font-medium">{t.label}</span>
          <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">{t.count} lỗi</span>
        </div>
      ))}
    </div>
  )
}
