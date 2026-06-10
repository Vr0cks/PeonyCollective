import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#FCFCFB] px-6 text-center text-[#1A1A1A]">
      <div className="max-w-md space-y-6">
        <h1 className="serif-display text-8xl font-extralight text-[#AF9164] tracking-widest leading-none">
          404
        </h1>
        <p className="sans-detail text-sm uppercase tracking-widest text-[#555555]">
          Sayfa Bulunamadı
        </p>
        <p className="text-zinc-500 font-light text-sm max-w-xs mx-auto">
          Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanılamıyor olabilir.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-[#1A1A1A] text-white hover:bg-[#AF9164] transition-all duration-300 font-light tracking-wider text-xs uppercase"
          >
            Koleksiyona Geri Dön
          </Link>
        </div>
      </div>
    </div>
  )
}
