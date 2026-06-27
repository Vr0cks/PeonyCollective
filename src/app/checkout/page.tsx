'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/src/context/CartContext'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ShieldCheck, Truck, LogIn, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Script from 'next/script'
import { createClient } from '@/src/utils/supabase/client'

export default function CheckoutPage() {
  const { cartItems, cartTotal } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null) // null = kontrol ediliyor

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setIsLoggedIn(!!user)
      
      if (user) {
        // Profil bilgilerini çekip formu otomatik doldur
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
        if (profile) {
          setFormData(prev => ({
            ...prev,
            firstName: profile.first_name || '',
            lastName: profile.last_name || '',
            email: user.email || '',
            phone: profile.phone_number || '',
            address: profile.address || '',
          }))
        }
      }
    }
    checkAuth()
  }, [])

  // Adres Formu State'leri
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    zipCode: '',
    isGift: false,
    giftNote: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const [paytrToken, setPaytrToken] = useState<string | null>(null)

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setCheckoutError(null)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems, formData })
      })

      const data = await res.json()

      if (res.status === 401) {
        // Oturum süresi dolmuş, login'e yönlendir
        router.push('/login?redirect=/checkout')
        return
      }

      if (res.ok && data.token) {
        setPaytrToken(data.token)
      } else {
        setCheckoutError(data.error || 'Ödeme başlatılamadı. Lütfen tekrar deneyin.')
      }
    } catch (error) {
      setCheckoutError('Bağlantı hatası oluştu. İnternet bağlantınızı kontrol edin.')
    } finally {
      setIsProcessing(false)
    }
  }

  // Giriş durumu kontrol ediliyor
  if (isLoggedIn === null) {
    return (
      <div className="min-h-screen bg-[#F9F9F8] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Giriş yapılmamış
  if (isLoggedIn === false) {
    return (
      <div className="min-h-screen bg-[#F9F9F8] flex flex-col items-center justify-center pt-24 px-6 text-center">
        <div className="bg-white p-16 md:p-20 border border-gray-100 shadow-2xl shadow-black/5 max-w-lg w-full">
          <LogIn size={48} className="mx-auto mb-8 text-black" strokeWidth={1} />
          <h1 className="text-3xl serif-display mb-4">Giriş Gerekli</h1>
          <p className="text-gray-500 font-light mb-10 leading-relaxed">
            Ödeme yapabilmek için Peony hesabınıza giriş yapmanız gerekmektedir.
          </p>
          <Link
            href="/login?redirect=/checkout"
            className="block w-full bg-black text-white py-4 uppercase tracking-widest text-xs font-bold hover:bg-[#AF9164] transition-colors text-center mb-4"
          >
            Giriş Yap
          </Link>
          <Link href="/" className="text-xs text-gray-400 hover:text-black transition-colors uppercase tracking-widest">
            Alışverişe Dön
          </Link>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#F9F9F8] flex flex-col items-center justify-center pt-24 px-6 text-center">
        <h1 className="text-4xl serif-display mb-4">Sepetiniz Boş</h1>
        <p className="text-gray-500 font-light mb-8 max-w-md">Satın almak istediğiniz bir ürün bulunmuyor. Koleksiyonlarımızı incelemeye devam edebilirsiniz.</p>
        <Link href="/#collection" className="bg-black text-white px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-[#AF9164] transition-colors">
          Alışverişe Dön
        </Link>
      </div>
    )
  }

  const inputClasses = "w-full border-b border-gray-300 py-3 bg-transparent focus:border-black focus:outline-none transition-colors text-sm"

  return (
    <div className="min-h-screen bg-[#F9F9F8] pt-24 pb-32">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors mb-12">
          <ArrowLeft size={16} /> Geri Dön
        </button>

        <h1 className="text-4xl md:text-5xl serif-display mb-12">Güvenli Ödeme</h1>

        {paytrToken ? (
          <div className="bg-white border border-gray-100 shadow-xl shadow-black/5 p-4 rounded-lg w-full min-h-[850px]">
            <Script src="https://www.paytr.com/js/iframeResizer.min.js" strategy="lazyOnload" onLoad={() => {
               // @ts-ignore
               if(window.iFrameResize) window.iFrameResize({},'#paytriframe')
            }} />
            <iframe 
              src={`https://www.paytr.com/odeme/guvenli/${paytrToken}`} 
              id="paytriframe" 
              frameBorder="0" 
              scrolling="no" 
              className="w-full"
              style={{ minHeight: '800px' }}
            ></iframe>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Sol: Adres ve Bilgiler Formu */}
            <div className="lg:col-span-7 space-y-12">
              
              <form id="checkout-form" onSubmit={handleCheckout} className="space-y-10 bg-white p-8 md:p-12 border border-gray-100 shadow-xl shadow-black/5">
                <div>
                  <h2 className="text-xl serif-display mb-6">İletişim Bilgileri</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Ad</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className={inputClasses} />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Soyad</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className={inputClasses} />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">E-Posta</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClasses} />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Telefon</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className={inputClasses} />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl serif-display mb-6">Teslimat Adresi</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Açık Adres</label>
                      <textarea name="address" value={formData.address} onChange={handleChange} required className={`${inputClasses} resize-none h-20`} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">İl</label>
                        <input type="text" name="city" value={formData.city} onChange={handleChange} required className={inputClasses} />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">İlçe</label>
                        <input type="text" name="district" value={formData.district} onChange={handleChange} required className={inputClasses} />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Posta Kodu</label>
                        <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} required className={inputClasses} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hediye Seçeneği */}
                <div className="pt-8 border-t border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <input 
                      type="checkbox" 
                      id="isGift" 
                      name="isGift" 
                      checked={formData.isGift} 
                      onChange={handleChange}
                      className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black accent-black"
                    />
                    <label htmlFor="isGift" className="text-sm font-medium cursor-pointer">Bu sipariş bir hediye</label>
                  </div>
                  
                  {formData.isGift && (
                    <div className="mt-4 animate-in fade-in slide-in-from-top-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Hediye Notu (İsteğe Bağlı)</label>
                      <textarea 
                        name="giftNote" 
                        value={formData.giftNote} 
                        onChange={handleChange} 
                        placeholder="Hediye kartına yazılacak mesajınızı buraya ekleyebilirsiniz..."
                        className={`${inputClasses} resize-none h-20 bg-gray-50 p-4 border border-gray-200 rounded-md`} 
                      />
                      <p className="text-[10px] text-gray-400 mt-2">Notunuz özel Peony Collective hediye zarfında gönderilecektir. İrsaliye faturasında fiyat gizlenecektir.</p>
                    </div>
                  )}
                </div>
              </form>

              <div className="flex items-start gap-4 p-6 bg-gray-100 rounded-lg">
                <ShieldCheck className="text-emerald-600 shrink-0 mt-1" size={24} />
                <div>
                  <p className="text-sm font-bold mb-1">Gümrük ve Orijinallik Garantisi</p>
                  <p className="text-xs text-gray-500 leading-relaxed">Tüm ürünler Peony Lab tarafından fiziksel ve teknolojik (Entrupy) doğrulama sürecinden geçirilir. Ürün kargoya verilmeden önce orijinalliği onaylanmış durumdadır.</p>
                </div>
              </div>
            </div>

            {/* Sağ: Sipariş Özeti */}
            <div className="lg:col-span-5 space-y-8 sticky top-32">
              <div className="bg-white p-8 border border-gray-100 shadow-xl shadow-black/5">
                <h2 className="text-xl serif-display mb-6 pb-6 border-b border-gray-100">Sipariş Özeti</h2>
                
                <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative w-20 h-20 rounded bg-gray-50 shrink-0">
                        {item.public_images && item.public_images[0] && (
                          <Image src={item.public_images[0]} fill className="object-cover rounded" alt={item.model_name || 'Ürün'} />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#AF9164] mb-1">{item.brand}</p>
                        <p className="text-sm font-medium leading-tight mb-2">{item.model_name}</p>
                        <p className="text-sm text-gray-500">{item.price?.toLocaleString('tr-TR')} ₺</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Ara Toplam</span>
                    <span>{cartTotal.toLocaleString('tr-TR')} ₺</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-2"><Truck size={16}/> VIP Kargo</span>
                    <span>Ücretsiz</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-black">
                    <span className="font-bold">Ödenecek Tutar</span>
                    <span className="text-2xl serif-display">{cartTotal.toLocaleString('tr-TR')} ₺</span>
                  </div>
                </div>

                {checkoutError && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded flex items-start gap-3">
                    <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-red-700 font-medium">{checkoutError}</p>
                  </div>
                )}

                <button 
                  type="submit" 
                  form="checkout-form"
                  disabled={isProcessing}
                  className={`w-full mt-8 py-4 uppercase tracking-widest text-xs font-bold transition-all ${isProcessing ? 'bg-gray-200 text-gray-500' : 'bg-black text-white hover:bg-[#AF9164]'}`}
                >
                  {isProcessing ? 'İŞLENİYOR...' : 'ÖDEMEYİ TAMAMLA'}
                </button>
              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  )
}
