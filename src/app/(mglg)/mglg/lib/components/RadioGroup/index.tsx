import { memo, useCallback } from 'react'
import {
  RadioCheckInput,
  RadioCheckInputProps,
  RadioCheckInputValue,
} from '@kotorieclair/ktrecl-ui-tools'

type Props<T extends RadioCheckInputValue> = {
  title: string
  options: { value: T; label: string; disabled?: boolean }[]
  value: T
  onChange: (value: T) => void
  className?: string
}

function RadioGroup<T extends RadioCheckInputValue>({
  title,
  options,
  value,
  onChange,
  className = '',
}: Props<T>) {
  const handleChange = useCallback<RadioCheckInputProps<T>['onChange']>(
    (_, val) => {
      onChange(val)
    },
    [onChange]
  )

  return (
    <div className={className}>
      <div className="badge badge-md badge-accent mb-1.5">{title}</div>
      <div className="flex flex-wrap gap-x-3 gap-y-1 items-center md:ml-4">
        {options.map((o, i) => (
          <label
            key={i}
            className="flex gap-1 items-center leading-none cursor-pointer"
          >
            <RadioCheckInput
              type="radio"
              value={o.value}
              onChange={handleChange}
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
