'use server'

import { sendEntrupyAppointmentEmail } from '@/src/lib/resend'

interface SendAppointmentPayload {
  customerName: string
  customerEmail: string
  phone?: string
  address?: string
  productName?: string
  isLoggedIn: boolean
}

export async function sendEntrupyAppointmentEmailAction(payload: SendAppointmentPayload) {
  try {
    const res = await sendEntrupyAppointmentEmail({
      customerName: payload.customerName,
      customerEmail: payload.customerEmail,
      phone: payload.phone,
      address: payload.address,
      productName: payload.productName,
      isLoggedIn: payload.isLoggedIn
    })

    if (res.success) {
      return { success: true }
    } else {
      return { success: false, error: 'E-posta gönderimi başarısız.' }
    }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}
