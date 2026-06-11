'use client'

import { useState } from 'react'
import { Plus, Trash2, Star, Key, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  useSettingsStore,
  useSettingsHydrated,
  type AIProviderKind,
} from '@/lib/stores/settings-store'

const PROVIDER_KINDS: Array<{ value: AIProviderKind; label: string; defaultModel: string }> = [
  { value: 'openai', label: 'OpenAI', defaultModel: 'gpt-4o' },
  { value: 'anthropic', label: 'Anthropic', defaultModel: 'claude-sonnet-4-6' },
  { value: 'gemini', label: 'Google Gemini', defaultModel: 'gemini-1.5-pro' },
  { value: 'openrouter', label: 'OpenRouter', defaultModel: 'openai/gpt-4o' },
  { value: 'custom', label: 'Tùy chỉnh (OpenAI-compatible)', defaultModel: '' },
]

const EMPTY = { name: '', provider: 'openai' as AIProviderKind, model: 'gpt-4o', baseUrl: '', apiKey: '' }
const maskKey = (k: string) => (k.length <= 6 ? '••••••' : `${k.slice(0, 3)}••••${k.slice(-3)}`)

export function AIProviderSettings() {
  const hydrated = useSettingsHydrated()
  const providers = useSettingsStore(s => s.aiProviders)
  const addProvider = useSettingsStore(s => s.addProvider)
  const removeProvider = useSettingsStore(s => s.removeProvider)
  const setDefaultProvider = useSettingsStore(s => s.setDefaultProvider)

  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY)

  const set = (patch: Partial<typeof EMPTY>) => setForm(f => ({ ...f, ...patch }))
  const canSave = form.name.trim() && form.model.trim() && form.apiKey.trim()

  const handleAdd = () => {
    if (!canSave) return
    addProvider({
      name: form.name.trim(),
      provider: form.provider,
      model: form.model.trim(),
      baseUrl: form.baseUrl.trim(),
      apiKey: form.apiKey.trim(),
      isDefault: providers.length === 0,
    })
    setForm(EMPTY)
    setShowForm(false)
  }

  if (!hydrated) return <div className="h-64 rounded-2xl bg-muted animate-pulse" />

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">AI Provider</h1>
          <p className="text-sm text-muted-foreground">
            Quản lý API key, model và provider mặc định. Khóa được lưu trên thiết bị này.
          </p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-1.5 bg-primary text-primary-foreground rounded-xl px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity flex-shrink-0"
          >
            <Plus size={16} /> Thêm provider
          </button>
        )}
      </div>

      {/* Existing providers */}
      {providers.length === 0 && !showForm ? (
        <div className="rounded-2xl border-2 border-dashed border-muted p-8 flex flex-col items-center gap-2 text-center">
          <Key size={24} className="text-muted-foreground" />
          <p className="font-medium text-sm">Chưa có provider cá nhân</p>
          <p className="text-xs text-muted-foreground">Thêm một provider để dùng API riêng cho viết, quiz và tra từ.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {providers.map(p => (
            <div key={p.id} className="rounded-2xl border bg-card p-4 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium">{p.name}</span>
                  {p.isDefault && (
                    <span className="flex items-center gap-1 text-[11px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                      <Star size={11} /> Mặc định
                    </span>
                  )}
                  <span className="text-[11px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{p.provider}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {p.model} · key {maskKey(p.apiKey)}
                  {p.baseUrl && ` · ${p.baseUrl}`}
                </p>
              </div>
              {!p.isDefault && (
                <button
                  onClick={() => setDefaultProvider(p.id)}
                  className="text-xs text-primary font-medium hover:underline px-2"
                >
                  Đặt mặc định
                </button>
              )}
              <button
                onClick={() => removeProvider(p.id)}
                className="p-2 rounded-lg text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-colors"
                aria-label="Xóa provider"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add form */}
      {showForm && (
        <div className="rounded-2xl border bg-card p-6 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Thêm provider</h2>
            <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg hover:bg-muted">
              <X size={16} />
            </button>
          </div>

          <div>
            <label className="text-sm font-medium">Tên gợi nhớ *</label>
            <input
              value={form.name}
              onChange={e => set({ name: e.target.value })}
              placeholder="OpenAI cá nhân"
              className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Nhà cung cấp</label>
              <select
                value={form.provider}
                onChange={e => {
                  const kind = e.target.value as AIProviderKind
                  const preset = PROVIDER_KINDS.find(k => k.value === kind)
                  set({ provider: kind, model: preset?.defaultModel ?? form.model })
                }}
                className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
              >
                {PROVIDER_KINDS.map(k => (
                  <option key={k.value} value={k.value}>{k.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Model *</label>
              <input
                value={form.model}
                onChange={e => set({ model: e.target.value })}
                placeholder="gpt-4o"
                className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {(form.provider === 'custom' || form.provider === 'openrouter') && (
            <div>
              <label className="text-sm font-medium">Base URL</label>
              <input
                value={form.baseUrl}
                onChange={e => set({ baseUrl: e.target.value })}
                placeholder="https://api.example.com/v1"
                className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium">API Key *</label>
            <input
              type="password"
              value={form.apiKey}
              onChange={e => set({ apiKey: e.target.value })}
              placeholder="sk-..."
              className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <p className="text-xs text-muted-foreground mt-1">Khóa chỉ được lưu cục bộ trên thiết bị này.</p>
          </div>

          <button
            onClick={handleAdd}
            disabled={!canSave}
            className={cn(
              'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-opacity',
              canSave ? 'bg-primary text-primary-foreground hover:opacity-90' : 'bg-muted text-muted-foreground',
            )}
          >
            <Plus size={16} /> Lưu provider
          </button>
        </div>
      )}
    </div>
  )
}
