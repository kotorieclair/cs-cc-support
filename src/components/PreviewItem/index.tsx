import { memo, ReactNode } from 'react'

type Props = {
  title: string
  children: ReactNode
  showPreview: boolean
  className?: string
}

const PreviewItem = memo(function PreviewItem({
  title,
  children,
  showPreview,
  className,
}: Props) {
  return (
    <div className={className}>
      <div className="badge badge-md badge-primary mb-2">{title}</div>
      {showPreview ? (
        children
      ) : (
        <div className="text-sm">
          キャラクターシート読み込み後に表示されます
        </div>
      )}
    </div>
  )
})

export { PreviewItem }
export type { Props as PreviewItemProps }
