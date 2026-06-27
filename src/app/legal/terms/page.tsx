import Link from 'next/link'

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white py-24 px-6">
      <div className="max-w-[800px] mx-auto prose prose-sm sm:prose-base prose-zinc">
        <h1 className="text-4xl serif-display mb-8">Kullanım Koşulları</h1>
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-12">Son Güncelleme: 27 Haziran 2026</p>
        
        <h2>1. Taraflar ve Kapsam</h2>
        <p>Bu Kullanım Koşulları, Peony Collective ("Platform") ile Platform'u kullanan Alıcı ve Satıcılar arasındaki hukuki ilişkiyi düzenler. Platforma erişim sağlayarak bu koşulları kabul etmiş sayılırsınız.</p>

        <h2>2. Hizmetin Tanımı</h2>
        <p>Peony Collective, lüks ikinci el ürünlerin orijinallik kontrolünden (ekspertiz) geçirilerek güvenli bir şekilde alım satımına aracılık eden bir pazar yeridir. Peony Collective, VIP Hizmet kapsamına girmeyen durumlarda satıcı ve alıcı arasında aracı konumundadır.</p>

        <h2>3. Orijinallik ve Peony Lab Garantisi</h2>
        <p>Platform üzerinden satılan her ürün Peony Lab tarafından 32 noktalı fiziksel inceleme ve 3D Spektral Analiz sürecinden geçirilir. Orijinalliği onaylanmayan ürünler reddedilir ve satıcıya iade edilir. Peony Collective, onayladığı her ürün için ömür boyu orijinallik garantisi verir.</p>

        <h2>4. Satış ve Komisyon</h2>
        <p>Satıcılar, ürünlerini Platform üzerinden satışa sunduklarında belirlenen komisyon oranlarını kabul etmiş olurlar. Komisyon, ürün başarılı bir şekilde satılıp alıcıya teslim edildikten sonra kesilir ve kalan tutar satıcının IBAN hesabına aktarılır.</p>

        <h2>5. İptal ve İade Koşulları</h2>
        <p>Alıcılar, ürünü teslim aldıkları tarihten itibaren 14 gün içinde cayma hakkını kullanabilirler. İade sürecinin geçerli olabilmesi için ürünün üzerindeki güvenlik mührünün (Peony Lock) sökülmemiş veya zarar görmemiş olması zorunludur.</p>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/" className="text-xs font-bold uppercase tracking-widest text-black hover:text-[#AF9164] transition-colors">
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </main>
  )
}
