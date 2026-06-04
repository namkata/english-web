import type { Metadata } from 'next'

import { LoginForm } from '@/components/auth/LoginForm'

export const metadata: Metadata = {
  title: 'Đăng nhập',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-brand-600">English Web</h1>
          <p className="mt-2 text-muted-foreground">Học thôi nào, tiến chậm cũng được, miễn là không dừng.</p>
        </div>
        <div className="bg-card rounded-2xl shadow-sm border p-8">
          <h2 className="text-xl font-semibold mb-6">Đăng nhập</h2>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
