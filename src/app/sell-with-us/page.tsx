import Link from 'next/link'
import Image from 'next/image'
import { Sparkles, Camera, ShieldCheck, CreditCard, ArrowRight, Wallet, Leaf } from 'lucide-react'

export const metadata = {
  title: 'Peony ile Satış Yap | Dolabınızdaki Lüksü Nakde Çevirin',
  description: 'Kullanmadığınız lüks marka çanta ve aksesuarlarınızı Peony güvencesiyle kolayca satın, anında nakde çevirin.',
}

export default function SellWithUsPage() {
  return (
    <div className="min-h-screen bg-[#F9F9F8] selection:bg-[#AF9164] selection:text-white">
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=2000" 
            alt="Luxury Bag Collection" 
            fill 
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <p className="text-[#AF9164] text-xs md:text-sm font-bold uppercase tracking-[0.4em] mb-6 animate-fade-in">
            DOLABINIZDAKİ GİZLİ HAZİNE
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl serif-display text-white mb-8 leading-tight drop-shadow-lg">
            Kullanılmayan Lüks,<br/>
            <span className="italic font-light opacity-90">Yeni Bir Başlangıçtır.</span>
          </h1>
          <p className="text-gray-200 text-sm md:text-base font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Dolabınızın köşesinde bekleyen o ikonik parça, yeni bir tatil bütçesine veya hayalinizdeki bir sonraki yatırıma dönüşebilir. Peony ile lüks parçalarınızı güvenle, zahmetsizce satabilirsiniz.
          </p>
          <Link href="/sell" className="inline-flex items-center gap-3 bg-white text-black px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#AF9164] hover:text-white transition-all duration-300 shadow-xl shadow-black/20 group">
            Değerlemesini Öğren 
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Neden Peony Section */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl serif-display mb-4">Neden Peony ile Satmalısınız?</h2>
          <div className="w-12 h-[1px] bg-[#AF9164] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          <div className="text-center group">
            <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center border border-gray-100 shadow-sm mb-6 group-hover:border-[#AF9164] transition-colors">
              <Wallet className="text-[#AF9164]" size={32} strokeWidth={1} />
            </div>
            <h3 className="text-lg font-bold uppercase tracking-widest mb-4">Finansal Değer</h3>
            <p className="text-sm text-gray-500 leading-relaxed font-light">
              Lüks parçalar değerini korur. Kullanmadığınız ürününüzü nakde çevirerek, bütçenizi akıllıca değerlendirin. Sektördeki en rekabetçi komisyon oranlarıyla (%20) kazancınızın çoğu size kalsın.
            </p>
          </div>

          <div className="text-center group">
            <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center border border-gray-100 shadow-sm mb-6 group-hover:border-[#AF9164] transition-colors">
              <Sparkles className="text-[#AF9164]" size={32} strokeWidth={1} />
            </div>
            <h3 className="text-lg font-bold uppercase tracking-widest mb-4">VIP Concierge</h3>
            <p className="text-sm text-gray-500 leading-relaxed font-light">
              Siz kahvenizi yudumlarken, biz tüm lojistik süreci yönetelim. Peony VIP seçeneği ile ürününüzü adresinizden alıyor, fotoğraflıyor, doğruluyor ve alıcıya sigortalı olarak ulaştırıyoruz.
            </p>
          </div>

          <div className="text-center group">
            <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center border border-gray-100 shadow-sm mb-6 group-hover:border-[#AF9164] transition-colors">
              <Leaf className="text-[#AF9164]" size={32} strokeWidth={1} />
            </div>
            <h3 className="text-lg font-bold uppercase tracking-widest mb-4">Sürdürülebilirlik</h3>
            <p className="text-sm text-gray-500 leading-relaxed font-light">
              Modayı döngüde tutarak karbon ayak izinizi azaltın. Kaliteli ve ikonik parçaların ömrünü uzatarak döngüsel modaya ve daha temiz bir dünyaya katkıda bulunun.
            </p>
          </div>
        </div>
      </section>

      {/* Nasıl Çalışır Section */}
      <section className="bg-black text-white py-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl serif-display mb-4">Sadece 3 Adımda Nakde Çevirin</h2>
            <div className="w-12 h-[1px] bg-white/20 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-colors">
              <div className="text-4xl font-light text-[#AF9164] mb-6">01</div>
              <Camera size={24} className="mb-4 text-gray-400" strokeWidth={1.5}/>
              <h4 className="text-lg font-bold mb-3">Fotoğrafla & Yükle</h4>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Ürününüzün gün ışığında çekilmiş birkaç fotoğrafını çekin, kusurları varsa belirtin ve bizimle paylaşın.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-colors">
              <div className="text-4xl font-light text-[#AF9164] mb-6">02</div>
              <ShieldCheck size={24} className="mb-4 text-gray-400" strokeWidth={1.5}/>
              <h4 className="text-lg font-bold mb-3">Orijinallik Onayı (Entrupy)</h4>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Uzmanlarımız ve Yapay Zeka destekli Entrupy cihazımız ile ürünün doğrulaması yapılır ve vitrine alınır.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-colors">
              <div className="text-4xl font-light text-[#AF9164] mb-6">03</div>
              <CreditCard size={24} className="mb-4 text-gray-400" strokeWidth={1.5}/>
              <h4 className="text-lg font-bold mb-3">Kazancını Al</h4>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Ürününüz satılıp, alıcı teslimatı onayladığı an komisyon kesildikten sonra kalan tutar banka hesabınıza yatırılır.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl serif-display mb-6">Satış Yapmaya Hazır mısınız?</h2>
        <p className="text-gray-500 mb-10 font-light leading-relaxed">
          Peony uzmanları, ürününüzün değerini belirlemek ve size en iyi teklifi sunmak için bekliyor. Hemen şimdi ücretsiz değerlendirme formunu doldurun.
        </p>
        <Link href="/sell" className="inline-block bg-black text-white px-12 py-5 text-sm font-bold uppercase tracking-widest hover:bg-[#AF9164] transition-all shadow-xl hover:shadow-[#AF9164]/20">
          Formu Doldur ve Başla
        </Link>
      </section>
      
    </div>
  )
}
