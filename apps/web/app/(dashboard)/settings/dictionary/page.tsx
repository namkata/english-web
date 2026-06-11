import type { Metadata } from 'next'

import { DictionarySettings } from '@/components/settings/DictionarySettings'

export const metadata: Metadata = { title: 'Cài đặt · Tra từ' }

export default function DictionarySettingsPage() {
  return <DictionarySettings />
}
