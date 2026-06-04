import type { Metadata } from 'next'

import { RegisterForm } from '@/components/auth/RegisterForm'

export const metadata: Metadata = {
  title: 'Đăng ký',
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-brand-600">English Web</h1>
          <p className="mt-2 text-muted-foreground">Bắt đầu hành trình học tiếng Anh của bạn.</p>
        </div>
        <div className="bg-card rounded-2xl shadow-sm border p-8">
          <h2 className="text-xl font-semibold mb-6">Tạo tài khoản</h2>
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}
