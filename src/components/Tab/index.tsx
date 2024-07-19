import { memo, ReactNode } from 'react'

type Props = {
  title: string
  className?: string
  children: ReactNode
}

const Tab = memo(function Tab({ title, className, children }: Props) {
  return (
    <div className={`tabs tabs-lifted ${className}`}>
      <span className="tab tab-active [--tab-bg:oklch(var(--nc))] font-bold whitespace-nowrap">
        {title}
      </span>
      <div className="tab-content bg-neutral-content border-base-300 rounded-lg p-4 md:p-6">
        {children}
      </div>
    </div>
  )
})

export { Tab }
export type { Props as TabProps }
