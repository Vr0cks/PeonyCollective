'use client'

import Link from 'next/link'
import { useSettings } from '@/src/context/SettingsContext'

export default function DistanceSalesClient() {
  const { language } = useSettings()

  if (language === 'en') {
    return (
      <main className="min-h-screen bg-white py-24 px-6">
        <div className="max-w-[800px] mx-auto prose prose-sm sm:prose-base prose-zinc">
          <h1 className="text-4xl serif-display mb-8">Distance Sales Agreement</h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-12">Last Updated: July 22, 2026</p>

          <h2>1. Parties</h2>
          <p>This Agreement is concluded between the parties specified below under the following terms and conditions.</p>
          <p><strong>SELLER / INTERMEDIARY SERVICE PROVIDER:</strong><br />
          Title: Peony Collective<br />
          Address: Merkez Mah. Üsküdar Cad. No: 57 İç Kapı No: 1, 34788 Çekmeköy / Istanbul, Turkey<br />
          Phone: +90 (552) 365 20 93<br />
          Email: info@peonycollective.com<br />
          Tax No: 8590652178 (Sarigazi Tax Office)</p>

          <p><strong>BUYER:</strong><br />
          The name and address details specified on the Platform by the Buyer during order placement shall apply.</p>

          <h2>2. Subject of Agreement</h2>
          <p>The subject of this Agreement is the determination of rights and obligations pursuant to Consumer Protection Law No. 6502 and Distance Contracts Regulation regarding the sale and delivery of pre-owned luxury items ordered electronically via Peony Collective.</p>

          <h2>3. Contract Product and Payment Details</h2>
          <p>The item title, quantity, total price including taxes, payment method, and delivery information consist of the details approved by the Buyer during checkout.</p>

          <h2>4. General Provisions</h2>
          <ul>
            <li>The Buyer declares having read and confirmed the primary characteristics, sale price, payment method, and delivery details of the product electronically prior to order completion.</li>
            <li>The product is delivered to the person/entity at the address indicated by the Buyer within the statutory 30-day limit.</li>
            <li>Item authenticity verification is conducted by Peony Lab. Orders failing verification are cancelled and fully refunded.</li>
          </ul>

          <h2>5. Right of Withdrawal</h2>
          <p>Buyers may exercise their right of withdrawal within 14 days of receipt without legal penalty. However, for luxury security, if the attached <strong>Peony Lock (Security Seal)</strong> has been tampered with, cut, or damaged, the right of withdrawal cannot be exercised.</p>

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
        <h1 className="text-4xl serif-display mb-8">Mesafeli Satış Sözleşmesi</h1>
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-12">Son Güncelleme: 22 Temmuz 2026</p>
        
        <h2>1. Taraflar</h2>
        <p>İşbu Sözleşme, aşağıdaki taraflar arasında aşağıda belirtilen hüküm ve şartlar çerçevesinde imzalanmıştır.</p>
        <p><strong>SATICI / ARACI HİZMET SAĞLAYICI:</strong><br />
        Ünvanı: Peony Collective<br />
        Adresi: Merkez Mah. Üsküdar Cad. No: 57 İç Kapı No: 1, 34788 Çekmeköy / İstanbul<br />
        Telefon: +90 (552) 365 20 93<br />
        E-posta: info@peonycollective.com<br />
        Vergi No: 8590652178 (Sarıgazi Vergi Dairesi)</p>
        
        <p><strong>ALICI:</strong><br />
        Sipariş verirken Platform'da belirtilen ad ve adres bilgileri esas alınır.</p>

        <h2>2. Sözleşmenin Konusu</h2>
        <p>İşbu Sözleşme'nin konusu, Alıcı'nın Satıcı'ya ait Peony Collective platformu üzerinden elektronik ortamda siparişini verdiği aşağıda nitelikleri ve satış fiyatı belirtilen ürünün satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.</p>

        <h2>3. Sözleşme Konusu Ürün ve Ödeme Bilgileri</h2>
        <p>Ürünün adı, adedi, KDV dahil satış bedeli, ödeme şekli ve teslimat bilgileri sipariş esnasında Alıcı tarafından onaylanan bilgilerden oluşmaktadır.</p>

        <h2>4. Genel Hükümler</h2>
        <ul>
          <li>Alıcı, sözleşme konusu ürünün temel nitelikleri, satış fiyatı ve ödeme şekli ile teslimata ilişkin ön bilgileri okuyup bilgi sahibi olduğunu ve elektronik ortamda gerekli teyidi verdiğini beyan eder.</li>
          <li>Sözleşme konusu ürün, Alıcı'nın gösterdiği adresteki kişi/kuruluşa, yasal 30 günlük süreyi aşmamak koşulu ile teslim edilir.</li>
          <li>Ürünlerin orijinallik kontrolü Peony Lab bünyesinde gerçekleştirilmekte olup, kontrol aşamasını geçemeyen ürünlerin satışı iptal edilir ve tutar Alıcı'ya iade edilir.</li>
        </ul>

        <h2>5. Cayma Hakkı</h2>
        <p>Alıcı, sözleşme konusu ürünün kendisine veya gösterdiği adresteki kişi/kuruluşa tesliminden itibaren 14 (ondört) gün içinde hiçbir hukuki ve cezai sorumluluk üstlenmeksizin ve hiçbir gerekçe göstermeksizin cayma hakkını kullanabilir. Ancak, lüks segment ürünlerin güvenliği için ürüne iliştirilmiş olan <strong>Peony Lock (Güvenlik Mührü)</strong> sökülmüş, kesilmiş veya zarar görmüş ise cayma hakkı kullanılamaz.</p>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/" className="text-xs font-bold uppercase tracking-widest text-black hover:text-[#AF9164] transition-colors">
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </main>
  )
}
