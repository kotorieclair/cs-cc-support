import { ChangeEvent, memo, useCallback } from 'react'

type Props<T extends number | string> = {
  type: 'radio' | 'checkbox'
  value: T
  onChange: (value: T, checked: boolean) => void
  checked: boolean
  disabled?: boolean
  className?: string
}

function RadioCheckInput<T extends number | string>({
  type,
  value,
  onChange,
  checked,
  disabled,
  className,
}: Props<T>) {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(value, e.target.checked)
    },
    [onChange, value]
  )

  return (
    <input
      type={type}
      value={value}
      onChange={handleChange}
      checked={checked}
      disabled={disabled}
      className={className}
    />
  )
}

const _RadioCheckInput = memo(RadioCheckInput) as typeof RadioCheckInput

export { _RadioCheckInput as RadioCheckInput }
export type { Props as RadioCheckInputProps }
