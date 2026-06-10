export default function VocabSetLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-6 w-40 bg-muted rounded" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl border bg-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-5 w-32 bg-muted rounded" />
              <div className="h-4 w-16 bg-muted rounded" />
            </div>
            <div className="space-y-1">
              <div className="h-3 w-20 bg-muted rounded" />
              <div className="h-3 w-24 bg-muted rounded" />
            </div>
            <div className="h-4 w-full bg-muted rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}
