import { NextResponse } from 'next/server'

const MOCK_CHALLENGES = [
  { id: '1', title: 'Bài đọc đạt chuẩn', description: 'Hoàn thành 1 bài đọc hiểu', xpReward: 10, completedSteps: 0, totalSteps: 1, isCompleted: false, expiresAt: new Date(Date.now() + 86400000).toISOString() },
  { id: '2', title: 'Câu đúng Assignment', description: 'Viết đúng 10 câu trong bài luyện viết', xpReward: 10, completedSteps: 0, totalSteps: 10, isCompleted: false, expiresAt: new Date(Date.now() + 86400000).toISOString() },
  { id: '3', title: 'Thêm từ vựng mới', description: 'Thêm 5 từ vựng vào bộ từ của bạn', xpReward: 5, completedSteps: 0, totalSteps: 5, isCompleted: false, expiresAt: new Date(Date.now() + 86400000).toISOString() },
]

export async function GET() {
  return NextResponse.json({ success: true, data: MOCK_CHALLENGES })
}
