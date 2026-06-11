import type { Metadata } from 'next'

import { StatsSettings } from '@/components/settings/StatsSettings'

export const metadata: Metadata = { title: 'Cài đặt · Thống kê' }

export default function StatsPage() {
  return <StatsSettings />
}
