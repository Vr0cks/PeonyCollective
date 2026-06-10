'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import { createClient } from '@/src/utils/supabase/client'
import { Bell, Trash2 } from 'lucide-react'
import { Notification } from '@/src/types'

export default function NotificationBell({ userId }: { userId: string }) {
  const [unreadCount, setUnreadCount] = useState(0)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const supabase = useMemo(() => createClient(), [])

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Load and listen to notifications
  useEffect(() => {
    // 1. Fetch initial notifications
    async function loadNotifications() {
      try {
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(20)

        if (error) throw error

        if (data) {
          setNotifications(data as Notification[])
          setUnreadCount(data.filter((n) => !n.is_read).length)
        }
      } catch (err) {
        console.error('Error loading notifications:', err)
      }
    }

    loadNotifications()

    // 2. Setup realtime channel
    const channel = supabase
      .channel(`user-notifications-${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          const newNotif = payload.new as Notification
          setNotifications((prev) => [newNotif, ...prev])
          setUnreadCount((prev) => prev + 1)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId, supabase])

  const handleToggle = async () => {
    if (!isOpen) {
      setIsOpen(true)
      if (unreadCount > 0) {
        setUnreadCount(0)
        // Mark all as read in DB
        try {
          await supabase
            .from('notifications')
            .update({ is_read: true })
            .eq('user_id', userId)
            .eq('is_read', false)
        } catch (err) {
          console.error('Error marking notifications as read:', err)
        }
      }
    } else {
      setIsOpen(false)
    }
  }

  const handleClear = async () => {
    try {
      setNotifications([])
      setUnreadCount(0)
      await supabase.from('notifications').delete().eq('user_id', userId)
    } catch (err) {
      console.error('Error clearing notifications:', err)
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={handleToggle}
        className="relative p-2 text-gray-500 hover:text-black transition-colors cursor-pointer"
        aria-label="Bildirimler"
      >
        <Bell className="w-5 h-5 stroke-[1.5]" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 bg-[#AF9164] text-white text-[9px] font-bold w-4.5 h-4.5 flex items-center justify-center rounded-full ring-2 ring-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-100 rounded-2xl shadow-xl z-[100] overflow-hidden">
          <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/55">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Bildirimler</h3>
            {notifications.length > 0 && (
              <button 
                onClick={handleClear} 
                className="text-[9px] text-gray-400 hover:text-red-500 uppercase font-bold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                Temizle
              </button>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
            {notifications.length === 0 ? (
              <div className="py-12 px-4 text-center">
                <p className="text-xs text-gray-400 italic font-light">Henüz bildirim bulunmuyor.</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div key={n.id} className="p-4 hover:bg-gray-50/40 transition-colors">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#AF9164]">
                      {n.title}
                    </span>
                    <span className="text-[8px] text-gray-400 font-light">
                      {new Date(n.created_at).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 font-light mt-1.5 leading-relaxed">{n.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
