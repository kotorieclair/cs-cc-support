import {
  createContext,
  memo,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'

type Props = {
  title: string
  hasPreview?: boolean
  children: ReactNode
  className?: string
}

const ConfirmFormBoxPreviewContext = createContext(false)

const ConfirmFormBox = memo(function ConfirmFormBox({
  title,
  hasPreview = false,
  children,
  className = '',
}: Props) {
  const [isPreview, setIsPreview] = useState(false)

  const activateSettings = useCallback(() => {
    setIsPreview(false)
  }, [])
  const activatePreview = useCallback(() => {
    setIsPreview(true)
  }, [])

  return (
    <ConfirmFormBoxPreviewContext value={isPreview}>
      <div
        className={`md:grid grid-cols-subgrid col-span-3 items-start ${className}`}
      >
        <div className="col-span-3 mb-2">
          <div className="flex justify-between items-end">
            <div className="badge badge-sm md:badge-md badge-primary">
              {title}
            </div>
            {hasPreview && (
              <div className="join md:hidden">
                <button
                  className={`join-item btn btn-xs ${
                    !isPreview
                      ? 'btn-secondary shadow-none'
                      : 'btn-soft text-neutral-content'
                  }`}
                  onClick={activateSettings}
                >
                  調整
                </button>
                <button
                  className={`join-item btn btn-xs ${
                    !isPreview
                      ? 'btn-soft text-neutral-content'
                      : 'btn-secondary shadow-none'
                  }`}
                  onClick={activatePreview}
                >
                  プレビュー
                </button>
              </div>
            )}
          </div>
        </div>
        {children}
      </div>
    </ConfirmFormBoxPreviewContext>
  )
})

const ConfirmFormBoxDivider = memo(function ConfirmFormBoxDivider() {
  return <div className="divider divider-horizontal max-md:hidden"></div>
})

const ConfirmFormBoxSettings = memo(function ConfirmFormBoxSettings({
  children,
}: {
  children: ReactNode
}) {
  const isPreview = useContext(ConfirmFormBoxPreviewContext)
  return (
    <div className={`${isPreview ? 'hidden' : ''} md:block`}>{children}</div>
  )
})

const ConfirmFormBoxPreview = memo(function ConfirmFormBoxPreview({
  children,
}: {
  children: ReactNode
}) {
  const isPreview = useContext(ConfirmFormBoxPreviewContext)
  return (
    <div className={`${!isPreview ? 'hidden' : ''} md:block`}>{children}</div>
  )
})

type ContainerProps = {
  children: ReactNode
  className?: string
}

const ConfirmFormBoxContainer = memo(function ConfirmFormBoxContainer({
  children,
  className,
}: ContainerProps) {
  return (
    <div
      className={`grid md:grid-cols-[auto_max-content_max-content] w-full ${className}`}
    >
      {children}
    </div>
  )
})

export {
  ConfirmFormBox,
  ConfirmFormBoxDivider,
  ConfirmFormBoxSettings,
  ConfirmFormBoxPreview,
  ConfirmFormBoxContainer,
}
export type {
  Props as ConfirmFormBoxProps,
  ContainerProps as ConfirmFormBoxContainerProps,
}
