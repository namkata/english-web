import type { Metadata } from 'next'

import { SettingsSidebar } from '@/components/settings/SettingsSidebar'
import { SettingsContent } from '@/components/settings/SettingsContent'

export const metadata: Metadata = {
  title: 'Cài đặt',
}

export default function SettingsPage() {
  return (
    <div className="flex gap-6 animate-fade-in">
      <SettingsSidebar />
      <div className="flex-1">
        <SettingsContent />
      </div>
    </div>
  )
}
