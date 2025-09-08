import { memo, ReactNode } from 'react'
import Image from 'next/image'
import { mPlus1p } from '@/strt/fonts'

type Props = {
  step: number
  title: string
  children: ReactNode
  className?: string
}

const StepSection = memo(function StepSection({
  step,
  title,
  children,
  className,
}: Props) {
  return (
    <div className={`h-full w-screen relative ${className}`}>
      <div className="h-[75px] w-full absolute top-3 left-0 z-0">
        <Image
          src="/strt/backline_line.svg"
          width={10}
          height={75}
          alt=""
          className="w-full h-[75px]"
        />
      </div>

      <div className="w-full max-w-250 h-full mx-auto relative z-1">
        <div className="w-full h-[75px] mx-auto top-3 absolute z-0 bg-base-100 flex">
          <Image
            src="/strt/backline_line.svg"
            width={10}
            height={75}
            alt=""
            className="opacity-40 basis-23"
          />
          <Image
            src="/strt/backline_wave.svg"
            width={110}
            height={75}
            alt=""
            className="opacity-40 flex-none"
          />
          <Image
            src="/strt/backline_line.svg"
            width={10}
            height={75}
            alt=""
            className="opacity-40 flex-auto"
          />
        </div>
        <div
          className="max-h-full bg-pattern rounded-sm border-1 border-primary relative overflow-y-auto z-1"
          data-scroll-target={step}
        >
          <div className="w-full h-6 bg-linear-to-b from-primary/30 to-transparent rounded-t-sm sticky top-0 left-0 z-10" />

          <div className="p-6 pt-0">
            <div
              className={`flex items-center gap-3 mb-10 ${mPlus1p.className}`}
            >
              <div className="w-[50px] h-[40px] leading-10 text-center text-secondary-content relative">
                <span className="w-[40px] h-full left-0 top-0 absolute z-1">
                  {step}
                </span>
                <Image
                  src="/strt/heading.svg"
                  width={50}
                  height={40}
                  alt=""
                  className="absolute z-0 left-0 top-0 drop-shadow-md/40"
                />
              </div>
              <div className="text-xl text-shadow-lg">{title}</div>
            </div>
            <div className="mx-8">{children}</div>
          </div>

          <div className="w-full h-6 bg-linear-to-t from-primary/30 to-transparent rounded-b-sm sticky bottom-0 left-0 z-10" />
        </div>
      </div>
    </div>
  )
})

export { StepSection }
export type { Props as StepSectionProps }
