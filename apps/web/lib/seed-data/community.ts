// Seed data for the Community feature: authors, feed posts and leaderboards.

export interface CommunityAuthor {
  id: string
  name: string
  level: string
  bio: string
}

export interface CommunityPost {
  id: string
  authorId: string
  type: 'writing' | 'question'
  content: string
  likes: number
  comments: number
  createdAt: string
}

export interface LeaderRow {
  rank: number
  userId: string
  displayName: string
  weeklyXP: number
  streakDays: number
}

export type LeaderboardPeriod = 'weekly' | 'monthly' | 'all'

export const COMMUNITY_AUTHORS: CommunityAuthor[] = [
  { id: 'u-mai', name: 'Mai Nguyễn', level: 'B1', bio: 'Đang luyện thi IELTS 6.5' },
  { id: 'u-huy', name: 'Huy Trần', level: 'A2', bio: 'Học tiếng Anh giao tiếp mỗi ngày' },
  { id: 'u-lan', name: 'Lan Phạm', level: 'B2', bio: 'Yêu thích đọc sách tiếng Anh' },
  { id: 'u-tuan', name: 'Tuấn Lê', level: 'A2', bio: 'Mục tiêu TOEIC 700' },
  { id: 'u-vy', name: 'Vy Hoàng', level: 'C1', bio: 'Mentor cộng đồng' },
]

export const COMMUNITY_POSTS: CommunityPost[] = [
  { id: 'p1', authorId: 'u-mai', type: 'writing', content: 'Last weekend I visited my grandparents in the countryside. The air was fresh and the food was delicious. I helped my grandmother cook lunch.', likes: 24, comments: 5, createdAt: '2026-06-09T09:30:00Z' },
  { id: 'p2', authorId: 'u-huy', type: 'question', content: 'Mọi người ơi, khi nào dùng "have been" và khi nào dùng "had been" vậy? Mình hay nhầm hai cái này.', likes: 12, comments: 8, createdAt: '2026-06-09T07:10:00Z' },
  { id: 'p3', authorId: 'u-lan', type: 'writing', content: 'Reading is my favourite hobby because it takes me to different worlds without leaving my room. I finished three novels this month!', likes: 41, comments: 11, createdAt: '2026-06-08T19:45:00Z' },
  { id: 'p4', authorId: 'u-tuan', type: 'question', content: 'Có ai có mẹo nào để nhớ phrasal verbs hiệu quả không? Mình học xong là quên luôn 😅', likes: 18, comments: 14, createdAt: '2026-06-08T14:20:00Z' },
  { id: 'p5', authorId: 'u-vy', type: 'writing', content: 'Consistency beats intensity. Studying 20 minutes every day is far better than cramming for hours once a week. Keep your streak alive!', likes: 87, comments: 9, createdAt: '2026-06-08T08:00:00Z' },
  { id: 'p6', authorId: 'u-mai', type: 'question', content: 'Bài đọc "A Day at School" có câu hỏi số 4 mình chọn mãi không đúng, mọi người giải thích giúp với?', likes: 6, comments: 3, createdAt: '2026-06-07T16:30:00Z' },
]

const WEEKLY: LeaderRow[] = [
  { rank: 1, userId: 'u-vy', displayName: 'Vy Hoàng', weeklyXP: 2840, streakDays: 47 },
  { rank: 2, userId: 'u-lan', displayName: 'Lan Phạm', weeklyXP: 2310, streakDays: 21 },
  { rank: 3, userId: 'u-mai', displayName: 'Mai Nguyễn', weeklyXP: 1980, streakDays: 12 },
  { rank: 4, userId: 'u-tuan', displayName: 'Tuấn Lê', weeklyXP: 1450, streakDays: 8 },
  { rank: 5, userId: 'u-huy', displayName: 'Huy Trần', weeklyXP: 1120, streakDays: 5 },
  { rank: 6, userId: 'demo', displayName: 'Bạn', weeklyXP: 760, streakDays: 3 },
]

export function getLeaderboard(period: LeaderboardPeriod): LeaderRow[] {
  const factor = period === 'weekly' ? 1 : period === 'monthly' ? 4.2 : 11.8
  return WEEKLY.map(r => ({ ...r, weeklyXP: Math.round(r.weeklyXP * factor) }))
}

export const authorById = (id: string) => COMMUNITY_AUTHORS.find(a => a.id === id)
