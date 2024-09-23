import { memo, ReactNode } from 'react'

type TitleColor = 'primary' | 'secondary'

type Props = {
  title: string
  titleColor: TitleColor
  children: ReactNode
  className?: string
}

const TITLE_COLOR_CLASSNAMES: { [key in TitleColor]: string } = {
  primary: 'badge-primary',
  secondary: 'badge-secondary',
}

const ConfirmFormBox = memo(function ConfirmFormBox({
  title,
  titleColor,
  children,
  className,
}: Props) {
  return (
    <div className={className}>
      <div
        className={`badge badge-md ${TITLE_COLOR_CLASSNAMES[titleColor]} mb-2`}
      >
        {title}
      </div>
      <div>{children}</div>
    </div>
  )
})

export { ConfirmFormBox }
export type { Props as ConfirmFormBoxProps }
