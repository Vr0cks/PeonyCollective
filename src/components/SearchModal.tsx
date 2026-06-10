'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Search, ArrowRight } from 'lucide-react'
import { createClient } from '@/src/utils/supabase/client'
import { Product } from '@/src/types'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Escape tuşu ile kapatma
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Veritabanındaki aktif tüm ürünleri önbelleğe alıp hızlı arama yapmak
  const loadProducts = async () => {
    setLoading(true)
    const supabase = createClient()
    const { data } = await supabase
      .from('products')
      .select('id, brand, model_name, price, public_images, category, subcategory')
      .eq('status', 'approved')
    
    if (data) {
      setProducts(data as Product[])
    }
    setLoading(false)
  }

  // Modal açıldığında inputa odaklanma
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
        loadProducts()
      }, 100)
    } else {
      setTimeout(() => setQuery(''), 0)
    }
  }, [isOpen])

  // Arama filtresi (derived state)
  const lowerQuery = query.toLowerCase()
  const filtered = query.trim()
    ? products.filter(p => 
        (p.brand?.toLowerCase() || '').includes(lowerQuery) ||
        (p.model_name?.toLowerCase() || '').includes(lowerQuery) ||
        (p.category?.toLowerCase() || '').includes(lowerQuery) ||
        (p.subcategory?.toLowerCase() || '').includes(lowerQuery)
      )
    : []

  const popularSearches = [
    'Hermès Birkin',
    'Chanel Tweed',
    'Lady Dior',
    'Rolex Kermit',
    'Bottega Veneta'
  ]

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  }

  const modalVariants = {
    closed: { y: -50, scale: 0.95, opacity: 0 },
    open: { y: 0, scale: 1, opacity: 1 }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={overlayVariants}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[999] flex items-start justify-center pt-24 md:pt-36 px-6 overflow-y-auto pb-12"
        >
          {/* Kapat Butonu */}
          <button
            onClick={onClose}
            className="absolute top-8 right-8 text-zinc-400 hover:text-white transition-colors cursor-pointer p-2"
            aria-label="Kapat"
          >
            <X size={28} strokeWidth={1.5} />
          </button>

          {/* Modal Container */}
          <motion.div
            variants={modalVariants}
            transition={{ type: 'spring' as const, stiffness: 300, damping: 30 }}
            className="w-full max-w-3xl flex flex-col gap-12"
          >
            
            {/* Büyük Arama Satırı */}
            <div className="relative border-b border-zinc-700 pb-4 group">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#AF9164] transition-colors" size={24} strokeWidth={1.5} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ARAMAYA BAŞLAYIN..."
                className="w-full pl-10 pr-4 bg-transparent text-xl md:text-3xl font-playfair tracking-[0.1em] text-white placeholder-zinc-600 focus:outline-none uppercase"
              />
            </div>

            {/* Arama Sonuçları */}
            <div className="min-h-[200px]">
              {query.trim() ? (
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#AF9164] mb-6">Arama Sonuçları ({filtered.length})</h4>
                  
                  {loading ? (
                    <p className="text-zinc-500 text-sm font-light italic">Aranıyor...</p>
                  ) : filtered.length === 0 ? (
                    <p className="text-zinc-500 text-sm font-light italic">&quot;{query}&quot; ile eşleşen seçkin bir parça bulunamadı.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filtered.map(p => (
                        <Link
                          key={p.id}
                          href={`/product/${p.id}`}
                          onClick={onClose}
                          className="bg-zinc-900/50 border border-zinc-800/40 rounded-xl p-4 flex items-center gap-4 hover:border-[#AF9164]/30 hover:bg-zinc-900 transition-all group"
                        >
                          <div className="w-16 h-20 bg-zinc-800 rounded overflow-hidden flex-shrink-0 relative">
                            <Image
                              src={p.public_images?.[0] || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=200'}
                              alt={p.model_name || 'Ürün'}
                              fill
                              sizes="64px"
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="flex-grow min-w-0">
                            <p className="text-[9px] font-bold text-[#AF9164] uppercase tracking-widest leading-none mb-1">{p.brand}</p>
                            <h5 className="text-sm font-medium text-white truncate mb-1">{p.model_name}</h5>
                            <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">{p.category} / {p.subcategory}</p>
                          </div>
                          <div className="text-right flex-shrink-0 pl-2">
                            <p className="text-xs font-bold text-white mb-2">{p.price.toLocaleString('tr-TR')} ₺</p>
                            <ArrowRight size={14} className="text-zinc-600 group-hover:text-[#AF9164] group-hover:translate-x-1 transition-all inline-block" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* Başlangıç Durumu: Popüler Aramalar */
                <div className="space-y-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Popüler Aramalar</h4>
                  <div className="flex flex-wrap gap-3">
                    {popularSearches.map(s => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className="px-5 py-2.5 bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-full text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-all cursor-pointer"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
