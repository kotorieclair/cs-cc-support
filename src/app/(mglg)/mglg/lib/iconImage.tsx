import { ImageResponse } from 'next/og'
import { loadGoogleFont } from '@/lib/loadGoogleFont'

export const contentType = 'image/png'

export default function Image(size: number) {
  return async function Icon() {
    return new ImageResponse(
      (
        // ImageResponse JSX element
        <div
          style={{
            fontSize: `${size * 0.75}px`,
            fontFamily: 'Modern_Antiqua',
            width: '100%',
            height: '100%',
            lineHeight: `${size}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#8c0327',
          }}
        >
          <span
            style={{
              color: '#fff',
              transform: `translateY(-${size * 0.0}px)`,
            }}
          >
            M
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
            name: 'Modern_Antiqua',
            data: await loadGoogleFont('Modern+Antiqua', 'M'),
            style: 'normal',
            weight: 400,
          },
        ],
      }
    )
  }
}
