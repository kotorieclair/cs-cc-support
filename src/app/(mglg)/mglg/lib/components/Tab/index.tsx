import {
  memo,
  ReactNode,
  useCallback,
  useContext,
  useState,
  createContext,
} from 'react'

type Props = {
  title: string
  className?: string
  children: ReactNode
}

const Tab = memo(function Tab({ title, className = '', children }: Props) {
  return (
    <div className={`tabs tabs-lift ${className}`}>
      <span className="tab tab-active [--tab-bg:var(--color-neutral-content)] font-bold whitespace-nowrap">
        {title}
      </span>
      <div className="tab-content bg-neutral-content border-base-300 p-4 md:p-6">
        {children}
      </div>
    </div>
  )
})

const TabContentContext = createContext(false)

const TabColContent = memo(function TabColContent({
  children,
}: {
  children: ReactNode
}) {
  const [isPreview, setIsPreview] = useState(false)

  const activateSettingsTab = useCallback(() => {
    setIsPreview(false)
  }, [])
  const activatePreviewTab = useCallback(() => {
    setIsPreview(true)
  }, [])

  return (
    <TabContentContext.Provider value={isPreview}>
      <div className="tabs tabs-sm tabs-box md:hidden mb-4 bg-white/50 grid grid-cols-2">
        <div
          onClick={activateSettingsTab}
          className={`tab ${
            !isPreview
              ? 'tab-active [--tab-bg:var(--color-primary)] text-primary-content'
              : ''
          }`}
        >
          設定
        </div>
        <div
          onClick={activatePreviewTab}
          className={`tab ${
            isPreview
              ? 'tab-active [--tab-bg:var(--color-primary)] text-primary-content'
              : ''
          }`}
        >
          プレビュー
        </div>
      </div>
      <div className="block md:flex items-start">{children}</div>
    </TabContentContext.Provider>
  )
})

const TabColLeft = memo(function TabColLeft({
  children,
}: {
  children: ReactNode
}) {
  const isPreview = useContext(TabContentContext)

  return (
    <div
      className={`${
        isPreview ? 'max-md:hidden' : ''
      } flex-none w-full max-w-[360px]`}
    >
      {children}
    </div>
  )
})

const TabColDivider = memo(function TabColDivider() {
  return <div className="divider divider-horizontal max-md:hidden"></div>
})

const TabColRight = memo(function TabColRight({
  children,
}: {
  children: ReactNode
}) {
  const isPreview = useContext(TabContentContext)

  return (
    <div className={`${!isPreview ? 'max-md:hidden' : ''} flex-1`}>
      {children}
    </div>
  )
})

export { Tab, TabColContent, TabColLeft, TabColDivider, TabColRight }
export type { Props as TabProps }
