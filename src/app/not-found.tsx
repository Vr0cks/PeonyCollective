import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-[#F9F9F8] flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-2xl w-full flex flex-col items-center">
        <h1 className="text-8xl md:text-9xl serif-display mb-4 text-gray-200">404</h1>
        <h2 className="text-3xl md:text-4xl serif-display mb-6">Sayfa Bulunamadı</h2>
        <p className="text-gray-500 font-light mb-12 max-w-md leading-relaxed">
          Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanılamıyor olabilir. Lüks koleksiyonumuzu incelemeye devam edebilirsiniz.
        </p>
        <Link href="/" className="bg-black text-white px-12 py-4 uppercase tracking-widest text-xs font-bold hover:bg-[#AF9164] transition-colors">
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  )
}
