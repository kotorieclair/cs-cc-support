import { ImageResponse } from 'next/og'
import { loadGoogleFont } from '@/lib/loadGoogleFont'

export const alt = 'PKB! CC Support'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  const bgSvg = encodeURIComponent(
    '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g fill="#c6d2ff1a" fill-rule="evenodd"><circle cx="3" cy="3" r="3" /><circle cx="13" cy="13" r="3" /></g></svg>'
  )

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontFamily: 'Cherry_Bomb_One',
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: '#09002f',
          backgroundImage: `url("data:image/svg+xml;utf8,${bgSvg}")`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="380px"
            height="380px"
            viewBox="0 0 512 512"
            fill="#fede1c"
            xmlSpace="preserve"
          >
            <path d="M215.906,35.272C223.438,20.006,238.984,10.35,256,10.35s32.563,9.656,40.094,24.922l44.484,90.141 c6.516,13.188,19.094,22.344,33.656,24.453l99.484,14.453c16.844,2.453,30.828,14.25,36.094,30.438 c5.266,16.172,0.875,33.953-11.313,45.828l-71.984,70.156c-10.531,10.281-15.344,25.078-12.859,39.578l17,99.062 c2.875,16.781-4.031,33.734-17.797,43.734s-32.016,11.313-47.078,3.406l-88.984-46.781c-13.016-6.844-28.578-6.844-41.609,0 l-88.969,46.781c-15.063,7.906-33.313,6.594-47.078-3.406c-13.781-10-20.672-26.953-17.797-43.734l17-99.062 c2.484-14.5-2.328-29.297-12.859-39.578L13.5,240.584C1.313,228.709-3.078,210.928,2.188,194.756 c5.266-16.188,19.25-27.984,36.094-30.438l99.484-14.453c14.547-2.109,27.141-11.266,33.656-24.453L215.906,35.272z"></path>
          </svg>
        </div>

        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1,
            textShadow:
              '#1c184b 6px 6px 2px, #1c184b -6px -6px 2px, #1c184b 6px 0px 2px, #1c184b -6px 0px 2px, #1c184b 0px 6px 2px, #1c184b 0px -6px 2px, #1c184b 6px -6px 2px, #1c184b -6px 6px 2px, #ffffff80 6px 6px 4px, #ffffff80 -6px -6px 4px, #ffffff80 6px 0px 4px, #ffffff80 -6px 0px 4px, #ffffff80 0px 6px 4px, #ffffff80 0px -6px 4px, #ffffff80 6px -6px 4px, #ffffff80 -6px 6px 4px',
          }}
        >
          <div
            style={{
              color: '#f861b4',
              fontSize: '120px',
            }}
          >
            PKB!
          </div>
          <div
            style={{
              color: '#71d1fe',
              fontSize: '80px',
              paddingTop: '10px',
            }}
          >
            CC Support
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
          name: 'Cherry_Bomb_One',
          data: await loadGoogleFont('Cherry+Bomb+One', `${alt}`),
          style: 'normal',
          weight: 400,
        },
      ],
    }
  )
}
