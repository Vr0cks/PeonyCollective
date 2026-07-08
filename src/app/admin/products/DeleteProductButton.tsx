'use client'

import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { deleteProduct } from './actions'

export default function DeleteProductButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Bu ürünü (ve varsa siparişini) kalıcı olarak silmek istediğinizden emin misiniz?')) {
      return
    }
    setLoading(true)
    try {
      await deleteProduct(productId)
      alert('Ürün başarıyla silindi.')
    } catch (err: any) {
      alert(err.message || 'Ürün silinirken bir hata oluştu.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="shrink-0 p-1.5 rounded-lg bg-red-950/40 border border-red-500/20 text-red-400 hover:bg-red-900/40 hover:text-red-300 transition-all disabled:opacity-50"
      title="Ürünü Sil"
    >
      <Trash2 size={13} />
    </button>
  )
}
