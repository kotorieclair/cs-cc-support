import { ImageResponse } from 'next/og'
import { loadGoogleFont } from '@/lib/loadGoogleFont'

export const contentType = 'image/png'

export default function Image(size: number) {
  return async function Icon() {
    const ts = '3px'
    const ts2 = `${size * 0.025}px`

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
            backgroundColor: '#09002f',
          }}
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={`${size * 0.9}px`}
            height={`${size * 0.9}px`}
            viewBox="0 0 512 512"
            fill="#fede1c"
            xmlSpace="preserve"
            style={{
              position: 'absolute',
              top: `${size * 0.05}px`,
              left: `${size * 0.05}px`,
            }}
          >
            <path d="M215.906,35.272C223.438,20.006,238.984,10.35,256,10.35s32.563,9.656,40.094,24.922l44.484,90.141 c6.516,13.188,19.094,22.344,33.656,24.453l99.484,14.453c16.844,2.453,30.828,14.25,36.094,30.438 c5.266,16.172,0.875,33.953-11.313,45.828l-71.984,70.156c-10.531,10.281-15.344,25.078-12.859,39.578l17,99.062 c2.875,16.781-4.031,33.734-17.797,43.734s-32.016,11.313-47.078,3.406l-88.984-46.781c-13.016-6.844-28.578-6.844-41.609,0 l-88.969,46.781c-15.063,7.906-33.313,6.594-47.078-3.406c-13.781-10-20.672-26.953-17.797-43.734l17-99.062 c2.484-14.5-2.328-29.297-12.859-39.578L13.5,240.584C1.313,228.709-3.078,210.928,2.188,194.756 c5.266-16.188,19.25-27.984,36.094-30.438l99.484-14.453c14.547-2.109,27.141-11.266,33.656-24.453L215.906,35.272z"></path>
          </svg>
          <span
            style={{
              color: '#f861b4',
              textShadow: `#1c184b ${ts2} ${ts2} ${ts}, #1c184b -${ts2} -${ts2} ${ts}, #1c184b ${ts2} 0px ${ts}, #1c184b -${ts2} 0px ${ts}, #1c184b 0px ${ts2} ${ts}, #1c184b 0px -${ts2} ${ts}, #1c184b ${ts2} -${ts2} ${ts}, #1c184b -${ts2} ${ts2} ${ts}`,
              transform: `translateY(-${size * 0.05}px)`,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            P!
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
            name: 'Cherry_Bomb_One',
            data: await loadGoogleFont('Cherry+Bomb+One', 'P!'),
            style: 'normal',
            weight: 400,
          },
        ],
      }
    )
  }
}
