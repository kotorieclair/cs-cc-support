import { memo } from 'react'

type Props = {
  memoData: string[]
  className?: string
}

const MemoPreview = memo(function MemoPreview({
  memoData,
  className = '',
}: Props) {
  return (
    <div
      className={`w-full max-w-80 bg-base-content/[85%] text-base-100 text-xs rounded-sm p-3 ${className}`}
    >
      {memoData.map((m, i) => (
        <span key={i}>
          {m}
          <br />
        </span>
      ))}
    </div>
  )
})

export { MemoPreview }
export type { Props as MemoPreviewProps }
