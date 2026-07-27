'use client'

import Link from 'next/link'
import { useSettings } from '@/src/context/SettingsContext'

export default function PrivacyClient() {
  const { language } = useSettings()

  if (language === 'en') {
    return (
      <main className="min-h-screen bg-white py-24 px-6">
        <div className="max-w-[800px] mx-auto prose prose-sm sm:prose-base prose-zinc">
          <h1 className="text-4xl serif-display mb-8">Privacy Policy</h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-12">Last Updated: June 27, 2026</p>

          <h2>1. Data Controller</h2>
          <p>At Peony Collective, we attach the utmost importance to the security of your personal data. This Privacy Policy explains how data collected while using our platform is processed.</p>

          <h2>2. Personal Data Collected</h2>
          <ul>
            <li><strong>Identity & Contact Info:</strong> Name, surname, email, phone number, address.</li>
            <li><strong>Financial Info:</strong> Payment and IBAN details (stored securely by PayTR payment gateway).</li>
            <li><strong>Usage Data:</strong> IP address, cookies, in-platform navigation data.</li>
          </ul>

          <h2>3. Purpose of Processing</h2>
          <p>Your data is processed for executing secure luxury commerce, providing appraisal verifications, managing logistics, and preventing fraud.</p>

          <h2>4. Data Sharing</h2>
          <p>Your data is shared exclusively in compliance with legal obligations, payment providers (PayTR), and courier companies (OTO Kargo) for service performance.</p>

          <h2>5. Contact</h2>
          <p>For questions regarding privacy processes, please contact us via <a href="mailto:legal@peonycollective.com">legal@peonycollective.com</a>.</p>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link href="/" className="text-xs font-bold uppercase tracking-widest text-black hover:text-[#AF9164] transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white py-24 px-6">
      <div className="max-w-[800px] mx-auto prose prose-sm sm:prose-base prose-zinc">
        <h1 className="text-4xl serif-display mb-8">Gizlilik Politikası</h1>
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-12">Son Güncelleme: 27 Haziran 2026</p>
        
        <h2>1. Veri Sorumlusu</h2>
        <p>Peony Collective olarak, kişisel verilerinizin güvenliğine en üst düzeyde önem veriyoruz. Bu Gizlilik Politikası, platformumuzu kullanırken toplanan verilerin nasıl işlendiğini açıklar.</p>

        <h2>2. Toplanan Kişisel Veriler</h2>
        <ul>
          <li><strong>Kimlik ve İletişim Bilgileri:</strong> Ad, soyad, e-posta, telefon, adres.</li>
          <li><strong>Finansal Bilgiler:</strong> Ödeme ve IBAN bilgileri (Güvenli ödeme altyapısı PayTR tarafından saklanır).</li>
          <li><strong>Kullanım Verileri:</strong> IP adresi, çerezler, platform içi gezinme bilgileri.</li>
        </ul>

        <h2>3. Verilerin İşlenme Amacı</h2>
        <p>Verileriniz, lüks tüketim ürünlerinin güvenli alım-satım süreçlerinin yürütülmesi, ekspertiz onaylarının sağlanması, lojistik süreçlerin yönetilmesi ve dolandırıcılığın önlenmesi amaçlarıyla işlenmektedir.</p>

        <h2>4. Veri Paylaşımı</h2>
        <p>Verileriniz yalnızca yasal yükümlülükler doğrultusunda, ödeme kuruluşları (PayTR) ve kargo şirketleri (OTO Kargo) ile hizmetin ifası amacıyla paylaşılmaktadır.</p>

        <h2>5. İletişim</h2>
        <p>Gizlilik süreçleri hakkında bilgi almak için <a href="mailto:legal@peonycollective.com">legal@peonycollective.com</a> adresi üzerinden iletişime geçebilirsiniz.</p>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/" className="text-xs font-bold uppercase tracking-widest text-black hover:text-[#AF9164] transition-colors">
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </main>
  )
}
