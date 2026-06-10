import HowItWorksClient from './HowItWorksClient'

export const metadata = {
  title: 'Nasıl Çalışır | Peony Collective',
  description: 'Peony Collective güvenli alışveriş, 32 noktalı ekspertiz ve dijital pasaport süreçlerini inceleyin. Güvenle ikinci el lüks alışveriş yapın.',
}

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-[#FCFCFB] py-24 px-6">
      <HowItWorksClient />
    </main>
  )
}
