import { memo, ReactNode } from 'react'

type Props = {
  title: string
  children: ReactNode
  className?: string
}

const ConfirmFormBox = memo(function ConfirmFormBox({
  title,
  children,
  className,
}: Props) {
  return (
    <div className={className}>
      <div className={`badge badge-md badge-primary mb-2`}>{title}</div>
      <div>{children}</div>
    </div>
  )
})

export { ConfirmFormBox }
export type { Props as ConfirmFormBoxProps }
