import { memo, ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

const CharaSummary = memo(function CharaSummary({
  children,
  className = '',
}: Props) {
  return (
    <div
      className={`relative border border-base-content/40 rounded-lg pb-4 pt-6 px-4 md:px-5 mt-3 ${className}`}
    >
      <span className="badge badge-md md:badge-lg badge-neutral absolute top-0 left-3 -translate-y-1/2">
        キャラクターデータ
      </span>
      <div className="flex flex-wrap gap-x-4 gap-y-2">{children}</div>
    </div>
  )
})

export { CharaSummary }
