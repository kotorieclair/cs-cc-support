import { memo, useCallback } from 'react'
import { Radio, RadioProps } from '../Radio'

type Props<T extends number | string> = {
  title: string
  options: { value: T; label: string; disabled?: boolean }[]
  value: T
  onChange: RadioProps<T>['onChange']
  // checked: boolean
  // disabled?: boolean
  className?: string
}

function RadioGroup<T extends number | string>({
  title,
  options,
  value,
  onChange,
  className,
}: Props<T>) {
  return (
    <div className={className}>
      <div className="badge badge-md badge-accent mb-1.5">{title}</div>
      <div className="flex gap-3 items-center ml-4">
        {options.map((o, i) => (
          <label
            key={i}
            className="flex gap-1 items-center leading-none cursor-pointer"
          >
            <Radio
              value={o.value}
              onChange={onChange}
              checked={o.value === value}
              className="radio radio-xs radio-primary"
              disabled={o.disabled}
            />
            <span className="text-sm">{o.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

const _RadioGroup = memo(RadioGroup) as typeof RadioGroup

export { _RadioGroup as RadioGroup }
export type { Props as RadioGroupProps }
