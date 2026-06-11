'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, PenLine, BookOpen, FileText, ClipboardList,
  Headphones, Volume2, Settings, MessageSquare, Users,
  PanelLeftClose, PanelLeftOpen,
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
  { href: '/community',     label: 'Cộng đồng',    icon: Users },
  { href: '/settings',      label: 'Cài đặt',      icon: Settings },
  { href: '/feedback',      label: 'Phản hồi',     icon: MessageSquare },
]

interface Props {
  className?: string
}

export function Sidebar({ className }: Props) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'min-h-screen border-r border-border flex flex-col gap-1 p-4 sticky top-0 transition-all duration-200',
        collapsed ? 'w-[72px]' : 'w-64',
        className,
      )}
    >
      <div className={cn('mb-6 flex items-center', collapsed ? 'justify-center' : 'justify-between px-3')}>
        {!collapsed && <span className="text-xl font-bold text-primary">English Web</span>}
        <button
          onClick={() => setCollapsed(c => !c)}
          className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          title={collapsed ? 'Mở rộng sidebar' : 'Thu gọn sidebar'}
        >
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            title={collapsed ? label : undefined}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
              collapsed && 'justify-center px-0',
              isActive
                ? 'bg-brand-50 text-brand-700'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            <Icon size={18} strokeWidth={isActive ? 2.5 : 1.75} className="flex-shrink-0" />
            {!collapsed && label}
          </Link>
        )
      })}
    </aside>
  )
}
