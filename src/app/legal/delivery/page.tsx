import Link from 'next/link'

export default function DeliveryPolicyPage() {
  return (
    <main className="min-h-screen bg-white py-24 px-6">
      <div className="max-w-[800px] mx-auto prose prose-sm sm:prose-base prose-zinc">
        <h1 className="text-4xl serif-display mb-8">Teslimat ve Kargo Politikası</h1>
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-12">Son Güncelleme: 22 Temmuz 2026</p>
        
        <h2>1. Kargo Gönderimi ve VIP Teslimat</h2>
        <p>Peony Collective üzerinden satın alınan tüm ürünler, güvenli taşıma standartlarına uygun olarak sigortalı ve VIP kargo ortaklarımız vasıtasıyla gönderilir. Gönderiler ücretsiz olarak gerçekleştirilmektedir.</p>

        <h2>2. Hazırlık ve Ekspertiz Süreci</h2>
        <p>Satın aldığınız ürünler öncelikle fiziksel ve dijital orijinallik doğrulaması (Peony Lab) sürecinden geçirilir. Bu süreç 1-2 iş günü sürmektedir. Doğrulamadan başarıyla geçen ürünler hemen kargoya teslim edilir.</p>

        <h2>3. Teslimat Süreleri</h2>
        <p>Kargoya verilen ürünler, teslimat adresinizin konumuna bağlı olarak genellikle 1-3 iş günü içerisinde tarafınıza ulaştırılır. Pazar günleri ve resmi tatillerde teslimat yapılmamaktadır.</p>

        <h2>4. Teslim Alırken Dikkat Edilmesi Gerekenler</h2>
        <p>Kargo paketini teslim alırken hasarlı olup olmadığını kontrol ediniz. Eğer paket hasarlı ise kargo görevlisine tutanak tutturarak paketi teslim almayınız ve hemen destek ekibimizle iletişime geçiniz.</p>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/" className="text-xs font-bold uppercase tracking-widest text-black hover:text-[#AF9164] transition-colors">
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </main>
  )
}
