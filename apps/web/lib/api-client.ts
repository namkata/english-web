/**
 * Type-safe API client for English Web backend.
 * All requests go through the API gateway (default: http://localhost:3001).
 */
import axios from 'axios'

import type {
  LoginInput,
  RegisterInput,
  AuthUser,
  Tokens,
  ReadingPassage,
  ReadingPassageDetail,
  VocabularySet,
  Word,
  UserStats,
  DailyChallenge,
  LeaderboardEntry,
  ActivityHeatmap,
  WritingSession,
  WritingFeedback,
  GenerateQuizInput,
  AIProvider,
  CreateAIProviderInput,
  CEFRLevel,
} from '@english-web/types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'

const http = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  timeout: 30_000,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * Unwrap the standard API envelope `{ success, data }` so callers receive the
 * inner payload directly (matching the typed return signatures below).
 * - On `{ success: false, error }` the promise rejects with a readable message.
 * - Responses without a `success` field (e.g. auth provider) pass through unchanged.
 */
http.interceptors.response.use(response => {
  const body = response.data as
    | { success?: boolean; data?: unknown; error?: { message?: string }; message?: string }
    | undefined
  if (body && typeof body === 'object' && 'success' in body) {
    if (body.success === false) {
      const message = body.error?.message ?? body.message ?? 'Đã xảy ra lỗi khi gọi máy chủ.'
      return Promise.reject(new Error(message))
    }
    if ('data' in body) {
      response.data = body.data
    }
  }
  return response
})

// ---- Auth ----
const auth = {
  login: async (data: LoginInput) => {
    const res = await http.post<{ user: AuthUser; tokens: Tokens }>('/auth/login', data)
    return res.data
  },
  register: async (data: RegisterInput) => {
    const res = await http.post<{ user: AuthUser; tokens: Tokens }>('/auth/register', data)
    return res.data
  },
  refresh: async (refreshToken: string) => {
    const res = await http.post<Tokens>('/auth/refresh', { refreshToken })
    return res.data
  },
  logout: async () => {
    await http.post('/auth/logout')
  },
  me: async (accessToken: string) => {
    const res = await http.get<AuthUser>('/auth/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    return res.data
  },
}

// ---- Reading ----
const reading = {
  listPassages: async (params?: { level?: CEFRLevel; page?: number; limit?: number }) => {
    const res = await http.get<{ items: ReadingPassage[]; total: number }>('/reading', { params })
    return res.data
  },
  getPassage: async (id: string) => {
    const res = await http.get<ReadingPassageDetail>(`/reading/${id}`)
    return res.data
  },
}

// ---- Vocabulary ----
const vocabulary = {
  listSets: async () => {
    const res = await http.get<VocabularySet[]>('/vocabulary/sets')
    return res.data
  },
  getSetWords: async (setId: string, params?: { page?: number; limit?: number }) => {
    const res = await http.get<{ items: Word[]; total: number }>(
      `/vocabulary/sets/${setId}/words`,
      { params },
    )
    return res.data
  },
  markLearned: async (wordId: string) => {
    await http.post(`/vocabulary/words/${wordId}/learned`)
  },
  review: async (wordId: string, quality: number, card?: import('./srs').SrsCard) => {
    const res = await http.post<import('./srs').SrsCard>(
      `/vocabulary/words/${wordId}/review`,
      { quality, card },
    )
    return res.data
  },
}

// ---- Quiz ----
const quiz = {
  generate: async (data: GenerateQuizInput) => {
    const res = await http.post('/quiz', data)
    return res.data
  },
  submit: async (quizId: string, answers: Record<string, string>) => {
    const res = await http.post(`/quiz/${quizId}/submit`, { answers })
    return res.data
  },
}

// ---- Writing ----
const writing = {
  createSession: async (data: Omit<WritingSession, 'id' | 'completedSentences' | 'averageScore' | 'createdAt'>) => {
    const res = await http.post<WritingSession>('/writing/sessions', data)
    return res.data
  },
  submitSentence: async (sessionId: string, userSentence: string) => {
    const res = await http.post<WritingFeedback>(
      `/writing/sessions/${sessionId}/submit`,
      { userSentence },
    )
    return res.data
  },
}

// ---- Gamification ----
const gamification = {
  getMyStats: async () => {
    const res = await http.get<UserStats>('/gamification/me')
    return res.data
  },
  getLeaderboard: async (period: 'weekly' | 'monthly' | 'all' = 'weekly') => {
    const res = await http.get<LeaderboardEntry[]>('/gamification/leaderboard', { params: { period } })
    return res.data
  },
  getTodayChallenges: async () => {
    const res = await http.get<DailyChallenge[]>('/gamification/challenges/today')
    return res.data
  },
  getActivityHeatmap: async (months = 3) => {
    const res = await http.get<ActivityHeatmap[]>('/gamification/activity', {
      params: { months },
    })
    return res.data
  },
}

// ---- User / Settings ----
const user = {
  getAIProviders: async () => {
    const res = await http.get<AIProvider[]>('/users/me/ai-providers')
    return res.data
  },
  createAIProvider: async (data: CreateAIProviderInput) => {
    const res = await http.post<AIProvider>('/users/me/ai-providers', data)
    return res.data
  },
  deleteAIProvider: async (id: string) => {
    await http.delete(`/users/me/ai-providers/${id}`)
  },
}

// ---- Feedback ----
export interface FeedbackInput {
  type: 'feature' | 'general' | 'bug'
  name: string
  contact: string
  content: string
}

const feedback = {
  submit: async (data: FeedbackInput) => {
    const res = await http.post<{ id: string; receivedAt: string }>('/feedback', data)
    return res.data
  },
}

// ---- Community ----
export interface CommunityFeedPost {
  id: string
  authorId: string
  type: 'writing' | 'question'
  content: string
  likes: number
  comments: number
  createdAt: string
  author: { id: string; name: string; level: string } | null
}

const community = {
  getFeed: async () => {
    const res = await http.get<{ items: CommunityFeedPost[]; total: number }>('/community/feed')
    return res.data
  },
}

export const apiClient = { auth, reading, vocabulary, quiz, writing, gamification, user, feedback, community }
