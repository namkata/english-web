import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'

import { Providers } from '@/components/providers/Providers'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'English Web — Luyện tiếng Anh toàn diện',
    template: '%s | English Web',
  },
  description: 'Nền tảng luyện tiếng Anh toàn diện: đọc hiểu, luyện viết AI, từ vựng, trắc nghiệm và nhiều hơn nữa.',
  keywords: ['học tiếng anh', 'luyện tiếng anh', 'english learning', 'IELTS', 'TOEIC'],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.variable}>
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
