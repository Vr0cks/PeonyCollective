import { ImageResponse } from 'next/og'


export const alt = 'Peony Collective - Dijital Mirasın Sahibi'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #000000, #1a1a1a)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
          color: 'white',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at center, rgba(175, 145, 100, 0.15) 0%, transparent 70%)',
          }}
        />
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
          <h1
            style={{
              fontSize: 84,
              fontWeight: 'normal',
              fontStyle: 'italic',
              letterSpacing: '-0.02em',
              margin: '0 0 20px 0',
              color: '#FFFFFF',
            }}
          >
            Peony Collective
          </h1>
          
          <p
            style={{
              fontSize: 32,
              color: '#AF9164',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              margin: '0 0 60px 0',
            }}
          >
            Lüksün Yeni Yaşam Döngüsü
          </p>

          <div style={{ display: 'flex', gap: '40px', marginTop: '40px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ color: '#AF9164', fontSize: 18, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>[ PEONY APPROVED ]</span>
              <span style={{ fontSize: 18, color: '#A1A1AA', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Entrupy Onaylı</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ color: '#AF9164', fontSize: 18, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>[ VIP SHIPPING ]</span>
              <span style={{ fontSize: 18, color: '#A1A1AA', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Sigortalı Teslimat</span>
            </div>
          </div>
        </div>
        
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            fontSize: 16,
            color: '#71717A',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
          }}
        >
          peonycollective.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
