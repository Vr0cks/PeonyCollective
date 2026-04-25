import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F9F9F8]">
      {/* Sadece Hero kısmına bir estetik dokunuş */}
      <section className="h-[80vh] flex items-center justify-center">
        <div className="text-center space-y-8">
          <h1 className="text-7xl font-playfair italic tracking-tighter text-gray-900">Peony Collective</h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-400">
            Arşivlik Parçalar. Dijital Güvence.
          </p>
          <div className="pt-10">
            <div className="w-[1px] h-20 bg-black mx-auto animate-bounce" />
          </div>
        </div>
      </section>
      
      {/* Diğer bölümler (Koleksiyon vb.) için aşağı kaydırın */}
    </main>
  );
}