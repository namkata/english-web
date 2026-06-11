'use client'

import { BookOpen, Check } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useSettingsStore, useSettingsHydrated, DICTIONARY_SOURCES } from '@/lib/stores/settings-store'

export function DictionarySettings() {
  const hydrated = useSettingsHydrated()
  const dictionarySource = useSettingsStore(s => s.preferences.dictionarySource)
  const updatePreferences = useSettingsStore(s => s.updatePreferences)

  if (!hydrated) return <div className="h-64 rounded-2xl bg-muted animate-pulse" />

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Tra từ & Từ vựng</h1>
        <p className="text-sm text-muted-foreground">Chọn nguồn tra từ mặc định khi bạn nhấn vào một từ.</p>
      </div>

      <div className="rounded-2xl border bg-card p-6 space-y-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <BookOpen size={16} />
          <span className="text-xs font-medium uppercase tracking-wide">Nguồn tra từ mặc định</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-2">
          {DICTIONARY_SOURCES.map(src => {
            const active = dictionarySource === src
            return (
              <button
                key={src}
                onClick={() => updatePreferences({ dictionarySource: src })}
                className={cn(
                  'flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-colors',
                  active ? 'border-primary bg-primary/5 text-primary' : 'hover:border-muted-foreground',
                )}
              >
                {src}
                {active && <Check size={16} />}
              </button>
            )
          })}
        </div>
        <p className="text-xs text-muted-foreground">
          Lựa chọn được lưu trên thiết bị này và áp dụng cho mọi trang có chức năng tra từ.
        </p>
      </div>
    </div>
  )
}
