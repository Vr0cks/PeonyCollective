import { Resend } from 'resend'

// Resend instance'ını oluştur
// API key yoksa hata fırlatmamak için fallback olarak 'dummy' koyabiliriz ama .env'ye eklenmesi şart.
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key')

interface OrderConfirmationProps {
  orderId: string
  buyerName: string
  buyerEmail: string
  totalAmount: number
  productName: string
  trackingNumber?: string
}

export async function sendOrderConfirmationEmail({
  orderId,
  buyerName,
  buyerEmail,
  totalAmount,
  productName,
  trackingNumber
}: OrderConfirmationProps) {
  
  // Eğer API key tanımlanmamışsa sadece log atalım ki testlerde hata fırlatmasın.
  if (!process.env.RESEND_API_KEY) {
    console.warn('⚠️ RESEND_API_KEY tanımlı değil. E-posta simüle edildi:', { buyerEmail, orderId, productName })
    return { success: true, simulated: true }
  }

  const emailHtml = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-w-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #FAFAFA; color: #1A1A1A;">
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="font-family: 'Times New Roman', Times, serif; font-style: italic; font-weight: normal; font-size: 32px; letter-spacing: 2px; margin: 0;">Peony Collective</h1>
      </div>
      
      <div style="background-color: #FFFFFF; padding: 40px; border: 1px solid #EAEAEA;">
        <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: #AF9164; margin-bottom: 20px; font-weight: bold;">Siparişiniz Alındı</p>
        
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">Sayın ${buyerName},</p>
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 32px;">
          Peony Collective'den yaptığınız alışveriş için teşekkür ederiz. <strong>${productName}</strong> siparişiniz başarıyla alınmış olup, Peony Lab uzmanları tarafından işleme alınmıştır.
        </p>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px; font-size: 14px;">
          <tr style="border-bottom: 1px solid #EAEAEA;">
            <td style="padding: 12px 0; color: #666;">Sipariş Numarası</td>
            <td style="padding: 12px 0; text-align: right; font-weight: bold;">${orderId}</td>
          </tr>
          <tr style="border-bottom: 1px solid #EAEAEA;">
            <td style="padding: 12px 0; color: #666;">Toplam Tutar</td>
            <td style="padding: 12px 0; text-align: right; font-weight: bold;">${totalAmount.toLocaleString('tr-TR')} ₺</td>
          </tr>
          ${trackingNumber ? `
          <tr style="border-bottom: 1px solid #EAEAEA;">
            <td style="padding: 12px 0; color: #666;">Kargo Takip Kodu</td>
            <td style="padding: 12px 0; text-align: right; font-weight: bold;">${trackingNumber}</td>
          </tr>
          ` : ''}
        </table>

        <p style="font-size: 14px; line-height: 1.6; color: #666; margin-bottom: 24px;">
          Siparişinizin anlık kargo durumunu sitemizdeki <a href="https://peonycollective.com/kargom-nerede" style="color: #AF9164; text-decoration: none;">Kargom Nerede</a> sayfasından takip edebilirsiniz.
        </p>
        
        <p style="font-size: 14px; line-height: 1.6; color: #666;">
          Saygılarımızla,<br/>
          Peony VIP Concierge
        </p>
      </div>

      <div style="text-align: center; margin-top: 32px; font-size: 10px; color: #999; letter-spacing: 1px; text-transform: uppercase;">
        © 2026 PEONY COLLECTIVE. TÜM HAKLARI SAKLIDIR.
      </div>
    </div>
  `

  try {
    const data = await resend.emails.send({
      from: 'Peony Concierge <concierge@peonycollective.com>', // Doğrulanmış domain olmalı
      to: [buyerEmail],
      subject: `Peony Sipariş Onayı: ${productName}`,
      html: emailHtml,
    })

    return { success: true, data }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error }
  }
}

interface ProductStatusEmailProps {
  sellerEmail: string
  sellerName: string
  productName: string
  status: 'approved' | 'rejected'
  reason?: string
}

export async function sendProductStatusEmail({
  sellerEmail,
  sellerName,
  productName,
  status,
  reason
}: ProductStatusEmailProps) {
  
  if (!process.env.RESEND_API_KEY) {
    console.warn('⚠️ RESEND_API_KEY tanımlı değil. E-posta simüle edildi:', { sellerEmail, status, productName })
    return { success: true, simulated: true }
  }

  const title = status === 'approved' ? 'Ürününüz Onaylandı' : 'Ürününüz Reddedildi'
  const message = status === 'approved'
    ? `Tebrikler! <strong>${productName}</strong> ürününüz laboratuvar testlerinden başarıyla geçti ve platformumuzda satışa sunuldu.`
    : `Maalesef <strong>${productName}</strong> ürününüz kalite standartlarımızı karşılamadığı için reddedildi.`

  const reasonHtml = reason && status === 'rejected' ? `<p style="font-size: 14px; color: #DC2626; margin-top: 16px; padding: 12px; background-color: #FEF2F2; border: 1px solid #FCA5A5;"><strong>Red Nedeni:</strong> ${reason}</p>` : ''

  const emailHtml = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-w-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #FAFAFA; color: #1A1A1A;">
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="font-family: 'Times New Roman', Times, serif; font-style: italic; font-weight: normal; font-size: 32px; letter-spacing: 2px; margin: 0; color: #1A1A1A;">Peony Collective</h1>
      </div>
      
      <div style="background-color: #FFFFFF; padding: 40px; border: 1px solid #EAEAEA;">
        <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: ${status === 'approved' ? '#059669' : '#DC2626'}; margin-bottom: 20px; font-weight: bold;">
          ${title}
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">Sayın ${sellerName},</p>
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
          ${message}
        </p>
        
        ${reasonHtml}

        <div style="margin-top: 32px; padding-top: 32px; border-top: 1px solid #EAEAEA;">
          <a href="https://peonycollective.com/dashboard" style="display: inline-block; background-color: #1A1A1A; color: #FFFFFF; text-decoration: none; padding: 14px 24px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">
            Küratör Paneline Git
          </a>
        </div>
      </div>
    </div>
  `

  try {
    const data = await resend.emails.send({
      from: 'Peony Concierge <concierge@peonycollective.com>',
      to: [sellerEmail],
      subject: `Peony Lab Bildirimi: ${title}`,
      html: emailHtml,
    })

    return { success: true, data }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error }
  }
}
