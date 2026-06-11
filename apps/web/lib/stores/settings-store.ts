/**
 * Client-side user settings store (persisted to localStorage).
 *
 * Holds profile, learning preferences, dictionary source and AI providers.
 * API keys are kept on-device only and never sent anywhere — matching the
 * product promise "lưu API key ngay trên thiết bị này".
 */
'use client'

import { useEffect, useState } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
export type AIProviderKind = 'openai' | 'anthropic' | 'gemini' | 'openrouter' | 'custom'

export interface Profile {
  displayName: string
  currentLevel: CEFRLevel
  targetLevel: CEFRLevel
  bio: string
  uiLanguage: 'vi' | 'en'
  timezone: string
}

export interface Preferences {
  dailyGoalXP: number
  reminderEnabled: boolean
  reminderTime: string
  soundEnabled: boolean
  dictionarySource: string
}

export interface AIProviderEntry {
  id: string
  name: string
  provider: AIProviderKind
  model: string
  baseUrl: string
  apiKey: string
  isDefault: boolean
}

export const DICTIONARY_SOURCES = ['Cambridge', 'Oxford', 'Laban', 'Tra Từ', 'Google Translate'] as const

const DEFAULT_PROFILE: Profile = {
  displayName: 'Demo User',
  currentLevel: 'A2',
  targetLevel: 'B2',
  bio: '',
  uiLanguage: 'vi',
  timezone: 'Asia/Ho_Chi_Minh',
}

const DEFAULT_PREFERENCES: Preferences = {
  dailyGoalXP: 200,
  reminderEnabled: true,
  reminderTime: '08:00',
  soundEnabled: true,
  dictionarySource: 'Cambridge',
}

interface SettingsState {
  profile: Profile
  preferences: Preferences
  aiProviders: AIProviderEntry[]

  updateProfile: (patch: Partial<Profile>) => void
  updatePreferences: (patch: Partial<Preferences>) => void

  addProvider: (p: Omit<AIProviderEntry, 'id'>) => void
  updateProvider: (id: string, patch: Partial<AIProviderEntry>) => void
  removeProvider: (id: string) => void
  setDefaultProvider: (id: string) => void
}

const newId = () => `prov-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`

export const useSettingsStore = create<SettingsState>()(
  persist(
    set => ({
      profile: DEFAULT_PROFILE,
      preferences: DEFAULT_PREFERENCES,
      aiProviders: [],

      updateProfile: patch => set(state => ({ profile: { ...state.profile, ...patch } })),
      updatePreferences: patch => set(state => ({ preferences: { ...state.preferences, ...patch } })),

      addProvider: p =>
        set(state => {
          const isFirst = state.aiProviders.length === 0
          const entry: AIProviderEntry = { ...p, id: newId(), isDefault: p.isDefault || isFirst }
          const aiProviders = entry.isDefault
            ? [...state.aiProviders.map(x => ({ ...x, isDefault: false })), entry]
            : [...state.aiProviders, entry]
          return { aiProviders }
        }),

      updateProvider: (id, patch) =>
        set(state => ({
          aiProviders: state.aiProviders.map(p => (p.id === id ? { ...p, ...patch } : p)),
        })),

      removeProvider: id =>
        set(state => {
          const remaining = state.aiProviders.filter(p => p.id !== id)
          // Ensure there is always a default if any providers remain.
          if (remaining.length && !remaining.some(p => p.isDefault)) remaining[0]!.isDefault = true
          return { aiProviders: remaining }
        }),

      setDefaultProvider: id =>
        set(state => ({
          aiProviders: state.aiProviders.map(p => ({ ...p, isDefault: p.id === id })),
        })),
    }),
    { name: 'englishweb-settings' },
  ),
)

/** True once the settings store has rehydrated from localStorage. */
export function useSettingsHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => {
    setHydrated(true)
  }, [])
  return hydrated
}
