'use client'
import { motion } from 'framer-motion'
import { ShieldCheck, Truck, Search, CreditCard, Award } from 'lucide-react'

const steps = [
  {
    title: "Güvenli Ödeme & Rezervasyon",
    desc: "Alıcı ödemeyi yapar, ancak para satıcıya gitmez. Peony'nin güvenli emanet havuzunda (Escrow) bloke edilir.",
    icon: <CreditCard className="w-8 h-8" strokeWidth={1} />,
    color: "bg-blue-50"
  },
  {
    title: "Peony Lab'e Gönderim",
    desc: "Satıcı, ürünü incelenmek üzere özel kurye ile İstanbul'daki fiziksel onay merkezimize (The Lab) gönderir.",
    icon: <Truck className="w-8 h-8" strokeWidth={1} />,
    color: "bg-zinc-50"
  },
  {
    title: "32 Noktalı Ekspertiz & AI Tarama",
    desc: "Uzmanlarımız derinin dikişinden, donanım ağırlığına kadar ürünü fiziksel olarak inceler ve AI veritabanımızla karşılaştırır.",
    icon: <Search className="w-8 h-8" strokeWidth={1} />,
    color: "bg-orange-50"
  },
  {
    title: "Dijital Pasaport & Teslimat",
    desc: "Ürün onaylanırsa, NFC özellikli Dijital Pasaportu ile mühürlenir ve alıcıya sigortalı olarak gönderilir. Para satıcıya geçer.",
    icon: <Award className="w-8 h-8" strokeWidth={1} />,
    color: "bg-green-50"
  }
]

export default function HowItWorks() {
  return (
    <main className="min-h-screen bg-[#FCFCFB] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Bölümü */}
        <div className="text-center space-y-6 mb-24">
          <motion.h2 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }}
            className="text-[10px] font-bold uppercase tracking-[0.6em] text-[#AF9164]"
          >
            Trust Infrastructure
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-playfair italic leading-tight"
          >
            Lüksün Yeni <br /> <span className="not-italic font-light">Güven Standartı</span>
          </motion.h1>
          <p className="text-gray-500 max-w-xl mx-auto text-sm font-light leading-relaxed">
            Yarım milyonluk bir yatırım yaparken riskleri biz üstleniyoruz. <br />
            Peony Lab ile her işlem, kurumsal güvence altındadır.
          </p>
        </div>

        {/* Akış Şeması (Infographic) */}
        <div className="relative">
          {/* Arka Plan Çizgisi (Masaüstü için) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[1px] bg-gray-100 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-500/5 space-y-6 group hover:border-[#AF9164] transition-all duration-500"
              >
                <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center text-gray-900 group-hover:scale-110 transition-transform duration-500`}>
                  {step.icon}
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-playfair font-bold leading-tight">
                    <span className="text-[10px] block font-bold text-[#AF9164] mb-1 font-inter uppercase tracking-widest">Adım 0{i+1}</span>
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-loose font-light">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* "The Lab" Vizyonu - Yatırımcı Burayı Çizer */}
        <section className="mt-40 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center bg-zinc-900 p-12 md:p-24 rounded-[4rem] text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#AF9164]/10 blur-[120px] -z-0" />
          
          <div className="space-y-8 relative z-10">
            <h2 className="text-4xl md:text-5xl font-playfair italic">Peony Lab™</h2>
            <p className="text-gray-400 font-light leading-relaxed">
              Fiziksel onay merkezimiz, Türkiye'nin ilk ve tek lüks çanta ekspertiz laboratuvarıdır. 
              3D tarama teknolojisi ve spektral analiz ile deri gözeneklerine kadar iniyoruz.
            </p>
            <div className="space-y-4">
               <div className="flex items-center gap-4">
                  <ShieldCheck className="text-[#AF9164]" size={20} />
                  <span className="text-xs font-bold uppercase tracking-widest">Sertifikalı Ekspertiz Heyeti</span>
               </div>
               <div className="flex items-center gap-4">
                  <ShieldCheck className="text-[#AF9164]" size={20} />
                  <span className="text-xs font-bold uppercase tracking-widest">Mikroskobik Dikiş Analizi</span>
               </div>
            </div>
          </div>
          
          <div className="relative z-10">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200" 
              alt="The Lab" 
              className="rounded-3xl shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </section>
      </div>
    </main>
  )
}
