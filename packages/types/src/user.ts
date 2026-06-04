import { z } from 'zod'

import { CEFRLevelSchema } from './common'

export const UserProfileSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  displayName: z.string(),
  avatarUrl: z.string().url().nullable(),
  currentLevel: CEFRLevelSchema,
  targetLevel: CEFRLevelSchema.nullable(),
  bio: z.string().max(500).nullable(),
  timezone: z.string().default('Asia/Ho_Chi_Minh'),
  uiLanguage: z.enum(['vi', 'en']).default('vi'),
})

export const UserSettingsSchema = z.object({
  dailyGoalXP: z.number().int().min(10).max(500).default(200),
  reminderEnabled: z.boolean().default(true),
  reminderTime: z.string().regex(/^\d{2}:\d{2}$/).default('08:00'),
  soundEnabled: z.boolean().default(true),
})

export const AIProviderSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  provider: z.enum(['openai', 'anthropic', 'gemini', 'openrouter', 'custom']),
  model: z.string(),
  baseUrl: z.string().url().optional(),
  isDefault: z.boolean().default(false),
  // API key is write-only — never returned in GET responses
})

export const CreateAIProviderSchema = AIProviderSchema.omit({ id: true }).extend({
  apiKey: z.string().min(1, 'API key không được để trống'),
})

export type UserProfile = z.infer<typeof UserProfileSchema>
export type UserSettings = z.infer<typeof UserSettingsSchema>
export type AIProvider = z.infer<typeof AIProviderSchema>
export type CreateAIProviderInput = z.infer<typeof CreateAIProviderSchema>
