import { ImageResponse } from 'next/og'

// Sertifikalı boyut ve içerik tipi tanımları
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: '#0F0F0E',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#AF9164',
          fontFamily: 'Georgia, serif',
          fontWeight: 'bold',
          borderRadius: '8px',
          border: '1.5px solid #AF9164',
        }}
      >
        P
      </div>
    ),
    {
      ...size,
    }
  )
}
