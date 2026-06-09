import { NextResponse } from 'next/server'

const MOCK_SETS = [
  { id: '1', name: 'Thư viện từ vựng', description: 'Bộ từ vựng cơ bản', level: 'A2', totalWords: 9, learnedWords: 0, progressPercent: 0, lastStudiedAt: null },
  { id: '2', name: 'TOEIC 600 - Office', description: 'Từ vựng văn phòng', level: 'B1', totalWords: 12, learnedWords: 12, progressPercent: 100, lastStudiedAt: '2026-06-01T00:00:00Z' },
  { id: '3', name: 'TOEIC 600 - Meetings & Email', description: 'Từ vựng họp và email', level: 'B1', totalWords: 12, learnedWords: 0, progressPercent: 0, lastStudiedAt: null },
  { id: '4', name: 'Travel English - Starter', description: 'Tiếng Anh du lịch cơ bản', level: 'A2', totalWords: 12, learnedWords: 0, progressPercent: 0, lastStudiedAt: null },
]

export async function GET() {
  return NextResponse.json({ success: true, data: MOCK_SETS })
}
