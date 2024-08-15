import { ChangeEvent, memo, useCallback } from 'react'

type Props = {
  value: number | ''
  onChange: (newValue: number | '') => void
  className?: string
  placeholder?: string
}

const NumberInput = memo(function NumberInput({
  value,
  onChange,
  className,
  placeholder,
}: Props) {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value !== '') {
        const newVal = parseInt(e.target.value, 10)
        if (!Number.isNaN(newVal)) {
          onChange(newVal)
        }
      } else {
        onChange(e.target.value)
      }
    },
    [onChange]
  )

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className={className}
    />
  )
})

export { NumberInput }
export type { Props as NumberInputProps }
