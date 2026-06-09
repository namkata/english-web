import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      userId: 'demo',
      todayXP: 0,
      dailyGoalXP: 200,
      totalXP: 35,
      streakDays: 0,
      longestStreak: 0,
      weeklyRank: 163,
      writingCount: 0,
      readingCount: 0,
    },
  })
}
