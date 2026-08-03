'use client'

import Link from 'next/link'
import { useSettings } from '@/src/context/SettingsContext'

export default function PreInfoClient() {
  const { language } = useSettings()

  if (language === 'en') {
    return (
      <main className="min-h-screen bg-white py-24 px-6">
        <div className="max-w-[800px] mx-auto prose prose-sm sm:prose-base prose-zinc">
          <h1 className="text-4xl serif-display mb-8">Preliminary Information Form</h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-12">Last Updated: July 22, 2026</p>

          <h2>1. Seller / Intermediary Service Provider Information</h2>
          <p>
            Title: Peony Collective<br />
            Address: Merkez Mah. Üsküdar Cad. No: 57 İç Kapı No: 1, 34788 Çekmeköy / Istanbul, Turkey<br />
            Phone: +90 (552) 365 20 93<br />
            Email: info@peonycollective.com<br />
            Tax No: 8590652178 (Sarigazi Tax Office)
          </p>

          <h2>2. Contract Item and Payment Characteristics</h2>
          <p>The primary features, total price inclusive of taxes, and payment options for the item of sale are presented on the Checkout page and order summary.</p>

          <h2>3. Shipping and Delivery Costs</h2>
          <p>Deliveries are fulfilled to the shipping address specified in the Buyer's order form. Courier shipping is complimentary unless indicated otherwise during checkout.</p>

          <h2>4. Right of Withdrawal and Exceptions</h2>
          <p>Buyers have the right of withdrawal within 14 days of receipt. Returned items must retain resale capability with the Peony Lock security seal unopened and intact. Categories such as earrings or swimwear are excluded from withdrawal rights due to hygiene regulations.</p>

          <h2>5. Complaints and Dispute Resolution</h2>
          <p>Buyers may submit inquiries or complaints via the seller contact channels above. Disputes are subject to Consumer Arbitration Committees and Istanbul Consumer Courts up to statutory monetary limits.</p>

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
        <h1 className="text-4xl serif-display mb-8">Ön Bilgilendirme Formu</h1>
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-12">Son Güncelleme: 22 Temmuz 2026</p>
        
        <h2>1. Satıcı / Aracı Hizmet Sağlayıcı Bilgileri</h2>
        <p>
          Ünvanı: Peony Collective<br />
          Adresi: Merkez Mah. Üsküdar Cad. No: 57 İç Kapı No: 1, 34788 Çekmeköy / İstanbul<br />
          Telefon: +90 (552) 365 20 93<br />
          E-posta: info@peonycollective.com<br />
          Vergi No: 8590652178 (Sarıgazi Vergi Dairesi)
        </p>

        <h2>2. Sözleşme Konusu Ürün ve Ödeme Nitelikleri</h2>
        <p>Satışa konu ürünün temel özellikleri, fiyatı, vergiler dahil tutarı ve ödeme yöntemleri ödeme sayfasında (Checkout) ve sipariş özetinde belirtildiği gibidir.</p>

        <h2>3. Teslimat ve Teslimat Masrafları</h2>
        <p>Ürünlerin kargo teslimatı, Alıcı'nın sipariş formunda belirttiği teslimat adresine gerçekleştirilir. Aksi belirtilmedikçe kargo ücreti ücretsizdir veya ödeme sayfasında Alıcı'ya gösterilen bedel kadardır.</p>

        <h2>4. Cayma Hakkı ve İstisnaları</h2>
        <p>Alıcı, ürünü teslim aldığı tarihten itibaren 14 gün içinde cayma hakkına sahiptir. İade edilecek ürünün satılabilirlik özelliğini kaybetmemiş olması ve Peony Lock güvenlik kilidinin açılmamış / zarar görmemiş olması şarttır. Hijyen kuralları gereği küpe, mayo vb. bazı kategorilerde cayma hakkı bulunmamaktadır.</p>

        <h2>5. Şikayet ve Çözüm Yolları</h2>
        <p>Alıcı, şikayet ve taleplerini yukarıdaki iletişim kanallarından Satıcı'ya iletebilir. Uyuşmazlık durumunda, Gümrük ve Ticaret Bakanlığı'nca ilan edilen değere kadar Tüketici Hakem Heyetleri ile İstanbul Tüketici Mahkemeleri yetkilidir.</p>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/" className="text-xs font-bold uppercase tracking-widest text-black hover:text-[#AF9164] transition-colors">
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </main>
  )
}
