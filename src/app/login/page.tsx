'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { signup, login } from './actions'

export default function AuthPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    const formData = new FormData(e.currentTarget)
    
    // Form data içine seçilen rolü de ekliyoruz
    if (!isLogin) {
      formData.append('role', role)
    }

    try {
      if (isLogin) {
        await login(formData)
        router.push('/')
      } else {
        const result = await signup(formData)
        if (result?.message) {
          setMessage(result.message) // "Lütfen e-postanızı doğrulayın" mesajı dönecek
        }
      }
    } catch (error: any) {
      setMessage(error.message || 'Bir hata oluştu.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#F9F9F8] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl shadow-black/5 border border-gray-100">
        
        {/* Başlık ve Sekmeler */}
        <div className="text-center mb-8">
          <h1 className="text-3xl serif-display italic tracking-widest uppercase mb-6 text-gray-900">
            {isLogin ? 'Giriş' : 'Kayıt Ol'}
          </h1>
          
          <div className="flex bg-gray-50 p-1 rounded-full relative">
            <button 
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-[10px] sans-detail z-10 transition-colors ${isLogin ? 'text-white' : 'text-gray-400 hover:text-black'}`}
            >
              Giriş Yap
            </button>
            <button 
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-[10px] sans-detail z-10 transition-colors ${!isLogin ? 'text-white' : 'text-gray-400 hover:text-black'}`}
            >
              Hesap Oluştur
            </button>
            {/* Animasyonlu Sekme Arka Planı */}
            <motion.div 
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-black rounded-full"
              initial={false}
              animate={{ left: isLogin ? '4px' : 'calc(50%)' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-[#AF9164]/10 text-[#AF9164] border border-[#AF9164]/20 rounded-xl text-xs font-bold text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <AnimatePresence mode="popLayout">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-5 overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="text-[10px] sans-detail text-gray-400 block mb-2">Ad</label>
                    <input name="first_name" required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:bg-white focus:border-black transition-all outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] sans-detail text-gray-400 block mb-2">Soyad</label>
                    <input name="last_name" required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:bg-white focus:border-black transition-all outline-none" />
                  </div>
                </div>

                {/* Rol Seçici */}
                <div className="space-y-2">
                  <label className="text-[10px] sans-detail text-gray-400 block">Peony Collective'e Katılış Amacınız</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRole('buyer')}
                      className={`py-3 px-4 border rounded-xl text-xs font-bold text-left transition-all ${role === 'buyer' ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-500 hover:border-gray-400'}`}
                    >
                      <span className="block text-[10px] uppercase opacity-70 mb-1">Koleksiyoner</span>
                      Alışveriş Yapmak
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('seller')}
                      className={`py-3 px-4 border rounded-xl text-xs font-bold text-left transition-all ${role === 'seller' ? 'border-[#AF9164] bg-[#AF9164] text-white' : 'border-gray-200 text-gray-500 hover:border-gray-400'}`}
                    >
                      <span className="block text-[10px] uppercase opacity-70 mb-1">Küratör</span>
                      Satış Yapmak
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="text-[10px] sans-detail text-gray-400 block mb-2">E-Posta</label>
            <input type="email" name="email" required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:bg-white focus:border-black transition-all outline-none" />
          </div>

          <div>
            <label className="text-[10px] sans-detail text-gray-400 block mb-2">Şifre</label>
            <input type="password" name="password" required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:bg-white focus:border-black transition-all outline-none" />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-black text-white py-4 rounded-xl sans-detail hover:bg-gray-800 transition-all mt-4 disabled:opacity-50"
          >
            {isLoading ? 'İşleniyor...' : isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
          </button>
        </form>
      </div>
    </main>
  )
}