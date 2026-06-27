'use client'

import { Package, Clock, TrendingUp, Sparkles, Plus, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/src/types'

interface CuratorViewProps {
  myProducts: Product[]
  totalEarnings: number
  activeSales: number
  pendingApproval: number
}

const statusConfig: Record<string, { label: string; dot: string; badge: string }> = {
  pending:  { label: 'Onay Bekliyor',     dot: 'bg-amber-400',  badge: 'bg-amber-400/10 text-amber-400 border-amber-400/20' },
  approved: { label: 'Aktif / Piyasada', dot: 'bg-emerald-400', badge: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20' },
  rejected: { label: 'Reddedildi',        dot: 'bg-red-400',    badge: 'bg-red-400/10 text-red-400 border-red-400/20' },
  sold:     { label: 'Satıldı',           dot: 'bg-[#AF9164]',  badge: 'bg-[#AF9164]/10 text-[#AF9164] border-[#AF9164]/20' },
}

export default function CuratorView({ myProducts, totalEarnings, activeSales, pendingApproval }: CuratorViewProps) {
  const soldCount  = myProducts.filter(p => p.status === 'sold').length
  const totalCount = myProducts.length

  return (
    <div className="space-y-10">

      {/* BAŞLIK */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-2">CURATOR DASHBOARD</p>
          <h1 className="text-4xl serif-display italic text-gray-900">Mağaza Terminali</h1>
        </div>
        <Link
          href="/sell"
          className="flex items-center gap-2 bg-[#1A1A1A] text-white px-6 py-3 rounded-full hover:bg-[#AF9164] transition-all duration-300 text-xs font-bold uppercase tracking-widest group"
        >
          <Plus size={14} />
          Yeni Ürün Ekle
          <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      {/* METRİK KARTLARI */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: 'Toplam Kazanç',
            value: `${totalEarnings.toLocaleString('tr-TR')} ₺`,
            sub: 'Tamamlanan satışlar',
            icon: <TrendingUp size={20} strokeWidth={1.5} className="text-[#AF9164]" />,
            accent: 'border-[#AF9164]/20',
          },
          {
            label: 'Aktif İlanlar',
            value: `${activeSales}`,
            sub: 'Piyasada bekliyor',
            icon: <Package size={20} strokeWidth={1.5} className="text-emerald-500" />,
            accent: 'border-emerald-200',
          },
          {
            label: 'Onay Bekliyor',
            value: `${pendingApproval}`,
            sub: 'Peony Lab inceliyor',
            icon: <Clock size={20} strokeWidth={1.5} className="text-amber-500" />,
            accent: pendingApproval > 0 ? 'border-amber-300' : 'border-gray-100',
          },
          {
            label: 'Satılan Ürün',
            value: `${soldCount}`,
            sub: `${totalCount} üründen`,
            icon: <Sparkles size={20} strokeWidth={1.5} className="text-gray-400" />,
            accent: 'border-gray-100',
          },
        ].map((m) => (
          <div key={m.label} className={`bg-white rounded-2xl border ${m.accent} p-6 shadow-sm`}>
            <div className="flex justify-between items-start mb-4">
              {m.icon}
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{m.value}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{m.label}</p>
            <p className="text-xs text-gray-400 mt-1 font-light">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* ÜRÜN LİSTESİ */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-8 py-5 border-b border-gray-50 flex justify-between items-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">Envanter</h2>
          <span className="text-xs text-gray-300">{myProducts.length} ürün</span>
        </div>

        {myProducts.length === 0 ? (
          <div className="py-24 flex flex-col items-center gap-5 text-center px-8">
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center">
              <Sparkles size={28} strokeWidth={1} className="text-gray-300" />
            </div>
            <div>
              <h3 className="text-xl serif-display italic text-gray-700 mb-2">Henüz bir ürün yok</h3>
              <p className="text-sm text-gray-400 font-light max-w-xs">
                Koleksiyonundaki parçaları Peony ekosistemine katmaya ne dersin?
              </p>
            </div>
            <Link
              href="/sell"
              className="mt-2 bg-black text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#AF9164] transition-all"
            >
              İlk Ürününü Yükle
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {myProducts.map((p) => {
              const st = statusConfig[p.status] || { label: p.status, dot: 'bg-gray-400', badge: 'bg-gray-100 text-gray-500 border-gray-200' }
              const imageUrl = p.public_images?.[0]

              return (
                <div key={p.id} className="flex items-center gap-5 px-8 py-5 hover:bg-gray-50/50 transition-colors group">
                  {/* Küçük görsel */}
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 relative border border-gray-100">
                    {imageUrl ? (
                      <Image src={imageUrl} alt="" fill sizes="56px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package size={20} className="text-gray-300" />
                      </div>
                    )}
                  </div>

                  {/* Bilgi */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#AF9164]">{p.brand}</p>
                    <p className="text-sm font-medium text-gray-800 truncate">{p.model_name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{p.category} · {p.condition}</p>
                  </div>

                  {/* Durum badge */}
                  <span className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border ${st.badge} hidden sm:inline-flex items-center gap-1.5`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                    {st.label}
                  </span>

                  {/* Fiyat */}
                  <div className="text-right shrink-0">
                    <p className="text-base font-bold text-gray-900">{(p.price ?? 0).toLocaleString('tr-TR')} ₺</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* ÖDEME VE KOMİSYON BİLGİLENDİRMESİ */}
      <div className="bg-zinc-900 text-white rounded-3xl p-8 shadow-sm relative overflow-hidden mt-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#AF9164]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div>
            <h3 className="text-xl serif-display mb-4 italic text-[#AF9164]">Ödeme Süreci</h3>
            <p className="text-sm font-light text-zinc-300 leading-relaxed mb-6">
              Satılan ürünlerinizin ödemesi, alıcının yasal 14 günlük iade süresi dolduktan sonraki ilk iş günü hesabınıza aktarılır. Ödemeleriniz, <span className="text-white font-medium">Peony Güvencesi</span> altında BDDK lisanslı ödeme kuruluşları üzerinden yapılır.
            </p>
            <div className="flex flex-col gap-2">
              <Link href="/settings" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#AF9164] hover:text-white transition-colors">
                <span>IBAN Bilgilerimi Güncelle</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
          
          <div className="border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-16 flex flex-col justify-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Hizmet Bedeli</p>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl serif-display">%15</span>
            </div>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Sabit komisyon oranımız, laboratuvar ekspertiz ücretini, yüksek güvenlikli sigortalı kargolamayı ve tüm pazarlama faaliyetlerini kapsar. Sürpriz kesintiler yoktur.
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}
