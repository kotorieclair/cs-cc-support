import { memo, useCallback } from 'react'

type Props<T extends number | string> = {
  value: T
  onChange: (args: { value: T; isChecked: boolean }) => void
  checked: boolean
  className?: string
}

function Checkbox<T extends number | string>({
  value,
  onChange,
  checked,
  className,
}: Props<T>) {
  const handleChange = useCallback(() => {
    onChange({ value, isChecked: !checked })
  }, [onChange, value, checked])

  return (
    <input
      type="checkbox"
      value={value}
      onChange={handleChange}
      checked={checked}
      className={className}
    />
  )
}

const _Checkbox = memo(Checkbox) as typeof Checkbox

export { _Checkbox as Checkbox }
export type { Props as CheckboxProps }
