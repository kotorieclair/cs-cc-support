import { Innocent, Spooky } from '@/app/constants'
import { TextWithBadge } from '@kotorieclair/ktrecl-ui-tools'
import { memo } from 'react'
import { StepHeading } from '../StepHeading'
import Image from 'next/image'

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
      <div className="overflow-auto mt-10">
        {noInnocentData ? (
          <div className="bg-neutral border-8 border-base-content rounded-2xl h-[200px] mx-8 p-8 pr-[170px] relative overflow-hidden opacity-40 hover:cursor-not-allowed">
            <div className="relative z-[1]">
              <h3 className="badge badge-lg bg-base-content text-base-100">
                イノセント
              </h3>
              <div className="text-base mt-5">
                イノセントのデータではないみたい…
              </div>
            </div>
            <div className="absolute z-[1] right-0 bottom-0 bg-base-content text-base-100 text-lg font-semibold w-[150px] pl-6 pt-4 pb-2 rounded-tl-lg">
              選択不可
            </div>
            <Image
              src="/innocent_white.svg"
              width={280}
              height={280}
              alt=""
              className="absolute z-0 right-0 bottom-0 translate-x-2 translate-y-9 -rotate-[20deg] opacity-50"
            />
          </div>
        ) : (
          <div
            onClick={onSelectInnocent}
            className="bg-neutral border-8 border-primary rounded-2xl h-[200px] mx-8 p-8 pr-[170px] relative overflow-hidden hover-arrow"
          >
            <div className="relative z-[1]">
              <div className="flex gap-2">
                <h3 className="badge badge-lg badge-primary">イノセント</h3>
                <div className="text-lg">{innocent.name}</div>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-5">
                <TextWithBadge badgeText="年齢" badgeColor="accent">
                  {innocent.age}
                </TextWithBadge>
                <TextWithBadge badgeText="性別" badgeColor="accent">
                  {innocent.sex}
                </TextWithBadge>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                <TextWithBadge badgeText="才能" badgeColor="accent">
                  {innocent.talent}
                </TextWithBadge>
                <TextWithBadge badgeText="弱点" badgeColor="accent">
                  {innocent.weakpoint}
                </TextWithBadge>
                <TextWithBadge badgeText="得意分野" badgeColor="accent">
                  {innocent.speciality}
                </TextWithBadge>
              </div>
            </div>
            <div className="absolute z-[1] right-0 bottom-0 bg-primary text-primary-content text-lg font-semibold w-[150px] pl-6 pt-4 pb-2 rounded-tl-lg">
              <span className="msi msi-arrow-forward flex gap-2 items-center before:order-2 transition-transform hover-arrow-child">
                選択する！
              </span>
            </div>
            <Image
              src="/innocent.svg"
              width={280}
              height={280}
              alt=""
              className="absolute z-0 right-0 bottom-0 translate-x-2 translate-y-9 -rotate-[20deg] opacity-50"
            />
          </div>
        )}

        {noSpookyData ? (
          <div className="bg-neutral border-8 border-base-content rounded-2xl h-[200px] mt-6 mx-8 p-8 pr-[170px] relative overflow-hidden opacity-40 hover:cursor-not-allowed">
            <div className="relative z-[1]">
              <h3 className="badge badge-lg bg-base-content text-base-100">
                スプーキー
              </h3>
              <div className="text-base mt-5">
                スプーキーのデータではないみたい…
              </div>
            </div>
            <div className="absolute z-[1] right-0 bottom-0 bg-base-content text-base-100 text-lg font-semibold w-[150px] pl-6 pt-4 pb-2 rounded-tl-lg">
              選択不可
            </div>
            <Image
              src="/spooky_white.svg"
              width={240}
              height={240}
              alt=""
              className="absolute z-0 right-0 bottom-0 translate-x-2 translate-y-8 -rotate-[20deg] opacity-50"
            />
          </div>
        ) : (
          <div
            onClick={onSelectSpooky}
            className="bg-neutral border-8 border-secondary rounded-2xl h-[200px] mt-6 mx-8 p-8 pr-[170px] relative overflow-hidden hover-arrow"
          >
            <div className="relative z-[1]">
              <div className="flex gap-2">
                <h3 className="badge badge-lg badge-secondary">スプーキー</h3>
                <div className="text-lg">{spooky.name}</div>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-5">
                <TextWithBadge badgeText="リング" badgeColor="accent">
                  {spooky.ring}
                </TextWithBadge>
                <TextWithBadge badgeText="弱点" badgeColor="accent">
                  《{spooky.weakpoint}》
                </TextWithBadge>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                <TextWithBadge badgeText="からだ" badgeColor="accent">
                  {spooky.body.body}
                </TextWithBadge>
                <TextWithBadge badgeText="衣装1" badgeColor="accent">
                  {spooky.body.wear1}
                </TextWithBadge>
                <TextWithBadge badgeText="衣装2" badgeColor="accent">
                  {spooky.body.wear2}
                </TextWithBadge>
              </div>
            </div>
            <div className="absolute z-[1] right-0 bottom-0 bg-secondary text-secondary-content text-lg font-semibold w-[150px] pl-6 pt-4 pb-2 rounded-tl-lg">
              <span className="msi msi-arrow-forward flex gap-2 items-center before:order-2 transition-transform hover-arrow-child">
                選択する！
              </span>
            </div>
            <Image
              src="/spooky.svg"
              width={240}
              height={240}
              alt=""
              className="absolute z-0 right-0 bottom-0 translate-x-2 translate-y-8 -rotate-[20deg] opacity-50"
            />
          </div>
        )}
      </div>
    </>
  )
})

export { Step2Section }
