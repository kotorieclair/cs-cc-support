import { memo, ReactNode } from 'react'

type Props = {
  text: ReactNode
  badgeText: string
  badgeColor: 'primary' | 'secondary' | 'accent' | 'neutral' | 'ghost'
}

const BADGE_TYPE_CLASSNAME = {
  primary: 'badge-primary',
  secondary: 'badge-secondary',
  accent: 'badge-accent',
  neutral: 'badge-neutral',
  ghost: 'badge-ghost',
}

const TextWithBadge = memo(function TextWithBadge({
  text,
  badgeText,
  badgeColor,
}: Props) {
  return (
    <div className="flex gap-1 items-center">
      <span className={`badge badge-sm ${BADGE_TYPE_CLASSNAME[badgeColor]}`}>
        {badgeText}
      </span>
      <span className="text-sm">{text}</span>
    </div>
  )
})

export { TextWithBadge }
export type { Props as TextWithBadgeProps }
