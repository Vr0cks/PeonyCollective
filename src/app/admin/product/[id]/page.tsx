import { createClient } from '@/src/utils/supabase/server'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { updateProductStatus } from '../../actions'
import { Product, Profile } from '@/src/types'
import SafeImage from '@/src/components/SafeImage'

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
  const { data: productData, error } = await supabase
    .from('products')
    .select(`
      *,
      profiles:seller_id (*)
    `)
    .eq('id', id)
    .single()

  if (error || !productData) return notFound()
  const product = productData as Product
  const sellerProfile = product.profiles as Profile

  // Action binding
  const approveAction = updateProductStatus.bind(null, product.id, 'approved')
  const rejectAction = updateProductStatus.bind(null, product.id, 'rejected')

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 text-[#1A1A1A]">
      <div className="max-w-5xl mx-auto">
        
        {/* Üst Navigasyon */}
        <div className="mb-8 flex items-center justify-between border-b border-gray-100 pb-6">
          <Link href="/admin" className="text-xs uppercase tracking-widest text-gray-500 hover:text-black transition-colors flex items-center gap-2">
            ← Panele Dön
          </Link>
          <div className="flex gap-3">
            <form action={rejectAction}>
              <button className="px-6 py-2.5 border border-red-200 text-red-600 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-red-50 transition-all cursor-pointer">
                Reddet
              </button>
            </form>
            <form action={approveAction}>
              <button className="px-8 py-2.5 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all cursor-pointer">
                Onayla ve Yayınla
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* SOL KOLON: GÖRSELLER */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Ürün Fotoğrafları ({product.public_images?.length || 0})</h3>
            <div className="grid grid-cols-1 gap-4">
              {product.public_images?.map((img: string, idx: number) => (
                <div key={idx} className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                  <Image 
                    src={img} 
                    alt={`Görsel ${idx}`} 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 50vw" 
                    className="object-cover" 
                  />
                </div>
              ))}
            </div>
            
            {/* Varsa Gizli Belgeler (Fatura vb.) */}
            {product.authenticity_docs && product.authenticity_docs.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-100">
                <h3 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-4 italic">Gizli Belgeler (Sadece Admin Görür - 15D İmzalı)</h3>
                <div className="grid grid-cols-2 gap-4">
                  {await Promise.all(
                    product.authenticity_docs.map(async (doc: string, idx: number) => {
                      let signedUrl = doc;
                      if (doc.includes('product-images') && !doc.startsWith('http')) {
                        // Extract relative path inside bucket
                        const path = doc.split('product-images/').pop();
                        if (path) {
                          const { data } = await supabase.storage.from('product-images').createSignedUrl(path, 900); // 15 minutes validity
                          if (data?.signedUrl) signedUrl = data.signedUrl;
                        }
                      }
                      return (
                        <div key={idx} className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden border-2 border-dashed border-red-100 flex items-center justify-center">
                          <SafeImage 
                            src={signedUrl} 
                            alt="Belge" 
                            className="w-full h-full object-contain" 
                          />
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>

          {/* SAĞ KOLON: DETAYLAR */}
          <div className="space-y-10">
            
            {/* Başlık ve Fiyat */}
            <div>
              <h1 className="text-4xl font-light text-gray-900 mb-2 uppercase tracking-tighter serif-display">{product.brand}</h1>
              <p className="text-xl text-gray-500 font-light mb-4">{product.model_name}</p>
              <div className="text-3xl font-bold text-black tabular-nums">
                {product.price.toLocaleString('tr-TR')} ₺
              </div>
            </div>

            {/* Satıcı Kartı (Div olarak güncellendi - Dead link düzeltildi) */}
            {sellerProfile && (
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Satıcı Bilgileri</p>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-bold text-gray-900">
                      {sellerProfile.first_name} {sellerProfile.last_name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      Satış: {sellerProfile.sales_count || '0'} | Puan: {sellerProfile.rating || '5.0'} ⭐
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                    {sellerProfile.first_name ? sellerProfile.first_name[0] : 'S'}
                  </div>
                </div>
              </div>
            )}

            {/* Entrupy Kimlik Doğrulama Sonucu */}
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Entrupy Ekspertiz Sonucu</p>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    Durum: 
                    {product.entrupy_status === 'verified' ? (
                      <span className="text-emerald-600">Orijinal (Verified)</span>
                    ) : product.entrupy_status === 'unverified' ? (
                      <span className="text-red-600">Sahte (Unverified)</span>
                    ) : product.entrupy_status === 'pending' || product.entrupy_status === 'completed' ? (
                      <span className="text-amber-500">Sonuç Bekleniyor</span>
                    ) : (
                      <span className="text-gray-500">Cihazla Taranmamış</span>
                    )}
                  </h4>
                  {product.entrupy_certificate_url && (
                    <a 
                      href={product.entrupy_certificate_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline mt-2 inline-block font-medium"
                    >
                      🔗 Sertifikayı Görüntüle
                    </a>
                  )}
                </div>
                <div className={`w-10 h-10 rounded-full border flex items-center justify-center text-lg ${
                  product.entrupy_status === 'verified' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' :
                  product.entrupy_status === 'unverified' ? 'bg-red-50 border-red-200 text-red-600' :
                  'bg-white border-gray-200 text-gray-400'
                }`}>
                  {product.entrupy_status === 'verified' ? '✓' :
                   product.entrupy_status === 'unverified' ? '✕' : '?'}
                </div>
              </div>
            </div>

            {/* Teknik Detaylar Tablosu */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2">Teknik Özellikler</h3>
              <div className="grid grid-cols-2 gap-y-4 text-xs uppercase tracking-widest">
                <p className="text-gray-400">Kondisyon</p>
                <p className="font-bold text-right">{product.condition}</p>
                
                <p className="text-gray-400">Materyal</p>
                <p className="font-bold text-right">{product.material || 'Belirtilmemiş'}</p>
                
                <p className="text-gray-400">Boyutlar</p>
                <p className="font-bold text-right">{product.dimensions || 'Belirtilmemiş'}</p>
                
                <p className="text-gray-400">Satın Alındığı Yıl</p>
                <p className="font-bold text-right">{product.purchase_year || 'Belirtilmemiş'}</p>
                
                <p className="text-red-500 font-bold italic">Seri Numarası</p>
                <p className="font-bold text-right text-red-500">{product.serial_number || 'YOK'}</p>
              </div>
            </div>

            {/* Açıklama */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2">Satıcı Notu</h3>
              <p className="text-sm text-gray-600 font-light leading-relaxed italic">&quot;{product.description}&quot;</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
