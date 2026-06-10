import { createClient } from '@/src/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function AuthenticationLabPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Mock Data: Onay bekleyen ürün
  const incomingProduct = {
    id: 'prod-999',
    brand: 'Hermès',
    model: 'Birkin 30 Togo Black',
    seller: 'Anonim Satıcı',
    stitching_image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400&q=80', // Örnek çanta detayı
    logo_image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80',
    odor_score: 9,
    spa_treatment: false
  }

  // Mock Data: Master Veritabanından gelen %100 Orijinal referans
  const masterReference = {
    stitching_image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400&q=80&sepia=1', // Filtreli kopya
    logo_image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80&sepia=1',
    stitching_angle: '18 derece Hermès klasik eğik dikiş',
    stamp_depth: '0.2mm lazer değil, sıcak baskı'
  }

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8 animate-fade-in">
      <div className="flex justify-between items-end border-b border-gray-200 pb-6">
        <div>
          <span className="inline-block px-3 py-1 bg-red-100 text-red-800 text-[10px] font-bold uppercase tracking-widest rounded-full mb-3">Gizli Laboratuvar Ekranı</span>
          <h1 className="serif-display text-3xl font-light tracking-wide text-black mb-2">A/B Orijinallik Karşılaştırma Labı</h1>
          <p className="text-gray-500 font-light text-sm">Gelen çantayı, Peony Orijinallik Veritabanı'ndaki %100 onaylı referansla yan yana inceleyin.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-red-50 text-red-600 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-red-100 transition-colors">Sahte (Reddet)</button>
          <button className="bg-green-600 text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-green-700 transition-colors">Orijinal (Onayla)</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* İNCELENEN ÜRÜN (SOL) */}
        <div className="space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-black bg-gray-50 p-4 rounded-xl border border-gray-200">
            İncelenen Ürün: {incomingProduct.model}
          </h2>
          
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Dikiş (Stitching) Yakın Çekim</h3>
            <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden relative group">
              <img src={incomingProduct.stitching_image} alt="Gelen Dikiş" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-crosshair">
                <span className="text-white text-xs font-bold">Büyütmek İçin Tıkla</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Logo (Stamp) Yakın Çekim</h3>
            <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden relative group">
              <img src={incomingProduct.logo_image} alt="Gelen Logo" className="w-full h-full object-cover" />
            </div>
          </div>
          
          <div className="bg-[#AF9164]/10 p-4 rounded-xl border border-[#AF9164]/20">
            <h3 className="text-xs font-bold text-[#AF9164] uppercase tracking-widest mb-2">Satıcı Beyanı (Kondisyon)</h3>
            <p className="text-sm"><strong>Koku Skoru:</strong> {incomingProduct.odor_score}/10</p>
            <p className="text-sm"><strong>Spa Geçmişi:</strong> {incomingProduct.spa_treatment ? 'Var (Riskli)' : 'Yok (Orijinal)'}</p>
          </div>
        </div>

        {/* MASTER REFERANS (SAĞ) */}
        <div className="space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-white bg-black p-4 rounded-xl border border-black flex justify-between items-center">
            <span>Peony Master Veritabanı</span>
            <span className="bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full">%100 Doğrulanmış</span>
          </h2>
          
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest">Referans Dikiş (Stitching)</h3>
            <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden relative">
              <img src={masterReference.stitching_image} alt="Referans Dikiş" className="w-full h-full object-cover" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg">
                <p className="text-[10px] font-bold text-gray-800">UZMAN NOTU:</p>
                <p className="text-xs text-gray-600">{masterReference.stitching_angle}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest">Referans Logo (Stamp)</h3>
            <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden relative">
              <img src={masterReference.logo_image} alt="Referans Logo" className="w-full h-full object-cover" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg">
                <p className="text-[10px] font-bold text-gray-800">UZMAN NOTU:</p>
                <p className="text-xs text-gray-600">{masterReference.stamp_depth}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
