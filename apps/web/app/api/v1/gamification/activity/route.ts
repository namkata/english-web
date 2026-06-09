import { NextResponse } from 'next/server'

export async function GET() {
  const activity = Array.from({ length: 91 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (90 - i))
    const dateStr = date.toISOString().split('T')[0]!
    const intensity = Math.random() > 0.6 ? Math.floor(Math.random() * 4) + 1 : 0
    return { date: dateStr, intensity, xp: intensity * 25 }
  })
  return NextResponse.json({ success: true, data: activity })
}
