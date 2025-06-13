import { memo } from 'react'
import { Innocent, OUTPUT_TYPE, OutputType, Spooky } from '@/app/constants'
import { InnocentSection } from './InnocentSection'
import { SpookySection } from './SpookySection'
import { StepHeading } from '../StepHeading'

type Props = {
  innocent: Innocent
  spooky: Spooky
  csUrl: string
  outputType: OutputType
  useMp: boolean
  onToggleUseMp: () => void
}

const Step3Section = memo(function Step3Section({
  innocent,
  spooky,
  csUrl,
  outputType,
  useMp,
  onToggleUseMp,
}: Props) {
  return (
    <>
      <StepHeading num={3}>データを確認してコマを出力する！</StepHeading>
      <div className="mt-6 md:mt-8 md:px-2">
        {outputType === OUTPUT_TYPE.INNOCENT && (
          <InnocentSection
            innocent={innocent}
            csUrl={csUrl}
            useMp={useMp}
            onToggleUseMp={onToggleUseMp}
          />
        )}
        {outputType === OUTPUT_TYPE.SPOOKY && (
          <SpookySection
            spooky={spooky}
            csUrl={csUrl}
            useMp={useMp}
            onToggleUseMp={onToggleUseMp}
          />
        )}
      </div>
    </>
  )
})

export { Step3Section }
