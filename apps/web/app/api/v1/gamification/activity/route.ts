import { NextResponse } from 'next/server'

/** Deterministic pseudo-random so the heatmap is stable across requests. */
function seededIntensity(dateStr: string): number {
  let hash = 0
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash * 31 + dateStr.charCodeAt(i)) | 0
  }
  const r = Math.abs(hash % 100)
  // ~75% of days have activity, weighted toward mid/high intensity
  if (r < 25) return 0
  if (r < 45) return 1
  if (r < 65) return 2
  if (r < 85) return 3
  return 4
}

export async function GET() {
  const activity = Array.from({ length: 91 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (90 - i))
    const dateStr = date.toISOString().split('T')[0]!
    const intensity = seededIntensity(dateStr)
    return { date: dateStr, intensity, xp: intensity * 25 }
  })
  return NextResponse.json({ success: true, data: activity })
}
