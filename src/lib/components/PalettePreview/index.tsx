import { memo } from 'react'

type Props = {
  paletteData: string[]
  className?: string
}

const PalettePreview = memo(function PalettePreview({
  paletteData,
  className = '',
}: Props) {
  return (
    <div
      className={`w-full max-w-80 h-[300px] overflow-y-auto bg-[#333] text-gray-100 text-base rounded-sm pt-2 ${className}`}
    >
      {paletteData.map(
        (p, i) =>
          p && (
            <div key={i} className="px-4 py-3 hover:bg-white/10 cursor-pointer">
              {p}
              <br />
            </div>
          )
      )}
    </div>
  )
})

export { PalettePreview }
export type { Props as PalettePreviewProps }
