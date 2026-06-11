import type { Metadata } from 'next'

import { PlanSettings } from '@/components/settings/PlanSettings'

export const metadata: Metadata = { title: 'Cài đặt · Gói AI' }

export default function PlanSettingsPage() {
  return <PlanSettings />
}
