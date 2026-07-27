'use client'

import SettingsForm from '@/src/components/SettingsForm'
import { useSettings } from '@/src/context/SettingsContext'

export default function SettingsClientPage({ profile }: { profile: any }) {
  const { t } = useSettings()

  return (
    <main className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-light uppercase tracking-widest mb-12 border-b border-gray-100 pb-6 text-[#1A1A1A]">
          {t('nav.settings', 'HESAP AYARLARIM')}
        </h1>
        
        <SettingsForm profile={profile} />
      </div>
    </main>
  )
}
