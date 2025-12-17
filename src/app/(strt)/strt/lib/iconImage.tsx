import { ImageResponse } from 'next/og'
import { loadGoogleFont } from '@/lib/loadGoogleFont'

export const contentType = 'image/png'

export default function Image(size: number) {
  return async function Icon() {
    const bs = size * 0.01

    return new ImageResponse(
      (
        // ImageResponse JSX element
        <div
          style={{
            fontSize: `${size * 0.7}px`,
            fontFamily: 'Modern_Antiqua',
            width: '100%',
            height: '100%',
            lineHeight: `${size}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1d232a',
          }}
        >
          <span
            style={{
              width: '80%',
              height: '80%',
              backgroundColor: '#135bf926',
              border: `#135bf9 ${bs < 1 ? 1 : bs}px solid`,
              borderRadius: `${size * 0.1}px`,
              position: 'absolute',
              top: '10%',
              left: '10%',
            }}
          ></span>
          <span
            style={{
              color: '#fede1c',
              WebkitTextStroke: '1px #fede1c',
            }}
          >
            S
          </span>
        </div>
      ),
      // ImageResponse options
      {
        // For convenience, we can re-use the exported opengraph-image
        // size config to also set the ImageResponse's width and height.
        width: size,
        height: size,
        fonts: [
          {
            name: 'Bungee_Outline',
            data: await loadGoogleFont('Bungee+Outline', 'S'),
            style: 'normal',
            weight: 400,
          },
        ],
      }
    )
  }
}
