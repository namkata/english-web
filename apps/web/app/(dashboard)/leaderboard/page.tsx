import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Leaderboard } from '@/components/community/Leaderboard'

export const metadata: Metadata = { title: 'Bảng xếp hạng' }

export default function LeaderboardPage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
      <div className="flex items-center gap-3">
        <Link
          href="/community"
          className="rounded-xl p-2 hover:bg-muted transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Bảng xếp hạng</h1>
          <p className="text-sm text-muted-foreground">
            Thi đua cùng người học khác trên toàn nền tảng.
          </p>
        </div>
      </div>
      <Leaderboard />
    </div>
  )
}
