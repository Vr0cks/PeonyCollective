'use client'

import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'

export default function PassportPage() {
  const params = useParams()
  const id = params?.id

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="max-w-md w-full border border-white/10 p-10 rounded-[3rem] relative overflow-hidden backdrop-blur-3xl bg-zinc-900/50"
      >
        {/* Holografik Efekt İçin Arka Plan */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#AF9164]/20 rounded-full blur-[80px]" />
        
        <div className="relative z-10 text-center space-y-8">
          <div className="space-y-2">
            <h1 className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#AF9164]">Digital Heritage Passport</h1>
            <p className="text-xs text-gray-500 font-mono">ID: {id}</p>
          </div>

          <div className="py-10 border-y border-white/5">
             <div className="text-5xl font-playfair mb-2 italic">Hermès</div>
             <p className="text-sm font-light tracking-widest text-gray-400">BIRKIN 30 TOGO</p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-left">
            <div>
              <p className="text-[8px] font-bold uppercase text-gray-600 mb-1 tracking-widest">Provenance</p>
              <p className="text-xs">Paris, 2023</p>
            </div>
            <div>
              <p className="text-[8px] font-bold uppercase text-gray-600 mb-1 tracking-widest">Ownerships</p>
              <p className="text-xs font-mono">01 (Original Owner)</p>
            </div>
          </div>

          <div className="pt-8">
            <div className="bg-white text-black p-4 rounded-xl text-[10px] font-bold tracking-widest uppercase">
              Orijinallik Mührü: ONAYLANDI
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  )
}
