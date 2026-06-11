import { NextResponse } from 'next/server'

import { getLeaderboard, type LeaderboardPeriod } from '@/lib/seed-data/community'

const VALID: LeaderboardPeriod[] = ['weekly', 'monthly', 'all']

export async function GET(req: Request) {
  const period = new URL(req.url).searchParams.get('period') as LeaderboardPeriod | null
  const selected = period && VALID.includes(period) ? period : 'weekly'
  return NextResponse.json({ success: true, data: getLeaderboard(selected) })
}
