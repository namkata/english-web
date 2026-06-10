export default function ReadingDetailLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-6 w-48 bg-muted rounded" />
      <div className="rounded-2xl border bg-card p-6 space-y-4">
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-[90%] bg-muted rounded" />
          <div className="h-4 w-[85%] bg-muted rounded" />
          <div className="h-4 w-[70%] bg-muted rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-[95%] bg-muted rounded" />
          <div className="h-4 w-[60%] bg-muted rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-[80%] bg-muted rounded" />
          <div className="h-4 w-[50%] bg-muted rounded" />
        </div>
      </div>
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="rounded-2xl border bg-card p-5 space-y-3">
            <div className="h-4 w-[80%] bg-muted rounded" />
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="h-10 bg-muted rounded-xl" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
