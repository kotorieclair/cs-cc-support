import { ChangeEvent, memo, useCallback } from 'react'

type Props = {
  value: string
  onChange: (newValue: string) => void
  className?: string
  placeholder?: string
}

const Textarea = memo(function Textarea({
  value,
  onChange,
  className,
  placeholder,
}: Props) {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value)
    },
    [onChange]
  )

  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className={className}
    />
  )
})

export { Textarea }
export type { Props as TextareaProps }
