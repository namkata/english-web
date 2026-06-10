export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-7 w-48 bg-muted rounded" />
          <div className="h-4 w-64 bg-muted rounded" />
        </div>
        <div className="h-10 w-10 bg-muted rounded-full" />
      </div>

      {/* XP Progress skeleton */}
      <div className="rounded-2xl border bg-card p-5">
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-16 bg-muted rounded" />
              <div className="h-7 w-12 bg-muted rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Challenges skeleton */}
      <div className="rounded-2xl border bg-card p-5 space-y-3">
        <div className="h-5 w-32 bg-muted rounded" />
        <div className="h-16 bg-muted rounded-xl" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-10 bg-muted rounded" />
        ))}
      </div>

      {/* Modules skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-28 bg-muted rounded-2xl" />
        ))}
      </div>
    </div>
  )
}
