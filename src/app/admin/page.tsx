import { createClient } from '@/src/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { updateProductStatus } from './actions'

export default async function AdminPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 font-medium text-lg">Bu sayfaya erişim yetkiniz yok.</p>
      </div>
    )
  }

  const { data: pendingProducts, error } = await supabase
    .from('products')
    .select(`
      *,
      profiles:seller_id (first_name, last_name)
    `)
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  if (error) {
    console.error("Ürünler çekilirken hata:", error)
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-10 flex flex-col md:flex-row md:justify-between md:items-end border-b border-gray-200 pb-6 gap-4">
          <div>
            <h1 className="text-3xl font-light tracking-widest uppercase mb-2 text-gray-900">Yönetim Paneli</h1>
            <p className="text-gray-500 text-sm">Orijinallik ve kalite onayı bekleyen lüks çantalar.</p>
          </div>
          <div className="inline-flex items-center bg-black text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
            {pendingProducts?.length || 0} İncelenecek Ürün
          </div>
        </div>

        {(!pendingProducts || pendingProducts.length === 0) ? (
          <div className="bg-white p-16 text-center rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center">
            <div className="w-16 h-16 mb-4 bg-gray-50 rounded-full flex items-center justify-center">
              <span className="text-2xl text-gray-300">✓</span>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Tüm ürünler incelendi</h3>
            <p className="text-gray-500">Şu an vitrine çıkmayı bekleyen yeni bir ürün bulunmuyor.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {pendingProducts.map((product) => {
              const approveAction = updateProductStatus.bind(null, product.id, 'approved')
              const rejectAction = updateProductStatus.bind(null, product.id, 'rejected')

              const sellerName = product.profiles 
                ? `${(product.profiles as any).first_name} ${(product.profiles as any).last_name}` 
                : 'Bilinmeyen Satıcı'

              // Çantanın ilk görselini alıyoruz
              const firstImage = product.public_images && product.public_images.length > 0 
                ? product.public_images[0] 
                : null;

              return (
                <div key={product.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col group">
                  
                  {/* Görsel Alanı */}
                  <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                    {firstImage ? (
                      <img 
                        src={firstImage} 
                        alt={product.model_name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-medium">
                        Görsel Yok
                      </div>
                    )}

                    {/* Detaylı İncele Butonu (Hover) */}
                    <Link 
                      href={`/admin/product/${product.id}`}
                      className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 bg-black/40 backdrop-blur-sm transition-all flex items-center justify-center text-white font-bold uppercase tracking-widest text-xs"
                    >
                      Detaylı İncele
                    </Link>
                    
                    {/* Görsel Üzeri Rozetler */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                      <span className="bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        {product.condition}
                      </span>
                      <span className="bg-black/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full text-center shadow-sm">
                        {product.public_images?.length || 0} Foto
                      </span>
                    </div>
                  </div>

                  {/* İçerik Alanı */}
                  <div className="p-5 flex-grow flex flex-col">
                    <div className="mb-3">
                      <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide">{product.brand}</h2>
                      <h3 className="text-sm text-gray-500">{product.model_name}</h3>
                    </div>
                    
                    <p className="text-xs text-gray-600 mb-4 line-clamp-2 leading-relaxed flex-grow">
                      {product.description}
                    </p>
                    
                    <div className="flex justify-between items-end pt-4 border-t border-gray-50 mb-4">
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Satıcı</p>
                        <p className="text-xs font-semibold text-gray-800">{sellerName}</p>
                      </div>
                      <span className="text-lg font-bold text-black tracking-tight">
                        {product.price.toLocaleString('tr-TR')} ₺
                      </span>
                    </div>
                  </div>

                  {/* İşlem Butonları */}
                  <div className="grid grid-cols-2 gap-px bg-gray-100">
                    <form action={approveAction}>
                      <button className="w-full py-3.5 text-xs font-bold text-white bg-black hover:bg-gray-800 transition-colors uppercase tracking-widest flex justify-center items-center">
                        Onayla
                      </button>
                    </form>
                    <form action={rejectAction}>
                      <button className="w-full py-3.5 text-xs font-bold text-red-600 bg-white hover:bg-red-50 hover:text-red-700 transition-colors uppercase tracking-widest flex justify-center items-center">
                        Reddet
                      </button>
                    </form>
                  </div>
                  
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}