export function GrammarStats() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-2xl border bg-card p-4">
        <p className="text-2xl font-bold">4</p>
        <p className="text-sm text-muted-foreground">lỗi đã ghi nhận</p>
      </div>
      <div className="rounded-2xl border bg-card p-4">
        <p className="text-2xl font-bold">3</p>
        <p className="text-sm text-muted-foreground">chủ điểm ngữ pháp</p>
      </div>
    </div>
  )
}
