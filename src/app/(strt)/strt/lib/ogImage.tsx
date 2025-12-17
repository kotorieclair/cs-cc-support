import { ImageResponse } from 'next/og'
import { loadGoogleFont } from '@/lib/loadGoogleFont'

export const alt = 'STRATOSHOUT CC Support'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  const bgSvg1 = encodeURIComponent(
    '<svg width="84" height="48" viewBox="0 0 84 48" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h12v6H0V0zm28 8h12v6H28V8zm14-8h12v6H42V0zm14 0h12v6H56V0zm0 8h12v6H56V8zM42 8h12v6H42V8zm0 16h12v6H42v-6zm14-8h12v6H56v-6zm14 0h12v6H70v-6zm0-16h12v6H70V0zM28 32h12v6H28v-6zM14 16h12v6H14v-6zM0 24h12v6H0v-6zm0 8h12v6H0v-6zm14 0h12v6H14v-6zm14 8h12v6H28v-6zm-14 0h12v6H14v-6zm28 0h12v6H42v-6zm14-8h12v6H56v-6zm0-8h12v6H56v-6zm14 8h12v6H70v-6zm0 8h12v6H70v-6zM14 24h12v6H14v-6zm14-8h12v6H28v-6zM14 8h12v6H14V8zM0 8h12v6H0V8z" fill="#15191ee6" fill-rule="evenodd"/></svg>'
  )
  const bgSvg2 =
    '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><g fill="#135bf926"><path fill-rule="evenodd" d="M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0l28-28v2L54 40h-2zm4 0l24-24v2L58 40h-2zm4 0l20-20v2L62 40h-2zm4 0l16-16v2L66 40h-2zm4 0l12-12v2L70 40h-2zm4 0l8-8v2l-6 6h-2zm4 0l4-4v2l-2 2h-2z"/></g></svg>'

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1d232a',
          backgroundImage: `url("data:image/svg+xml;utf8,${bgSvg1}")`,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '30px',
            height: '70%',
            width: '80%',
            border: '#135bf9 2px solid',
            borderRadius: '20px',
            backgroundColor: '#1d232a',
            backgroundImage: `url("data:image/svg+xml;utf8,${bgSvg2}")`,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage:
                'linear-gradient(to bottom, #135bf94d, transparent 20%, transparent 80%, #135bf94d 100%)',
            }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100px"
            height="80px"
            viewBox="0 0 50 40"
            fill="#ea003e"
          >
            <path d="M4,19H0c.14-2.92.9-5.67,2.16-8.13l3.47,2.01c-.93,1.87-1.5,3.93-1.63,6.13ZM4,21H0c.14,2.92.9,5.67,2.16,8.14l3.47-2.01c-.93-1.87-1.5-3.94-1.63-6.13ZM11.11,6.64l-2-3.47c-2.38,1.54-4.41,3.57-5.95,5.96l3.46,2c1.18-1.78,2.71-3.31,4.48-4.49ZM6.63,28.87l-3.46,2c1.54,2.38,3.57,4.41,5.95,5.96l2-3.47c-1.78-1.18-3.3-2.71-4.48-4.49ZM18.97,4.01V0c-2.92.14-5.67.9-8.12,2.17l2.01,3.48c1.86-.93,3.93-1.5,6.12-1.64ZM35.94,19h4c-.14-2.92-.9-5.67-2.16-8.14l-3.47,2.01c.93,1.87,1.5,3.93,1.63,6.13ZM33.31,11.13l3.46-2c-1.54-2.38-3.57-4.41-5.95-5.96l-2,3.47c1.78,1.18,3.3,2.71,4.48,4.49ZM27.09,5.65l2.01-3.48C26.64.9,23.89.14,20.97,0v4.01c2.19.14,4.25.71,6.12,1.64ZM12.85,34.35l-2.01,3.48c2.46,1.26,5.21,2.02,8.12,2.17v-4.01c-2.19-.14-4.25-.71-6.12-1.64ZM35.94,21c-.14,2.19-.71,4.26-1.63,6.13l3.47,2.01c1.26-2.46,2.02-5.22,2.16-8.14h-4ZM20.97,35.99v4.01c2.92-.14,5.67-.9,8.12-2.17l-2.01-3.48c-1.86.93-3.93,1.5-6.12,1.64ZM28.83,33.36l2,3.47c2.38-1.54,4.41-3.57,5.95-5.96l-3.46-2c-1.18,1.78-2.71,3.31-4.48,4.49ZM19.97,5.96c-7.73,0-14.01,6.3-14.01,14.04s6.29,14.04,14.01,14.04,14.01-6.3,14.01-14.04-6.29-14.04-14.01-14.04" />
            <polygon points="42.99 15.95 42.99 24.05 50 20 42.99 15.95" />
          </svg>
          <div
            style={{
              color: '#fede1c',
              fontSize: '60px',
              fontFamily: 'Bungee_Outline',
              display: 'flex',
              flexDirection: 'column',
              WebkitTextStroke: '1px #fede1c',
            }}
          >
            <span>STRATOSHOUT</span>
            <span>CC Support</span>
          </div>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: 'Bungee_Outline',
          data: await loadGoogleFont('Bungee+Outline', `${alt}`),
          style: 'normal',
          weight: 400,
        },
      ],
    }
  )
}
