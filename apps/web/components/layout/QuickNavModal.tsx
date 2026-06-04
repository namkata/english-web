'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { signOut } from 'next-auth/react'
import {
  LayoutDashboard, PenLine, BookOpen, FileText, ClipboardList,
  Headphones, Users, MessageSquare, Settings, LogOut, X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const items = [
  { href: '/dashboard',  label: 'Dashboard',   icon: LayoutDashboard, danger: false },
  { href: '/writing',    label: 'Luyện viết',   icon: PenLine,         danger: false },
  { href: '/reading',    label: 'Đọc hiểu',     icon: BookOpen,        danger: false },
  { href: '/vocabulary', label: 'Từ vựng',      icon: FileText,        danger: false },
  { href: '/quiz',       label: 'Trắc nghiệm',  icon: ClipboardList,   danger: false },
  { href: '/grammar',    label: 'Ngữ pháp',     icon: FileText,        danger: false },
  { href: '/listening',  label: 'Luyện nghe',   icon: Headphones,      danger: false },
  { href: '/community',  label: 'Cộng đồng',    icon: Users,           danger: false },
  { href: '/feedback',   label: 'Phản hồi',     icon: MessageSquare,   danger: false },
  { href: '/settings',   label: 'Cài đặt',      icon: Settings,        danger: false },
  { href: '#',           label: 'Đăng xuất',    icon: LogOut,          danger: true  },
]

export function QuickNavModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('open-quick-nav', handler)
    return () => window.removeEventListener('open-quick-nav', handler)
  }, [])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={() => setOpen(false)}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative bg-card rounded-2xl shadow-2xl border w-full max-w-sm p-6 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-lg">Điều hướng nhanh</h2>
            <p className="text-sm text-muted-foreground">Chọn màn bạn muốn mở tiếp theo.</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 hover:bg-muted transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {items.map(({ href, label, icon: Icon, danger }) =>
            danger ? (
              <button
                key={label}
                onClick={() => { setOpen(false); signOut({ callbackUrl: '/login' }) }}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors text-sm font-medium"
              >
                <Icon size={22} />
                <span className="text-xs leading-tight text-center">{label}</span>
              </button>
            ) : (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex flex-col items-center gap-2 p-3 rounded-xl bg-muted/60 hover:bg-muted',
                  'text-foreground transition-colors text-sm font-medium',
                )}
              >
                <Icon size={22} />
                <span className="text-xs leading-tight text-center">{label}</span>
              </Link>
            ),
          )}
        </div>
      </div>
    </div>
  )
}
