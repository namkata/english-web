import { NextResponse } from 'next/server'
import { ALL_PASSAGES } from '@/lib/seed-data/reading'

export async function GET() {
  const items = ALL_PASSAGES.map(({ questions: _q, ...rest }) => ({
    ...rest,
    content: rest.content.slice(0, 100) + '...',
  }))
  return NextResponse.json({ success: true, data: { items, total: items.length } })
}
