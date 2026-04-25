'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/src/utils/supabase/client'

export default function NotificationBell({ userId }: { userId: string }) {
  const [unreadCount, setUnreadCount] = useState(0)
  const [notifications, setNotifications] = useState<{ id: string; message: string }[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    // Gerçek zamanlı dinleme: Sadece bu kullanıcının ürünlerindeki durum değişikliklerini dinle
    const channel = supabase
      .channel('product-updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'products',
          filter: `seller_id=eq.${userId}`,
        },
        (payload) => {
          const newStatus = payload.new.status
          const oldStatus = payload.old.status
          
          if (newStatus !== oldStatus) {
            const message = `Ürününüzün durumu güncellendi: ${newStatus === 'approved' ? 'Onaylandı' : newStatus === 'rejected' ? 'Reddedildi' : 'Satıldı'}`
            setNotifications(prev => [{ id: Date.now().toString(), message }, ...prev])
            setUnreadCount(prev => prev + 1)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId, supabase])

  return (
    <div className="relative">
      <button 
        onClick={() => {
          setIsOpen(!isOpen)
          setUnreadCount(0)
        }}
        className="relative p-2 text-gray-500 hover:text-black transition-colors"
      >
        <span className="text-xl">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden">
          <div className="p-4 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Bildirimler</h3>
            <button onClick={() => setNotifications([])} className="text-[10px] text-gray-300 hover:text-red-500 uppercase font-bold">Temizle</button>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="p-8 text-center text-xs text-gray-400 italic">Henüz bildirim yok.</p>
            ) : (
              notifications.map((n) => (
                <div key={n.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <p className="text-xs text-gray-700 leading-relaxed">{n.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
