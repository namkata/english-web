export default function WritingSessionLoading() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="h-6 w-48 bg-muted rounded" />
        <div className="h-5 w-24 bg-muted rounded-full" />
      </div>
      <div className="rounded-2xl border bg-card p-6 space-y-4">
        <div className="space-y-2">
          <div className="h-4 w-[60%] bg-muted rounded" />
          <div className="h-4 w-[80%] bg-muted rounded" />
          <div className="h-4 w-[70%] bg-muted rounded" />
          <div className="h-4 w-[50%] bg-muted rounded" />
        </div>
        <div className="h-24 bg-muted rounded-xl" />
        <div className="h-10 w-32 bg-muted rounded-xl" />
      </div>
      <div className="h-20 bg-muted rounded-2xl" />
    </div>
  )
}
