'use client'

import { Activity, Cpu } from 'lucide-react'

import { useLearningStore, useHasHydrated } from '@/lib/stores/learning-store'
import { useSettingsStore } from '@/lib/stores/settings-store'

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
}

/** Rough token estimate (~4 chars/token) for display only. */
const estimateTokens = (text: string) => Math.max(1, Math.round(text.length / 4))

export function AIUsageSettings() {
  const hydrated = useHasHydrated()
  const writingHistory = useLearningStore(s => s.writingHistory)
  const providers = useSettingsStore(s => s.aiProviders)

  if (!hydrated) return <div className="h-64 rounded-2xl bg-muted animate-pulse" />

  const defaultProvider = providers.find(p => p.isDefault)
  const providerLabel = defaultProvider ? `${defaultProvider.name} · ${defaultProvider.model}` : 'Gói AI hệ thống'

  // Each writing submission is one AI feedback request.
  const calls = writingHistory.map(e => ({
    id: e.id,
    at: e.at,
    feature: 'Chấm điểm bài viết',
    tokens: estimateTokens(`${e.prompt} ${e.userSentence}`) + 120,
  }))

  const totalTokens = calls.reduce((a, c) => a + c.tokens, 0)

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Sử dụng AI</h1>
        <p className="text-sm text-muted-foreground">Lịch sử gọi AI và ước tính token (chỉ mang tính tham khảo).</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-2xl border bg-card p-5">
          <Activity size={18} className="text-primary" />
          <p className="text-2xl font-bold mt-2">{calls.length}</p>
          <p className="text-sm text-muted-foreground">Lượt gọi AI</p>
        </div>
        <div className="rounded-2xl border bg-card p-5">
          <Cpu size={18} className="text-primary" />
          <p className="text-2xl font-bold mt-2">{totalTokens.toLocaleString('vi-VN')}</p>
          <p className="text-sm text-muted-foreground">Token (ước tính)</p>
        </div>
        <div className="rounded-2xl border bg-card p-5">
          <p className="text-xs text-muted-foreground uppercase">Provider mặc định</p>
          <p className="text-sm font-medium mt-2 break-words">{providerLabel}</p>
        </div>
      </div>

      {calls.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-muted p-8 text-center">
          <p className="font-medium text-sm">Chưa có lượt gọi AI nào</p>
          <p className="text-xs text-muted-foreground">Dùng tính năng chấm điểm bài viết để bắt đầu ghi nhận.</p>
        </div>
      ) : (
        <div className="rounded-2xl border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="text-left font-medium px-4 py-2.5">Thời gian</th>
                <th className="text-left font-medium px-4 py-2.5">Tính năng</th>
                <th className="text-right font-medium px-4 py-2.5">Token ~</th>
              </tr>
            </thead>
            <tbody>
              {calls.map(c => (
                <tr key={c.id} className="border-t">
                  <td className="px-4 py-2.5 text-muted-foreground">{formatDate(c.at)}</td>
                  <td className="px-4 py-2.5">{c.feature}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums">{c.tokens.toLocaleString('vi-VN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
