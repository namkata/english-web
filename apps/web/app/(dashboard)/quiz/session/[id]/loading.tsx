export default function QuizSessionLoading() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="h-6 w-40 bg-muted rounded" />
        <div className="h-5 w-16 bg-muted rounded-full" />
      </div>
      <div className="h-1.5 bg-muted rounded-full" />
      <div className="rounded-2xl border bg-card p-6 space-y-4">
        <div className="h-5 w-[70%] bg-muted rounded" />
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-12 bg-muted rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  )
}
