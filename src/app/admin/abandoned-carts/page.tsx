import { createClient } from '@/src/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function AbandonedCartsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Admin kontrolü yapılmalı (Şu an prototip)

  // 15 dakikadan eski olup pending_payment olan order'ları çeker
  // const { data: abandonedOrders } = await supabase.from('orders')
  // .select('id, total_price, created_at, buyer_id, profiles(full_name, phone_number)')
  // .eq('order_status', 'pending_payment')
  // .lt('created_at', new Date(Date.now() - 15 * 60000).toISOString())

  // Mock Data
  const abandonedOrders = [
    {
      id: 'ord-1234',
      total_price: 150000,
      created_at: new Date(Date.now() - 25 * 60000).toISOString(),
      profiles: { full_name: 'Ahmet Yılmaz', phone_number: '+90 532 111 2233' }
    },
    {
      id: 'ord-5678',
      total_price: 850000,
      created_at: new Date(Date.now() - 120 * 60000).toISOString(),
      profiles: { full_name: 'Zeynep Kaya', phone_number: '+90 555 444 3322' }
    }
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in p-8">
      <div>
        <h1 className="serif-display text-3xl font-light tracking-wide text-black mb-2">Terk Edilmiş Sepetler</h1>
        <p className="text-gray-500 font-light text-sm">Ödeme ekranında kilit oluşturup tamamlamayan yüksek değerli alıcıları geri kazanın.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-[10px] uppercase tracking-widest font-bold text-gray-400">
            <tr>
              <th className="px-6 py-4">Müşteri Bilgisi</th>
              <th className="px-6 py-4">Sipariş Tutarı</th>
              <th className="px-6 py-4">Terk Edilme Zamanı</th>
              <th className="px-6 py-4 text-right">Aksiyon</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {abandonedOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-black">{order.profiles?.full_name || 'Bilinmiyor'}</div>
                  <div className="text-[10px] text-gray-400 mt-1">{order.profiles?.phone_number || 'Tel Yok'}</div>
                </td>
                <td className="px-6 py-4 font-mono font-medium text-black">
                  {order.total_price.toLocaleString('tr-TR')} ₺
                </td>
                <td className="px-6 py-4 text-xs">
                  {new Date(order.created_at).toLocaleString('tr-TR')}
                </td>
                <td className="px-6 py-4 text-right">
                  <a
                    href={`https://wa.me/${order.profiles?.phone_number?.replace(/\s+/g, '')}?text=Merhaba%20Peony%20Collective'den%20yazıyoruz.%20Sepetinizdeki%20ürünle%20ilgili%20yardıma%20ihtiyacınız%20var%20mı?`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-green-100 transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                    WhatsApp ile İletişime Geç
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
