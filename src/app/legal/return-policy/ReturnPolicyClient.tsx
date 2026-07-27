'use client'

import Link from 'next/link'
import { useSettings } from '@/src/context/SettingsContext'

export default function ReturnPolicyClient() {
  const { language } = useSettings()

  if (language === 'en') {
    return (
      <main className="min-h-screen bg-white py-24 px-6">
        <div className="max-w-[800px] mx-auto prose prose-sm sm:prose-base prose-zinc">
          <h1 className="text-4xl serif-display mb-8">Cancellations & Return Policy</h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-12">Last Updated: July 22, 2026</p>

          <h2>1. Order Cancellation</h2>
          <p>Orders can be cancelled prior to dispatch or before entering the Peony Lab inspection process via My Account &gt; My Orders or by contacting support@peonycollective.com. Refunds for cancelled orders are processed within 1-3 business days.</p>

          <h2>2. Return Process and Right of Withdrawal</h2>
          <p>Under Consumer Protection Law No. 6502, buyers have the right to return items within 14 days of receipt without providing a reason.</p>

          <h2>3. Return Conditions</h2>
          <p>Luxury archive items returned must remain in resalable condition. In this context:</p>
          <ul>
            <li>The original <strong>Peony Lock (Security Seal)</strong> attached to the item must strictly remain intact, uncut, and untampered.</li>
            <li>Certificates, dust bags, boxes, and accessories delivered with the item must be returned in full.</li>
            <li>Items exhibiting signs of post-delivery usage or wear cannot be accepted for return.</li>
          </ul>

          <h2>4. Refund Processing</h2>
          <p>Upon inspection and approval by Peony Lab, refunded amounts are returned via your payment method (processed through PayTR to your card) within 7 business days.</p>

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
        <h1 className="text-4xl serif-display mb-8">İptal ve İade Koşulları</h1>
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-12">Son Güncelleme: 22 Temmuz 2026</p>
        
        <h2>1. Sipariş İptali</h2>
        <p>Siparişlerinizi ürün kargolanmadan veya Peony Lab ekspertiz sürecine girmeden önce Hesabım &gt; Siparişlerim alanından veya support@peonycollective.com adresine yazarak iptal edebilirsiniz. İptal edilen siparişlerin ücret iadesi 1-3 iş günü içerisinde gerçekleştirilir.</p>

        <h2>2. İade Süreci ve Cayma Hakkı</h2>
        <p>Alıcılar, 6502 sayılı Tüketicinin Korunması Hakkında Kanun uyarınca ürünü teslim aldıkları tarihten itibaren 14 gün içerisinde herhangi bir gerekçe göstermeksizin iade etme hakkına sahiptir.</p>

        <h2>3. İade Şartları</h2>
        <p>İade edilecek lüks segment ürünlerin tekrar satışa sunulabilir durumda olması gerekmektedir. Bu kapsamda:</p>
        <ul>
          <li>Ürünün üzerindeki orijinal <strong>Peony Lock (Güvenlik Mührü)</strong> kesinlikle sökülmemiş veya kesilmemiş olmalıdır.</li>
          <li>Ürünle birlikte gönderilen sertifikalar, toz torbaları, kutular ve diğer aksesuarlar eksiksiz iade edilmelidir.</li>
          <li>Kullanım kaynaklı deformasyon oluşmuş ürünlerin iadesi kabul edilmez.</li>
        </ul>

        <h2>4. Geri Ödeme</h2>
        <p>İade edilen ürün Peony Lab tarafından incelenip onaylandıktan sonra, ödediğiniz tutar ödeme yönteminizle (PayTR aracılığıyla kartınıza) 7 iş günü içerisinde iade edilir.</p>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/" className="text-xs font-bold uppercase tracking-widest text-black hover:text-[#AF9164] transition-colors">
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </main>
  )
}
