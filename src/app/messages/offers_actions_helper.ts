'use server'

import { createClient } from '@/src/utils/supabase/server'

export async function getActiveOffer(productId: string) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Oturum açmanız gerekiyor.' }

    // Fetch active offers for this product where user is buyer OR seller
    const { data: offers, error } = await supabase
      .from('offers')
      .select(`
        *,
        product:products(*)
      `)
      .eq('product_id', productId)
      .in('status', ['pending', 'accepted'])
      .order('created_at', { ascending: false })

    if (error) {
      return { success: false, error: error.message }
    }

    // Filter to find the relevant offer for the current user
    const relevantOffer = (offers || []).find(o => 
      o.buyer_id === user.id || o.product?.seller_id === user.id
    )

    return { success: true, offer: relevantOffer || null }
  } catch (error) {
    console.error('getActiveOffer error:', error)
    return { success: false, error: 'Teklif yüklenirken hata oluştu.' }
  }
}
