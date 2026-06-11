import type { Metadata } from 'next'

import { AIProviderSettings } from '@/components/settings/AIProviderSettings'

export const metadata: Metadata = { title: 'Cài đặt · AI Provider' }

export default function AIProviderSettingsPage() {
  return <AIProviderSettings />
}
