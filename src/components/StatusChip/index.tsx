import { memo } from 'react'

type Props = {
  label: string
  value: number
  max: number
}

const StatusChip = memo(function StatusChip({ label, value, max }: Props) {
  return (
    <div className="flex justify-between w-[96px] h-[16px] text-sm font-extrabold leading-none text-border p-[1px] bg-white/40 rounded-[1px]">
      <div className="truncate max-w-[60px]">{label}</div>
      <div>
        {value}
        {max > 0 && `/${max}`}
      </div>
    </div>
  )
})

export { StatusChip }
export type { Props as StatusChipProps }
