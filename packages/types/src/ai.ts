import { z } from 'zod'

import { CEFRLevelSchema } from './common'

// ---- Writing ----
export const WritingDifficultySchema = z.enum(['easy', 'medium', 'hard'])
export const WritingModeSchema = z.enum(['sentence_writing', 'sentence_rewrite'])

export const WritingSessionSchema = z.object({
  id: z.string().uuid(),
  difficulty: WritingDifficultySchema,
  topic: z.string(),
  mode: WritingModeSchema,
  level: CEFRLevelSchema,
  completedSentences: z.number().int().default(0),
  totalSentences: z.number().int(),
  averageScore: z.number().nullable(),
  createdAt: z.string().datetime(),
})

export const WritingFeedbackSchema = z.object({
  sentenceId: z.string().uuid(),
  originalSentence: z.string(),
  userSentence: z.string(),
  score: z.number().min(0).max(100),
  grammarErrors: z.array(z.object({
    position: z.number().int(),
    errorText: z.string(),
    suggestion: z.string(),
    explanation: z.string(),
  })),
  vocabularyFeedback: z.string(),
  overallFeedback: z.string(),
  improvedVersion: z.string().nullable(),
})

// ---- AI Quiz Generation ----
export const GenerateQuizSchema = z.object({
  level: CEFRLevelSchema,
  questionCount: z.number().int().min(5).max(100).default(15),
  questionTypes: z.array(z.string()).min(1),
  examMode: z.boolean().default(false),
})

export type WritingSession = z.infer<typeof WritingSessionSchema>
export type WritingFeedback = z.infer<typeof WritingFeedbackSchema>
export type GenerateQuizInput = z.infer<typeof GenerateQuizSchema>
