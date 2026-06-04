import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import { BottomNav } from '@/components/layout/BottomNav'
import { Sidebar } from '@/components/layout/Sidebar'
import { QuickNavModal } from '@/components/layout/QuickNavModal'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session) redirect('/login')

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <Sidebar className="hidden lg:flex" />

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 p-4 lg:p-6 pb-20 lg:pb-6 max-w-5xl mx-auto w-full">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav className="lg:hidden" />

      {/* Quick Navigation Modal (triggered from ... button) */}
      <QuickNavModal />
    </div>
  )
}
