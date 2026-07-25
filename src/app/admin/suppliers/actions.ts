'use server'

import { createClient } from '@/src/utils/supabase/server'
import { revalidatePath } from 'next/cache'

// Tedarikçi bilgilerini güncelleyen server action
export async function updateSupplierDetailsAction(
  supplierId: string,
  updatedData: {
    name: string
    email?: string | null
    phone?: string | null
    address?: string | null
    iban: string
    tckn?: string | null
    vkn?: string | null
    company_title?: string | null
    submerchant_type: 'bireysel' | 'kurumsal'
  }
) {
  try {
    const supabase = await createClient()

    // 1. Yetki Kontrolü
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Oturum açmanız gerekiyor.' }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return { success: false, error: 'Bu işlemi yapmaya yetkiniz yok.' }
    }

    // 2. IBAN Format Kontrolü
    const cleanedIban = updatedData.iban.toUpperCase().replace(/\s+/g, '')
    if (!cleanedIban.startsWith('TR') || cleanedIban.length !== 26) {
      return { success: false, error: 'IBAN numarası geçersiz (TR ile başlamalı ve 26 hane olmalıdır).' }
    }

    // 3. Mevcut tedarikçiyi çekip kritik bilgilerinin değişip değişmediğini kontrol et
    const { data: currentSupplier } = await supabase
      .from('suppliers')
      .select('iban, tckn, vkn, submerchant_id')
      .eq('id', supplierId)
      .single()

    // Eğer IBAN veya TCKN/VKN değiştiyse, PayTR alt üye kaydının yenilenmesi için submerchant_id'yi sıfırla.
    // İlk ödeme geldiğinde sistem PayTR tarafında yeni bilgilerle otomatik olarak alt üye işyeri açacaktır.
    const isCredentialsChanged = 
      currentSupplier && (
        currentSupplier.iban !== cleanedIban ||
        currentSupplier.tckn !== (updatedData.tckn || null) ||
        currentSupplier.vkn !== (updatedData.vkn || null)
      )

    const updatePayload: any = {
      name: updatedData.name,
      email: updatedData.email || null,
      phone: updatedData.phone || null,
      address: updatedData.address || null,
      iban: cleanedIban,
      tckn: updatedData.tckn || null,
      vkn: updatedData.vkn || null,
      company_title: updatedData.company_title || null,
      submerchant_type: updatedData.submerchant_type
    }

    if (isCredentialsChanged) {
      updatePayload.submerchant_id = null
    }

    const { error } = await supabase
      .from('suppliers')
      .update(updatePayload)
      .eq('id', supplierId)

    if (error) throw error

    revalidatePath('/admin/suppliers')
    return { success: true }
  } catch (error: any) {
    console.error('updateSupplierDetailsAction error:', error)
    return { success: false, error: error.message || 'Tedarikçi güncellenirken bir hata oluştu.' }
  }
}

// Tedarikçiyi silen server action
export async function deleteSupplierAction(supplierId: string) {
  try {
    const supabase = await createClient()

    // Yetki Kontrolü
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Oturum açmanız gerekiyor.' }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return { success: false, error: 'Bu işlemi yapmaya yetkiniz yok.' }
    }

    // Tedarikçiyi sil
    const { error } = await supabase
      .from('suppliers')
      .delete()
      .eq('id', supplierId)

    if (error) throw error

    revalidatePath('/admin/suppliers')
    return { success: true }
  } catch (error: any) {
    console.error('deleteSupplierAction error:', error)
    return { success: false, error: error.message || 'Tedarikçi silinirken bir hata oluştu.' }
  }
}

// Tedarikçileri tüm detaylı satış, komisyon ve ürün verileriyle çeken server action
export async function getDetailedSuppliersAction() {
  try {
    const supabase = await createClient()

    // Yetki kontrolü
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Oturum açmanız gerekiyor.' }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return { success: false, error: 'Bu işlemi yapmaya yetkiniz yok.' }
    }

    // 1. Tüm tedarikçileri çek
    const { data: suppliers, error: supError } = await supabase
      .from('suppliers')
      .select('*')
      .order('name', { ascending: true })

    if (supError) throw supError

    if (!suppliers || suppliers.length === 0) {
      return { success: true, suppliers: [] }
    }

    // 2. Tüm tedarikçi id'leri
    const supplierIds = suppliers.map(s => s.id)

    // 3. Tedarikçilere ait ürünleri ve bunların satış bilgilerini çek
    const { data: products, error: prodError } = await supabase
      .from('products')
      .select(`
        id,
        brand,
        model_name,
        price,
        status,
        created_at,
        supplier_id,
        public_images,
        orders (
          id,
          total_price,
          commission_amount,
          seller_amount,
          order_status,
          buyer_name,
          buyer_email,
          created_at
        )
      `)
      .in('supplier_id', supplierIds)

    if (prodError) console.error('Tedarikçi ürünleri çekilirken hata:', prodError)

    // 4. Verileri birleştir ve istatistikleri hesapla
    const detailedSuppliers = suppliers.map((supplier) => {
      const supplierProducts = (products || []).filter(p => p.supplier_id === supplier.id)
      
      const sales: any[] = []
      let totalSalesVolume = 0
      let totalCommissionEarned = 0
      let totalSupplierPayout = 0

      supplierProducts.forEach((p) => {
        const orderList = Array.isArray(p.orders) ? p.orders : p.orders ? [p.orders] : []
        orderList.forEach((ord: any) => {
          if (ord.order_status === 'completed' || ord.order_status === 'delivered' || ord.order_status === 'paid' || ord.order_status === 'lab_approved' || ord.order_status === 'shipped_to_buyer') {
            const salePrice = Number(ord.total_price || p.price || 0)
            const commission = Number(ord.commission_amount || (salePrice * 0.15)) // %15 varsayılan komisyon tahmini
            const payout = Number(ord.seller_amount || (salePrice - commission))

            totalSalesVolume += salePrice
            totalCommissionEarned += commission
            totalSupplierPayout += payout

            sales.push({
              orderId: ord.id,
              productBrand: p.brand,
              productModel: p.model_name,
              productImage: p.public_images?.[0] || null,
              salePrice,
              commissionAmount: commission,
              supplierPayout: payout,
              buyerName: ord.buyer_name || ord.buyer_email || 'Gizli Müşteri',
              saleDate: ord.created_at
            })
          }
        })
      })

      return {
        ...supplier,
        products: supplierProducts,
        totalProductCount: supplierProducts.length,
        soldProductCount: sales.length,
        activeProductCount: supplierProducts.filter(p => p.status === 'approved').length,
        totalSalesVolume,
        totalCommissionEarned,
        totalSupplierPayout,
        salesHistory: sales.sort((a, b) => new Date(b.saleDate).getTime() - new Date(a.saleDate).getTime())
      }
    })

    return { success: true, suppliers: detailedSuppliers }
  } catch (error: any) {
    console.error('getDetailedSuppliersAction error:', error)
    return { success: false, error: error.message || 'Tedarikçiler yüklenirken bir hata oluştu.' }
  }
}
