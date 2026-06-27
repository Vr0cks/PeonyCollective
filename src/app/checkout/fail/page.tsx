import Link from 'next/link'
import { XCircle } from 'lucide-react'

export default function CheckoutFailPage() {
  return (
    <div className="min-h-screen bg-[#F9F9F8] flex flex-col items-center justify-center pt-24 px-6 text-center">
      <div className="bg-white p-16 md:p-24 border border-gray-100 shadow-2xl shadow-black/5 max-w-2xl w-full flex flex-col items-center">
        <XCircle className="text-red-600 mb-8" size={64} strokeWidth={1} />
        <h1 className="text-4xl md:text-5xl serif-display mb-6">Ödeme Başarısız</h1>
        <p className="text-gray-500 font-light mb-12 max-w-md leading-relaxed">
          Ödeme işleminiz sırasında bir sorun oluştu veya bankanız tarafından reddedildi. Lütfen kart bilgilerinizi kontrol edip tekrar deneyin.
        </p>
        <Link href="/checkout" className="bg-black text-white px-12 py-4 uppercase tracking-widest text-xs font-bold hover:bg-[#AF9164] transition-colors">
          Tekrar Dene
        </Link>
      </div>
    </div>
  )
}
