'use client'

import { useState } from 'react'
import { createClient } from '@/src/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setMessage('')

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({
        password: password
      })

      if (error) {
        setError(error.message)
      } else {
        setMessage('Şifreniz başarıyla güncellendi. Yönlendiriliyorsunuz...')
        setTimeout(() => {
          router.push('/dashboard')
        }, 2000)
      }
    } catch (err) {
      setError('Bir hata oluştu.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-[80vh] bg-[#FCFCFB] flex items-center justify-center p-6">
      <div className="w-full max-w-[400px] bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h1 className="text-2xl serif-display italic tracking-widest uppercase mb-6 text-center text-gray-900">
          Yeni Şifre
        </h1>
        
        {error && <div className="mb-6 p-4 bg-red-50 text-red-600 text-[10px] uppercase tracking-widest font-bold text-center rounded-xl">{error}</div>}
        {message && <div className="mb-6 p-4 bg-green-50 text-green-600 text-[10px] uppercase tracking-widest font-bold text-center rounded-xl">{message}</div>}

        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Yeni Şifreniz</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:bg-white focus:border-black transition-all outline-none" 
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? 'Güncelleniyor...' : 'Şifreyi Güncelle'}
          </button>
        </form>
      </div>
    </main>
  )
}
