'use client'
import { Plus } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'

export function SettingsContent() {
  const { data: providers = [] } = useQuery({
    queryKey: ['user', 'ai-providers'],
    queryFn: () => apiClient.user.getAIProviders(),
  })

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border bg-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">AI Provider</span>
              <span className="text-xs text-muted-foreground">{providers.length} provider riêng</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Chọn nguồn AI bạn muốn dùng, lưu API key ngay trên thiết bị này và đổi provider mặc định bất kỳ lúc nào.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase mb-2">BẮT ĐẦU</p>
            <p className="text-sm text-muted-foreground mb-3">Thêm provider mới để dùng API riêng.</p>
            <button className="flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity">
              <Plus size={14} /> Thêm provider
            </button>
          </div>
        </div>

        {providers.length === 0 && (
          <div className="rounded-xl border-2 border-dashed border-muted p-8 flex flex-col items-center gap-2 text-center">
            <span className="text-2xl">✨</span>
            <p className="font-medium text-sm">Chưa có provider cá nhân</p>
            <p className="text-xs text-muted-foreground">Thêm một provider để dùng API riêng cho tra từ, viết và các tính năng AI khác.</p>
          </div>
        )}
      </div>
    </div>
  )
}
