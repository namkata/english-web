'use client'

import { Bell } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { getGreeting } from '@/lib/utils'

export function DashboardHeader() {
  const { data: session } = useSession()
  const name = session?.user?.name?.split(' ').pop() ?? 'bạn'

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
      <button className="relative rounded-xl border p-2.5 hover:bg-muted transition-colors">
        <Bell size={20} />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
      </button>
    </div>
  )
}
