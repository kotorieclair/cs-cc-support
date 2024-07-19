import { ChangeEvent, memo, useCallback } from 'react'

type Props = {
  value: string
  onChange: (newValue: string) => void
  className?: string
  placeholder?: string
}

const TextInput = memo(function TextInput({
  value,
  onChange,
  className,
  placeholder,
}: Props) {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value)
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

export { TextInput }
export type { Props as TextInputProps }
