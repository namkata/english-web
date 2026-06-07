'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, PenLine, BookOpen, FileText, ClipboardList,
  Headphones, Volume2, Settings, MessageSquare,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard',  label: 'Dashboard',   icon: LayoutDashboard },
  { href: '/writing',    label: 'Luyện viết',   icon: PenLine },
  { href: '/reading',    label: 'Đọc hiểu',     icon: BookOpen },
  { href: '/vocabulary', label: 'Từ vựng',      icon: FileText },
  { href: '/quiz',       label: 'Trắc nghiệm',  icon: ClipboardList },
  { href: '/grammar',       label: 'Ngữ pháp',     icon: FileText },
  { href: '/pronunciation', label: 'Phát âm',      icon: Volume2 },
  { href: '/listening',     label: 'Luyện nghe',   icon: Headphones },
  { href: '/settings',      label: 'Cài đặt',      icon: Settings },
  { href: '/feedback',      label: 'Phản hồi',     icon: MessageSquare },
]

interface Props {
  className?: string
}

export function Sidebar({ className }: Props) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'w-64 min-h-screen border-r border-border flex flex-col gap-1 p-4 sticky top-0',
        className,
      )}
    >
      <div className="mb-6 px-3">
        <span className="text-xl font-bold text-primary">English Web</span>
      </div>

      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
              isActive
                ? 'bg-brand-50 text-brand-700'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            <Icon size={18} strokeWidth={isActive ? 2.5 : 1.75} />
            {label}
          </Link>
        )
      })}
    </aside>
  )
}
