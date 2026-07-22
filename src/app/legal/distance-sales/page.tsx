import Link from 'next/link'

export default function DistanceSalesPage() {
  return (
    <main className="min-h-screen bg-white py-24 px-6">
      <div className="max-w-[800px] mx-auto prose prose-sm sm:prose-base prose-zinc">
        <h1 className="text-4xl serif-display mb-8">Mesafeli Satış Sözleşmesi</h1>
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-12">Son Güncelleme: 22 Temmuz 2026</p>
        
        <h2>1. Taraflar</h2>
        <p>İşbu Sözleşme, aşağıdaki taraflar arasında aşağıda belirtilen hüküm ve şartlar çerçevesinde imzalanmıştır.</p>
        <p><strong>SATICI / ARACI HİZMET SAĞLAYICI:</strong><br />
        Ünvanı: Peony Collective<br />
        Adresi: Mehmet Akif Mah. Şahinbey Cd. Hacı Tevfikoğulları İş Merkezi No:59, 34774 Çekmeköy / İstanbul<br />
        Telefon: 0850 885 4110<br />
        E-posta: info@peonycollective.com<br />
        Mersis No: [Mersis No]<br />
        Vergi Dairesi / No: [Vergi Dairesi] / [Vergi No]</p>
        
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
