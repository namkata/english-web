import { z } from 'zod'

export const UserStatsSchema = z.object({
  userId: z.string().uuid(),
  totalXP: z.number().int(),
  todayXP: z.number().int(),
  dailyGoalXP: z.number().int(),
  streakDays: z.number().int(),
  longestStreak: z.number().int(),
  weeklyRank: z.number().int().nullable(),
  writingCount: z.number().int(),
  readingCount: z.number().int(),
})

export const DailyChallengeSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  xpReward: z.number().int(),
  completedSteps: z.number().int(),
  totalSteps: z.number().int(),
  isCompleted: z.boolean(),
  expiresAt: z.string().datetime(),
})

export const LeaderboardEntrySchema = z.object({
  rank: z.number().int(),
  userId: z.string().uuid(),
  displayName: z.string(),
  avatarUrl: z.string().url().nullable(),
  weeklyXP: z.number().int(),
  streakDays: z.number().int(),
})

export const ActivityHeatmapSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  xp: z.number().int(),
  intensity: z.number().int().min(0).max(4), // 0=none, 1-4 for heat levels
})

export type UserStats = z.infer<typeof UserStatsSchema>
export type DailyChallenge = z.infer<typeof DailyChallengeSchema>
export type LeaderboardEntry = z.infer<typeof LeaderboardEntrySchema>
export type ActivityHeatmap = z.infer<typeof ActivityHeatmapSchema>
