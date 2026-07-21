import { NextRequest, NextResponse } from 'next/server'
import { runClaudeVisionPrecheck } from '@/src/app/admin/actions'

export async function POST(req: NextRequest) {
  try {
    const { productId } = await req.json()
    if (!productId) {
      return NextResponse.json({ error: 'productId gereklidir.' }, { status: 400 })
    }

    const result = await runClaudeVisionPrecheck(productId)
    if (!result || result.success === false) {
      return NextResponse.json({ success: false, error: result?.error || 'Vision analizi başarısız.' }, { status: 500 })
    }
    return NextResponse.json({ success: true, result })
  } catch (error: any) {
    console.error('Vision Precheck API error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
