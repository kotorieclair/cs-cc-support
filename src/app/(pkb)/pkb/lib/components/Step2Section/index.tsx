import { memo } from 'react'
import Image from 'next/image'
import { TextWithBadge } from '@kotorieclair/ktrecl-ui-tools'
import { Innocent, Spooky } from '@/pkb/constants'
import { StepHeading } from '../StepHeading'

type Props = {
  innocent: Innocent
  spooky: Spooky
  onSelectInnocent: () => void
  onSelectSpooky: () => void
}

const Step2Section = memo(function Step2Section({
  innocent,
  spooky,
  onSelectInnocent,
  onSelectSpooky,
}: Props) {
  const noInnocentData = !innocent.talent || !innocent.weakpoint
  const noSpookyData = !spooky.name
  return (
    <>
      <StepHeading num={2}>イノセントかスプーキーかを選択する！</StepHeading>
      <div className="overflow-auto mt-5 md:mt-10">
        {noInnocentData ? (
          <div className="bg-base-300 border-8 border-neutral-content rounded-2xl min-h-[190px] md:min-h-[200px] md:mx-8 p-4 md:p-8 relative overflow-hidden opacity-40 hover:cursor-not-allowed">
            <div className="relative z-[1] max-md:pb-10">
              <h3 className="badge badge-md md:badge-lg bg-neutral-content text-base-100">
                イノセント
              </h3>
              <div className="text-sm md:text-base mt-3 md:mt-5 md:pr-[150px]">
                イノセントのデータではないみたい…
              </div>
            </div>
            <div className="absolute z-[1] right-0 bottom-0 bg-neutral-content text-base-100 text-base md:text-lg font-semibold w-[150px] pl-6 pt-3 md:pt-4 pb-1.5 md:pb-2 rounded-tl-lg">
              選択不可
            </div>
            <Image
              src="/pkb/innocent_white.svg"
              width={280}
              height={280}
              alt=""
              className="absolute z-0 right-0 bottom-0 translate-x-2 md:translate-y-8 -rotate-[20deg] opacity-50 w-[210px] h-[210px] md:w-[280px] md:h-[280px]"
            />
          </div>
        ) : (
          <div
            onClick={onSelectInnocent}
            className="bg-base-300 border-8 border-primary rounded-2xl min-h-[190px] md:min-h-[200px] md:mx-8 p-4 md:p-8 relative overflow-hidden hover-arrow"
          >
            <div className="relative z-[1] max-md:pb-10">
              <div className="flex items-center gap-2">
                <h3 className="badge badge-md md:badge-lg badge-primary">
                  イノセント
                </h3>
                <div className="text-base md:text-lg">{innocent.name}</div>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 md:mt-5 md:pr-[150px]">
                <TextWithBadge badgeText="年齢" badgeColor="warning">
                  {innocent.age}
                </TextWithBadge>
                <TextWithBadge badgeText="性別" badgeColor="warning">
                  {innocent.sex}
                </TextWithBadge>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 md:pr-[150px]">
                <TextWithBadge badgeText="才能" badgeColor="warning">
                  {innocent.talent}
                </TextWithBadge>
                <TextWithBadge badgeText="弱点" badgeColor="warning">
                  {innocent.weakpoint}
                </TextWithBadge>
                <TextWithBadge badgeText="得意分野" badgeColor="warning">
                  {innocent.speciality}
                </TextWithBadge>
              </div>
            </div>
            <div className="absolute z-[1] right-0 bottom-0 bg-primary text-primary-content text-base md:text-lg font-semibold w-[150px] pl-6 pt-3 md:pt-4 pb-1.5 md:pb-2 rounded-tl-lg">
              <span className="msi msi-arrow-forward flex gap-2 items-center before:order-2 transition-transform hover-arrow-child">
                選択する！
              </span>
            </div>
            <Image
              src="/pkb/innocent.svg"
              width={280}
              height={280}
              alt=""
              className="absolute z-0 right-0 bottom-0 translate-x-2 md:translate-y-8 -rotate-[20deg] opacity-50 w-[210px] h-[210px] md:w-[280px] md:h-[280px]"
            />
          </div>
        )}

        {noSpookyData ? (
          <div className="bg-base-300 border-8 border-neutral-content rounded-2xl min-h-[190px] md:min-h-[200px] mt-4 md:mt-6 md:mx-8 p-4 md:p-8 relative overflow-hidden opacity-40 hover:cursor-not-allowed">
            <div className="relative z-[1] max-md:pb-10">
              <h3 className="badge badge-md md:badge-lg bg-neutral-content text-base-100">
                スプーキー
              </h3>
              <div className="text-sm md:text-base mt-3 md:mt-5 md:pr-[150px]">
                スプーキーのデータではないみたい…
              </div>
            </div>
            <div className="absolute z-[1] right-0 bottom-0 bg-neutral-content text-base-100 text-base md:text-lg font-semibold w-[150px] pl-6 pt-3 md:pt-4 pb-1.5 md:pb-2 rounded-tl-lg">
              選択不可
            </div>
            <Image
              src="/pkb/spooky_white.svg"
              width={240}
              height={240}
              alt=""
              className="absolute z-0 right-0 bottom-0 translate-x-2 md:translate-y-8 -rotate-[20deg] opacity-50 w-[170px] h-[170px] md:w-[240px] md:h-[240px]"
            />
          </div>
        ) : (
          <div
            onClick={onSelectSpooky}
            className="bg-base-300 border-8 border-secondary rounded-2xl min-h-[190px] md:min-h-[200px] mt-4 md:mt-6 md:mx-8 p-4 md:p-8 relative overflow-hidden hover-arrow"
          >
            <div className="relative z-[1] max-md:pb-10">
              <div className="flex items-center gap-2">
                <h3 className="badge badge-md md:badge-lg badge-secondary">
                  スプーキー
                </h3>
                <div className="text-base md:text-lg">{spooky.name}</div>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 md:mt-5 md:pr-[150px]">
                <TextWithBadge badgeText="リング" badgeColor="warning">
                  {spooky.ring}
                </TextWithBadge>
                <TextWithBadge badgeText="弱点" badgeColor="warning">
                  《{spooky.weakpoint}》
                </TextWithBadge>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 md:pr-[150px]">
                <TextWithBadge badgeText="からだ" badgeColor="warning">
                  {spooky.body.body}
                </TextWithBadge>
                <TextWithBadge badgeText="衣装1" badgeColor="warning">
                  {spooky.body.wear1}
                </TextWithBadge>
                {spooky.body.wear2 && (
                  <TextWithBadge badgeText="衣装2" badgeColor="warning">
                    {spooky.body.wear2}
                  </TextWithBadge>
                )}
              </div>
            </div>
            <div className="absolute z-[1] right-0 bottom-0 bg-secondary text-secondary-content text-base md:text-lg font-semibold w-[150px] pl-6 pt-3 md:pt-4 pb-1.5 md:pb-2 rounded-tl-lg">
              <span className="msi msi-arrow-forward flex gap-2 items-center before:order-2 transition-transform hover-arrow-child">
                選択する！
              </span>
            </div>
            <Image
              src="/pkb/spooky.svg"
              width={240}
              height={240}
              alt=""
              className="absolute z-0 right-0 bottom-0 translate-x-2 md:translate-y-8 -rotate-[20deg] opacity-50 w-[170px] h-[170px] md:w-[240px] md:h-[240px]"
            />
          </div>
        )}
      </div>
    </>
  )
})

export { Step2Section }
