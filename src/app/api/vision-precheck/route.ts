import { NextRequest, NextResponse } from 'next/server'
import { runClaudeVisionPrecheck } from '@/src/app/admin/actions'

export async function POST(req: NextRequest) {
  try {
    const { productId } = await req.json()
    if (!productId) {
      return NextResponse.json({ error: 'productId gereklidir.' }, { status: 400 })
    }

    const result = await runClaudeVisionPrecheck(productId)
    return NextResponse.json({ success: true, result })
  } catch (error: any) {
    console.error('Vision Precheck API error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
