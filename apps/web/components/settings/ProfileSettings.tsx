'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, User } from 'lucide-react'

import { useSettingsStore, useSettingsHydrated, type CEFRLevel } from '@/lib/stores/settings-store'

const LEVELS: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

export function ProfileSettings() {
  const hydrated = useSettingsHydrated()
  const profile = useSettingsStore(s => s.profile)
  const preferences = useSettingsStore(s => s.preferences)
  const updateProfile = useSettingsStore(s => s.updateProfile)
  const updatePreferences = useSettingsStore(s => s.updatePreferences)

  const [saved, setSaved] = useState(false)
  useEffect(() => {
    if (!saved) return
    const t = setTimeout(() => setSaved(false), 2000)
    return () => clearTimeout(t)
  }, [saved])

  if (!hydrated) return <div className="h-96 rounded-2xl bg-muted animate-pulse" />

  const initial = profile.displayName.charAt(0).toUpperCase()

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Hồ sơ</h1>
        <p className="text-sm text-muted-foreground">Thông tin người học và mục tiêu của bạn.</p>
      </div>

      <div className="rounded-2xl border bg-card p-6 space-y-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-2xl font-bold border border-brand-200">
            {initial || <User size={24} />}
          </div>
          <div>
            <p className="font-semibold">{profile.displayName || 'Người học'}</p>
            <p className="text-sm text-muted-foreground">
              Trình độ {profile.currentLevel} · Mục tiêu {profile.targetLevel}
            </p>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Tên hiển thị</label>
          <input
            value={profile.displayName}
            onChange={e => updateProfile({ displayName: e.target.value })}
            className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Trình độ hiện tại</label>
            <select
              value={profile.currentLevel}
              onChange={e => updateProfile({ currentLevel: e.target.value as CEFRLevel })}
              className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              {LEVELS.map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Mục tiêu</label>
            <select
              value={profile.targetLevel}
              onChange={e => updateProfile({ targetLevel: e.target.value as CEFRLevel })}
              className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              {LEVELS.map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Giới thiệu</label>
          <textarea
            value={profile.bio}
            onChange={e => updateProfile({ bio: e.target.value })}
            placeholder="Vài dòng về bạn và lý do học tiếng Anh..."
            className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring min-h-[80px] resize-y"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Ngôn ngữ giao diện</label>
          <div className="mt-1 flex rounded-xl border overflow-hidden w-48">
            {(['vi', 'en'] as const).map(lang => (
              <button
                key={lang}
                onClick={() => updateProfile({ uiLanguage: lang })}
                className={`flex-1 py-2 text-sm font-medium transition-colors ${profile.uiLanguage === lang ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
              >
                {lang === 'vi' ? 'Tiếng Việt' : 'English'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Daily goal */}
      <div className="rounded-2xl border bg-card p-6 space-y-4">
        <h2 className="font-semibold">Mục tiêu & nhắc nhở</h2>
        <div>
          <label className="text-sm font-medium">Mục tiêu XP mỗi ngày: {preferences.dailyGoalXP}</label>
          <input
            type="range"
            min={10}
            max={500}
            step={10}
            value={preferences.dailyGoalXP}
            onChange={e => updatePreferences({ dailyGoalXP: Number(e.target.value) })}
            className="mt-2 w-full accent-primary"
          />
        </div>
        <label className="flex items-center justify-between">
          <span className="text-sm">Bật nhắc nhở học hằng ngày</span>
          <input
            type="checkbox"
            checked={preferences.reminderEnabled}
            onChange={e => updatePreferences({ reminderEnabled: e.target.checked })}
            className="accent-primary w-4 h-4"
          />
        </label>
        {preferences.reminderEnabled && (
          <div className="flex items-center justify-between">
            <span className="text-sm">Giờ nhắc</span>
            <input
              type="time"
              value={preferences.reminderTime}
              onChange={e => updatePreferences({ reminderTime: e.target.value })}
              className="rounded-xl border border-input bg-background px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        )}
        <label className="flex items-center justify-between">
          <span className="text-sm">Âm thanh hiệu ứng</span>
          <input
            type="checkbox"
            checked={preferences.soundEnabled}
            onChange={e => updatePreferences({ soundEnabled: e.target.checked })}
            className="accent-primary w-4 h-4"
          />
        </label>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setSaved(true)}
          className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Lưu thay đổi
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 text-sm text-green-600">
            <CheckCircle2 size={16} /> Đã lưu trên thiết bị này
          </span>
        )}
      </div>
    </div>
  )
}
