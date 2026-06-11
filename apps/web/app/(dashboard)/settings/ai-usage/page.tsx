import type { Metadata } from 'next'

import { AIUsageSettings } from '@/components/settings/AIUsageSettings'

export const metadata: Metadata = { title: 'Cài đặt · Sử dụng AI' }

export default function AIUsagePage() {
  return <AIUsageSettings />
}
