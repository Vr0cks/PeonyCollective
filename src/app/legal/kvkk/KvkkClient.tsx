'use client'

import Link from 'next/link'
import { useSettings } from '@/src/context/SettingsContext'

export default function KvkkClient() {
  const { language } = useSettings()

  if (language === 'en') {
    return (
      <main className="min-h-screen bg-white py-24 px-6">
        <div className="max-w-[800px] mx-auto prose prose-sm sm:prose-base prose-zinc">
          <h1 className="text-4xl serif-display mb-8">Personal Data Protection Notice (KVKK)</h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-12">Last Updated: June 27, 2026</p>

          <h2>1. Data Controller</h2>
          <p>In accordance with Law No. 6698 on the Protection of Personal Data ("KVKK"), your personal data is processed by Peony Collective in its capacity as data controller.</p>

          <h2>2. Purposes of Processing Personal Data</h2>
          <p>Your personal data is processed for:</p>
          <ul>
            <li>Executing membership operations,</li>
            <li>Conducting payment and invoicing processes,</li>
            <li>Fulfilling courier and delivery logistics,</li>
            <li>Evidentiary compliance in legal dispute resolutions.</li>
          </ul>

          <h2>3. Transfer of Personal Data</h2>
          <p>Your data may be transferred to our business partners (PayTR, OTO Kargo, banking institutions) and legally authorized public authorities within Articles 8 and 9 of KVKK.</p>

          <h2>4. Your Rights as Data Subject</h2>
          <p>Under Article 11 of KVKK, data subjects have the right to request information, learn processing purposes, demand correction of incomplete/inaccurate data, and know third-party recipients.</p>

          <h2>5. Application Method</h2>
          <p>You may submit requests regarding KVKK to <strong>legal@peonycollective.com</strong> via secure electronic signature or mobile signature.</p>

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
        <h1 className="text-4xl serif-display mb-8">KVKK Aydınlatma Metni</h1>
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-12">Son Güncelleme: 27 Haziran 2026</p>
        
        <h2>1. Veri Sorumlusu</h2>
        <p>6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz veri sorumlusu sıfatıyla Peony Collective tarafından işlenmektedir.</p>

        <h2>2. Kişisel Verilerin İşlenme Amacı</h2>
        <p>Kişisel verileriniz;</p>
        <ul>
          <li>Üyelik işlemlerinin gerçekleştirilmesi,</li>
          <li>Ödeme ve faturalandırma süreçlerinin yürütülmesi,</li>
          <li>Kargo ve teslimat operasyonlarının sağlanması,</li>
          <li>Olası uyuşmazlıklarda delil olarak kullanılması amacıyla işlenmektedir.</li>
        </ul>

        <h2>3. Kişisel Verilerin Aktarılması</h2>
        <p>Verileriniz, yukarıda sayılan amaçlar doğrultusunda iş ortaklarımıza (PayTR, OTO Kargo, bankalar) ve kanunen yetkili kamu kurum ve kuruluşlarına KVKK’nın 8. ve 9. maddelerinde belirtilen şartlar çerçevesinde aktarılabilecektir.</p>

        <h2>4. İlgili Kişi Olarak Haklarınız</h2>
        <p>KVKK’nın 11. maddesi uyarınca veri sahipleri;</p>
        <ul>
          <li>Kişisel veri işlenip işlenmediğini öğrenme,</li>
          <li>İşlenmişse buna ilişkin bilgi talep etme,</li>
          <li>Amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
          <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,</li>
          <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme haklarına sahiptir.</li>
        </ul>

        <h2>5. Başvuru Yöntemi</h2>
        <p>KVKK kapsamındaki taleplerinizi <strong>legal@peonycollective.com</strong> adresine güvenli elektronik imza veya mobil imza ile imzalayarak iletebilirsiniz.</p>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/" className="text-xs font-bold uppercase tracking-widest text-black hover:text-[#AF9164] transition-colors">
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </main>
  )
}
