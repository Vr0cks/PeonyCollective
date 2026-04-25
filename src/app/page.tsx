'use client'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FCFCFB] selection:bg-[#AF9164] selection:text-white">
      {/* 1. ACİL HERO BLOĞU */}
      <section className="h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
        {/* Arka planda çok hafif, lüks hissettiren bir degrade */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-[#FCFCFB] to-[#F3F3F1] -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-center space-y-6"
        >
          <h2 className="text-[10px] font-bold uppercase tracking-[0.6em] text-[#AF9164] mb-4">
            Established 2024
          </h2>
          <h1 className="text-7xl md:text-9xl font-playfair italic tracking-tighter text-zinc-900 leading-none">
            Peony <br /> <span className="not-italic font-light opacity-80 uppercase tracking-widest text-4xl md:text-6xl">Collective</span>
          </h1>
          <p className="max-w-md mx-auto text-xs text-zinc-400 font-light leading-relaxed tracking-widest uppercase pt-8">
            Küratörler tarafından onaylanmış, <br /> yatırım değeri taşıyan arşiv parçaları.
          </p>
          
          <div className="pt-16">
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-[1px] h-24 bg-gradient-to-b from-zinc-900 to-transparent mx-auto"
            />
          </div>
        </motion.div>
      </section>

      {/* 2. ACİL GÜVEN BANDI (Boşluğu kapatır) */}
      <section className="py-24 border-y border-zinc-100 bg-white">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-2">
            <p className="text-xl font-playfair italic text-zinc-900">32 Nokta</p>
            <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Fiziksel Ekspertiz</p>
          </div>
          <div className="space-y-2 border-x border-zinc-100">
            <p className="text-xl font-playfair italic text-zinc-900">%100</p>
            <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Orijinallik Garantisi</p>
          </div>
          <div className="space-y-2">
            <p className="text-xl font-playfair italic text-zinc-900">Digital ID</p>
            <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">NFC Destekli Pasaport</p>
          </div>
        </div>
      </section>
    </main>
  )
}