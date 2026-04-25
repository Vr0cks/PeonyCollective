import { createClient } from '@/src/utils/supabase/server'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { updateProductStatus } from '../../actions'

export default async function AdminProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  // 1. Yetki Kontrolü
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') redirect('/')

  // 2. Ürün ve Satıcı Detaylarını Çek
  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
      profiles:seller_id (*)
    `)
    .eq('id', id)
    .single()

  if (error || !product) return notFound()

  // Action binding
  const approveAction = updateProductStatus.bind(null, product.id, 'approved')
  const rejectAction = updateProductStatus.bind(null, product.id, 'rejected')

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Üst Navigasyon */}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/admin" className="text-sm text-gray-500 hover:text-black transition-colors flex items-center gap-2">
            ← Panele Dön
          </Link>
          <div className="flex gap-3">
            <form action={rejectAction}>
              <button className="px-6 py-2 border border-red-200 text-red-600 rounded-full text-sm font-semibold hover:bg-red-50 transition-all">
                Reddet
              </button>
            </form>
            <form action={approveAction}>
              <button className="px-8 py-2 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-all">
                Onayla ve Yayınla
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* SOL KOLON: GÖRSELLER */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Ürün Fotoğrafları ({product.public_images?.length})</h3>
            <div className="grid grid-cols-1 gap-4">
              {product.public_images?.map((img: string, idx: number) => (
                <div key={idx} className="aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                  <img src={img} alt={`Görsel ${idx}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            
            {/* Varsa Gizli Belgeler (Fatura vb.) */}
            {product.authenticity_docs && product.authenticity_docs.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-100">
                <h3 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-4 italic">Gizli Belgeler (Sadece Admin Görür)</h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.authenticity_docs.map((doc: string, idx: number) => (
                    <div key={idx} className="aspect-video bg-gray-100 rounded-xl overflow-hidden border-2 border-dashed border-red-100">
                      <img src={doc} alt="Belge" className="w-full h-full object-contain" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SAĞ KOLON: DETAYLAR */}
          <div className="space-y-10">
            
            {/* Başlık ve Fiyat */}
            <div>
              <h1 className="text-4xl font-light text-gray-900 mb-2 uppercase tracking-tighter">{product.brand}</h1>
              <p className="text-xl text-gray-500 font-light mb-4">{product.model_name}</p>
              <div className="text-3xl font-bold text-black tabular-nums">
                {product.price.toLocaleString('tr-TR')} ₺
              </div>
            </div>

            {/* Satıcı Kartı */}
            <Link href={`/admin/seller/${product.seller_id}`} className="block p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-black transition-all group">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Satıcı Bilgileri</p>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 group-hover:underline">
                    {product.profiles.first_name} {product.profiles.last_name}
                  </h4>
                  <p className="text-sm text-gray-500">Satış: {product.profiles.sales_count} | Puan: {product.profiles.rating}⭐</p>
                </div>
                <span className="text-xl text-gray-300 group-hover:text-black transition-colors">→</span>
              </div>
            </Link>

            {/* Teknik Detaylar Tablosu */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2">Teknik Özellikler</h3>
              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <p className="text-gray-500">Kondisyon</p>
                <p className="font-medium text-right">{product.condition}</p>
                
                <p className="text-gray-500">Materyal</p>
                <p className="font-medium text-right">{product.material || 'Belirtilmemiş'}</p>
                
                <p className="text-gray-500">Boyutlar</p>
                <p className="font-medium text-right">{product.dimensions || 'Belirtilmemiş'}</p>
                
                <p className="text-gray-500">Üretim Yılı</p>
                <p className="font-medium text-right">{product.production_year || 'Belirtilmemiş'}</p>
                
                <p className="text-gray-500 font-semibold text-red-600 italic">Seri Numarası</p>
                <p className="font-bold text-right text-red-600">{product.serial_number || 'YOK'}</p>
              </div>
            </div>

            {/* Açıklama */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2">Satıcı Notu</h3>
              <p className="text-gray-700 leading-relaxed italic">"{product.description}"</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
