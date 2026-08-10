import { createClient } from '@/src/utils/supabase/server'
import { notFound, redirect } from 'next/navigation'
import EditProductClient from './EditProductClient'

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: product, error } = await supabase
    .from('products')
    .select('id, brand, model_name, price, description, public_images, flaw_images, status, seller_id, condition, category')
    .eq('id', id)
    .single()

  if (error || !product) return notFound()
  if (product.seller_id !== user.id) return notFound()
  if (product.status === 'sold') redirect(`/product/${id}`)

  return <EditProductClient product={product} />
}
