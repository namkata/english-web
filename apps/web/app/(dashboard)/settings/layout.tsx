import { SettingsSidebar } from '@/components/settings/SettingsSidebar'

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 animate-fade-in">
      <SettingsSidebar />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  )
}
