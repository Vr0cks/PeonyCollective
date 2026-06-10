'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { signup, login, signInWithProvider } from './actions'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState<string | null>(null)

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
        // Server-side redirect ile anasayfaya yönlendirilecek
      } else {
        const result = await signup(formData)
        if (result?.error) {
          setMessage(result.error)
        } else if (result?.message) {
          setMessage(result.message)
        }
      }
    } catch (error) {
      const err = error as Error & { digest?: string }
      // NEXT_REDIRECT hatası normal - redirect çalışıyor demektir
      if (err.digest?.startsWith('NEXT_REDIRECT')) {
        return
      }
      setMessage(err.message || 'Bir hata oluştu.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    try {
      setSocialLoading(provider)
      await signInWithProvider(provider)
    } catch (error) {
      const err = error as Error & { digest?: string }
      if (err.digest?.startsWith('NEXT_REDIRECT')) {
        return
      }
      setMessage(err.message || 'Sosyal giriş sırasında bir hata oluştu.')
      setSocialLoading(null)
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

        {/* ─── Sosyal Giriş Butonları ─── */}
        <div className="space-y-3 mb-6">
          <button
            type="button"
            onClick={() => handleSocialLogin('google')}
            disabled={!!socialLoading}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 py-3.5 rounded-xl text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50 cursor-pointer"
          >
            {socialLoading === 'google' ? (
              <span className="text-xs text-gray-400">Yönlendiriliyor...</span>
            ) : (
              <>
                {/* Google SVG Icon */}
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-gray-700">Google ile Devam Et</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin('facebook')}
            disabled={!!socialLoading}
            className="w-full flex items-center justify-center gap-3 bg-[#1877F2] py-3.5 rounded-xl text-sm font-medium text-white hover:bg-[#1565D8] transition-all disabled:opacity-50 cursor-pointer"
          >
            {socialLoading === 'facebook' ? (
              <span className="text-xs text-white/70">Yönlendiriliyor...</span>
            ) : (
              <>
                {/* Facebook SVG Icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook ile Devam Et</span>
              </>
            )}
          </button>
        </div>

        {/* ─── Ayırıcı ─── */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">veya</span>
          <div className="flex-1 h-px bg-gray-100" />
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
                  <label className="text-[10px] sans-detail text-gray-400 block">Peony Collective&apos;e Katılış Amacınız</label>
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
            className="w-full bg-black text-white py-4 rounded-xl sans-detail hover:bg-gray-800 transition-all mt-4 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? 'İşleniyor...' : isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
          </button>
        </form>
      </div>
    </main>
  )
}