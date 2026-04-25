import Link from 'next/link'

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto">
          <span className="text-3xl">✨</span>
        </div>
        <h1 className="text-3xl font-light tracking-tighter uppercase">Siparişiniz Alındı!</h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          Harika bir seçim! Çantanız en kısa sürede kargoya verilecek. 
          Sipariş detaylarınıza hesabınızdan ulaşabilirsiniz.
        </p>
        <div className="pt-8">
          <Link 
            href="/" 
            className="inline-block bg-black text-white px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all"
          >
            Alışverişe Devam Et
          </Link>
        </div>
      </div>
    </div>
  )
}
