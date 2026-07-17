'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { signup, login, signInWithProvider, resetPassword } from './actions'

export default function AuthPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState<string | null>(null)
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  
  const [showPassword, setShowPassword] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')

  // Basit şifre gücü hesaplama
  const calculatePasswordStrength = (pass: string) => {
    let score = 0
    if (pass.length > 7) score += 1
    if (/[A-Z]/.test(pass)) score += 1
    if (/[0-9]/.test(pass)) score += 1
    if (/[^A-Za-z0-9]/.test(pass)) score += 1
    return score
  }

  const strengthScore = calculatePasswordStrength(passwordInput)
  const strengthLabels = ['Çok Zayıf', 'Zayıf', 'Orta', 'Güçlü', 'Çok Güçlü']
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-emerald-600']

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
      if (isForgotPassword) {
        const result = await resetPassword(formData)
        if (result?.error) {
          setMessage(result.error)
        } else if (result?.message) {
          setMessage(result.message)
        }
      } else if (isLogin) {
        const result = await login(formData)
        if (result?.error) {
          setMessage(result.error)
        } else if (result?.success) {
          router.push('/')
          router.refresh()
        }
      } else {
        const result = await signup(formData)
        if (result?.error) {
          setMessage(result.error)
        } else if (result?.message) {
          setMessage(result.message)
        }
      }
    } catch (error) {
      const err = error as Error
      setMessage(err.message || 'Bir hata oluştu.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    try {
      setSocialLoading(provider)
      const origin = typeof window !== 'undefined' ? window.location.origin : 'https://peony-collective.vercel.app'
      const result = await signInWithProvider(provider, origin)
      if (result?.error) {
        setMessage(result.error)
        setSocialLoading(null)
      } else if (result?.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      setMessage('Sosyal giriş sırasında bir hata oluştu.')
      setSocialLoading(null)
    }
  }

  return (
    <main className="min-h-screen bg-[#F9F9F8] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl shadow-black/5 border border-gray-100">
        
        {/* Başlık ve Sekmeler */}
        <div className="text-center mb-8">
          <h1 className="text-3xl serif-display italic tracking-widest uppercase mb-6 text-gray-900">
            {isForgotPassword ? 'Şifremi Unuttum' : isLogin ? 'Giriş' : 'Kayıt Ol'}
          </h1>
          
          {!isForgotPassword && (
            <div className="flex bg-gray-50 p-1 rounded-full relative">
              <button 
                type="button"
                onClick={() => { setIsLogin(true); setMessage(''); setPasswordInput('') }}
                className={`flex-1 py-2 text-[10px] sans-detail z-10 transition-colors uppercase tracking-widest font-bold ${isLogin ? 'text-white' : 'text-gray-400 hover:text-black'}`}
              >
                Giriş Yap
              </button>
              <button 
                type="button"
                onClick={() => { setIsLogin(false); setMessage(''); setPasswordInput('') }}
                className={`flex-1 py-2 text-[10px] sans-detail z-10 transition-colors uppercase tracking-widest font-bold ${!isLogin ? 'text-white' : 'text-gray-400 hover:text-black'}`}
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
          )}
        </div>

        {/* ─── Sosyal Giriş Butonları ─── */}
        {!isForgotPassword && (
          <>
            <div className="space-y-3 mb-6">
          <button
            type="button"
            onClick={() => handleSocialLogin('google')}
            disabled={!!socialLoading}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 py-3.5 rounded-xl text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50 cursor-pointer group"
          >
            {socialLoading === 'google' ? (
              <span className="text-xs text-gray-400">Yönlendiriliyor...</span>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" className="group-hover:scale-110 transition-transform">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-gray-700">Google ile Devam Et</span>
              </>
            )}
          </button>

            </div>

            {/* ─── Ayırıcı ─── */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">veya e-posta ile</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>
          </>
        )}

        {message && (
          <div className="mb-6 p-4 bg-black text-white border border-gray-800 rounded-xl text-xs font-bold text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <AnimatePresence mode="popLayout">
            {!isLogin && !isForgotPassword && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-5 overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Ad</label>
                    <input name="first_name" required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:bg-white focus:border-black transition-all outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Soyad</label>
                    <input name="last_name" required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:bg-white focus:border-black transition-all outline-none" />
                  </div>
                </div>

                {/* Rol Seçici */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Platform Amacınız</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRole('buyer')}
                      className={`py-3 px-4 border rounded-xl text-xs font-bold text-left transition-all ${role === 'buyer' ? 'border-black bg-black text-white shadow-lg' : 'border-gray-200 text-gray-500 hover:border-gray-400'}`}
                    >
                      <span className="block text-[10px] uppercase opacity-70 mb-1">Koleksiyoner</span>
                      Alışveriş Yap
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('seller')}
                      className={`py-3 px-4 border rounded-xl text-xs font-bold text-left transition-all ${role === 'seller' ? 'border-[#AF9164] bg-[#AF9164] text-white shadow-lg' : 'border-gray-200 text-gray-500 hover:border-gray-400'}`}
                    >
                      <span className="block text-[10px] uppercase opacity-70 mb-1">Küratör</span>
                      Satış Yap
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">E-Posta</label>
            <input type="email" name="email" required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:bg-white focus:border-black transition-all outline-none" />
          </div>

          <AnimatePresence mode="popLayout">
            {!isForgotPassword && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="relative"
              >
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2 flex justify-between">
                  <span>Şifre</span>
                  {isLogin && (
                    <button type="button" onClick={() => { setIsForgotPassword(true); setMessage(''); }} className="text-[#AF9164] hover:underline cursor-pointer">
                      Şifremi Unuttum
                    </button>
                  )}
                </label>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    name="password" 
                    required={!isForgotPassword} 
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:bg-white focus:border-black transition-all outline-none pr-12" 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>

                {/* Kayıt Modunda Şifre Gücü Göstergesi */}
                {!isLogin && passwordInput.length > 0 && (
                  <div className="mt-3">
                    <div className="flex gap-1 mb-1">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className={`h-1 flex-1 rounded-full ${i < strengthScore ? strengthColors[strengthScore] : 'bg-gray-200'}`}></div>
                      ))}
                    </div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest text-right">{strengthLabels[strengthScore]}</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Giriş Modunda Beni Hatırla */}
          <AnimatePresence>
            {isLogin && !isForgotPassword && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 pt-1"
              >
                <input type="checkbox" id="remember" className="w-4 h-4 accent-black rounded border-gray-300" />
                <label htmlFor="remember" className="text-xs text-gray-500">Beni hatırla</label>
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-zinc-800 hover:shadow-xl hover:-translate-y-0.5 transition-all mt-6 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? 'İşleniyor...' : isForgotPassword ? 'Sıfırlama Linki Gönder' : isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
          </button>

          {isForgotPassword && (
            <div className="text-center mt-4">
              <button 
                type="button" 
                onClick={() => { setIsForgotPassword(false); setMessage(''); }}
                className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
              >
                Giriş Ekranına Dön
              </button>
            </div>
          )}
        </form>
      </div>
    </main>
  )
}