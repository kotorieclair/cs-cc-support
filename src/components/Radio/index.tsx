import { memo, useCallback } from 'react'

type Props<T extends number | string> = {
  value: T
  onChange: (value: T) => void
  checked: boolean
  disabled?: boolean
  className?: string
}

function Radio<T extends number | string>({
  value,
  onChange,
  checked,
  disabled,
  className,
}: Props<T>) {
  const handleChange = useCallback(() => {
    onChange(value)
  }, [onChange, value])

  return (
    <input
      type="radio"
      value={value}
      onChange={handleChange}
      checked={checked}
      disabled={disabled}
      className={className}
    />
  )
}

const _Radio = memo(Radio) as typeof Radio

export { _Radio as Radio }
export type { Props as RadioProps }
