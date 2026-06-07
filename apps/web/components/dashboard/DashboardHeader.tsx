'use client'

import { Bell } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { getGreeting } from '@/lib/utils'

export function DashboardHeader() {
  const { data: session } = useSession()
  const name = session?.user?.name?.split(' ').pop() ?? 'bạn'
  const initial = name.charAt(0).toUpperCase()

  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-bold">
          {getGreeting()}, {name} 👋
        </h1>
        <p className="text-muted-foreground mt-0.5 text-sm">
          Học thôi nào, tiến chậm cũng được, miễn là không dừng.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-sm font-bold border border-brand-200">
          {initial}
        </div>
        <button className="relative rounded-xl border p-2.5 hover:bg-muted transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
          <span className="sr-only">Thông báo</span>
        </button>
      </div>
    </div>
  )
}
