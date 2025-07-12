import { CcCharacter } from '@kotorieclair/ktrecl-ui-tools'
import { memo } from 'react'

type Props = {
  statusData: CcCharacter['status']
  className?: string
}

const StatusPreview = memo(function StatusPreview({
  statusData,
  className = '',
}: Props) {
  return (
    <div
      className={`w-full max-w-60 bg-base-content/[85%] rounded-sm p-3 h-[120px] ${className}`}
    >
      <div className="flex flex-wrap gap-[3px] max-w-[210px]">
        {statusData.map(
          (d, i) =>
            i < 8 && (
              <div
                key={i}
                className="flex justify-between w-[96px] h-[16px] text-sm font-extrabold leading-none text-border p-[1px] bg-white/40 rounded-[1px]"
              >
                <div className="truncate max-w-[60px]">{d.label}</div>
                <div>
                  {d.value}
                  {d.max > 0 && `/${d.max}`}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  )
})

export { StatusPreview }
export type { Props as StatusPreviewProps }
