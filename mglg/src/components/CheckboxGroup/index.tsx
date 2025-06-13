import { memo, useCallback } from 'react'
import {
  RadioCheckInput,
  RadioCheckInputProps,
  RadioCheckInputValue,
} from '@kotorieclair/ktrecl-ui-tools'

type Props<T extends RadioCheckInputValue> = {
  title: string
  options: { value: T; label: string; disabled?: boolean }[]
  values: T[]
  onChange: (values: T[]) => void
  className?: string
}

function CheckboxGroup<T extends RadioCheckInputValue>({
  title,
  options,
  values,
  onChange,
  className = '',
}: Props<T>) {
  const handleChange = useCallback<RadioCheckInputProps<T>['onChange']>(
    (checked, val) => {
      onChange(checked ? [...values, val] : values.filter((v) => v !== val))
    },
    [onChange, values]
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
              type="checkbox"
              value={o.value}
              onChange={handleChange}
              checked={values.includes(o.value)}
              className="checkbox checkbox-xs checkbox-primary"
              disabled={o.disabled}
            />
            <span className="text-sm">{o.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

const _RadioGroup = memo(CheckboxGroup) as typeof CheckboxGroup

export { _RadioGroup as CheckboxGroup }
export type { Props as RadioGroupProps }
