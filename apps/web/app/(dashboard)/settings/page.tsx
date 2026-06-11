import type { Metadata } from 'next'

import { ProfileSettings } from '@/components/settings/ProfileSettings'

export const metadata: Metadata = {
  title: 'Cài đặt · Hồ sơ',
}

export default function SettingsPage() {
  return <ProfileSettings />
}
