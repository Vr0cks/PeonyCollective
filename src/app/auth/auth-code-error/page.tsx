import Link from 'next/link'
import { AlertCircle } from 'lucide-react'

export default function AuthCodeError() {
  return (
    <main className="min-h-screen bg-[#FCFCFB] flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white p-12 rounded-[2.5rem] shadow-xl shadow-gray-500/5 border border-gray-100 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-8">
          <AlertCircle size={32} />
        </div>
        
        <h1 className="text-3xl font-playfair italic mb-4">Doğrulama Hatası</h1>
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 leading-relaxed mb-10">
          Giriş anahtarı geçersiz veya süresi dolmuş olabilir. Lütfen tekrar giriş yapmayı deneyin.
        </p>

        <Link 
          href="/login" 
          className="block w-full bg-black text-white py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all"
        >
          Giriş Sayfasına Dön
        </Link>
      </div>
    </main>
  )
}
