'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, PenLine, BookOpen, Volume2, FileText, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/writing', label: 'Luyện viết', icon: PenLine },
  { href: '/reading', label: 'Đọc hiểu', icon: BookOpen },
  { href: '/vocabulary', label: 'Từ vựng', icon: FileText },
  { href: '/pronunciation', label: 'Phát âm', icon: Volume2 },
]

interface Props {
  className?: string
}

export function BottomNav({ className }: Props) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border',
        'flex items-center justify-around px-2 py-2 safe-bottom',
        className,
      )}
    >
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors text-xs',
              isActive
                ? 'text-primary font-medium'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 1.75} />
            <span>{label}</span>
          </Link>
        )
      })}

      {/* More button — triggers QuickNavModal */}
      <button
        className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-muted-foreground hover:text-foreground transition-colors text-xs"
        onClick={() => {
          window.dispatchEvent(new CustomEvent('open-quick-nav'))
        }}
      >
        <MoreHorizontal size={20} />
        <span>Thêm</span>
      </button>
    </nav>
  )
}
