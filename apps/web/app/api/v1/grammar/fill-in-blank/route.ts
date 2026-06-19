import { NextResponse } from 'next/server'
import { FILL_IN_BLANK_EXERCISES } from '@/lib/seed-data/grammar'

export async function GET() {
  return NextResponse.json({ success: true, data: FILL_IN_BLANK_EXERCISES })
}
