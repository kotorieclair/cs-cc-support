import { memo, ReactNode } from 'react'

type Props = {
  num: number
  children: ReactNode
  className?: string
}

const StepHeading = memo(function StepHeading({
  num,
  children,
  className,
}: Props) {
  return (
    <h2
      className={`msi msi-number-${num} text-lg flex items-center before:pr-1 ${className}`}
    >
      {children}
    </h2>
  )
})

export { StepHeading }
