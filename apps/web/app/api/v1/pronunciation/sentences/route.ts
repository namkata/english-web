import { NextResponse } from 'next/server'
import { PRONUNCIATION_SENTENCES } from '@/lib/seed-data/pronunciation'

export async function GET() {
  return NextResponse.json({ success: true, data: PRONUNCIATION_SENTENCES })
}
