'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { User, BookOpen, CreditCard, Key, History, BarChart2, Activity, Rss } from 'lucide-react'
import { cn } from '@/lib/utils'

const items = [
  { href: '/settings', label: 'Hồ sơ', icon: User, desc: 'Thông tin người học và cấu hình' },
  { href: '/settings/dictionary', label: 'Tra từ & Từ vựng', icon: BookOpen, desc: 'Nguồn tra từ và các phần thông tin hiện thị.' },
  { href: '/settings/plan', label: 'Nâng cấp gói AI', icon: CreditCard, desc: 'Thông tin gói AI' },
  { href: '/settings/ai-provider', label: 'AI Provider', icon: Key, desc: 'API key, model, base URL và provider mặc định.' },
  { href: '/settings/writing-history', label: 'Lịch sử bài viết', icon: History, desc: 'Writing free, practice và paraphrase.' },
  { href: '/settings/stats', label: 'Thống kê nhanh', icon: BarChart2, desc: 'Tổng XP, streak, số bài lưu và tiến độ hôm nay.' },
  { href: '/settings/ai-usage', label: 'Sử dụng AI', icon: Activity, desc: 'Requests, token, provider, model và lịch sử gọi AI.' },
  { href: '/settings/following', label: 'Theo dõi', icon: Rss, desc: 'Following feed' },
]

export function SettingsSidebar() {
  const pathname = usePathname()
  return (
    <aside className="w-64 flex-shrink-0 space-y-1">
      {items.map(({ href, label, icon: Icon, desc }) => {
        const isActive = pathname === href
        return (
          <Link key={href} href={href}
            className={cn('flex items-start gap-3 p-3 rounded-xl transition-colors', isActive ? 'bg-muted' : 'hover:bg-muted/60')}>
            <Icon size={18} className="mt-0.5 flex-shrink-0 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{label}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          </Link>
        )
      })}
    </aside>
  )
}
