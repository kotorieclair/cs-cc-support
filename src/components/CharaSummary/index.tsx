import { memo, ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

const CharaSummary = memo(function CharaSummary({
  children,
  className,
}: Props) {
  return (
    <div
      className={`relative border border-base-content/40 rounded-lg p-3 pt-5 pl-5 mt-3 ${className}`}
    >
      <span className="badge badge-lg badge-neutral absolute top-0 left-3 -translate-y-1/2">
        キャラクターデータ
      </span>
      <div className="flex flex-wrap gap-x-4 gap-y-1">{children}</div>
    </div>
  )
})

export { CharaSummary }
