'use client'

import { useCallback, useState } from 'react'
import Image from 'next/image'
import {
  TextInput,
  ToastAlerts,
  ToastAlertsContext,
  useToastAlerts,
} from '@kotorieclair/ktrecl-ui-tools'
import {
  CSDataLearnedRow,
  CSDataLearnedSkillType,
  SYSTEM_ID,
} from '@/app/constants'
import { fetchCsData } from '@/lib/util/fetchCsData'
import {
  Innocent,
  Spooky,
  CsData,
  SKILLS_WITH_ROW_NAME,
  OUTPUT_TYPE,
  OutputType,
} from './constants'
import { getSpecialityFromCsSkills } from './lib/util/getSpecialityFromCsSkills'
import { Step2Section } from './lib/components/Step2Section'
import { Step3Section } from './lib/components/Step3Section'
import { StepHeading } from './lib/components/StepHeading'
import { cherrybomb } from './fonts'

// 出力したいもの
// イノセント：元気、眠気、MP、（メモ：才能、弱点、特技）
// スプーキー：魔力、MP、（パラメータ：攻撃力とか）（メモ：リング、体、魔法）（チャパレ：オバケ判定）

export default function PkbHome() {
  const [csUrl, setCsUrl] = useState('')
  const [isLoadingCs, setIsLoadingCs] = useState(false)
  const [innocent, setInnocent] = useState<Innocent>({} as Innocent)
  const [spooky, setSpooky] = useState<Spooky>({} as Spooky)

  const [step, setStep] = useState(1)
  const [outputType, setOutputType] = useState<OutputType>(OUTPUT_TYPE.NONE)
  const [useMp, setUseMp] = useState(false)

  const { toastAlerts, addToastAlert } = useToastAlerts()

  // 出力対象をイノセントに設定
  const handleSelectInnocent = useCallback(() => {
    setStep(3)
    setOutputType(OUTPUT_TYPE.INNOCENT)
  }, [])

  // 出力対象をスプーキーに設定
  const handleSelectSpooky = useCallback(() => {
    setStep(3)
    setOutputType(OUTPUT_TYPE.SPOOKY)
  }, [])

  const handleClickBackToStep2 = useCallback(() => {
    setStep(2)
    setOutputType(OUTPUT_TYPE.NONE)
  }, [])

  // MPを採用するか否か
  const toggleUseMp = useCallback(() => {
    setUseMp((prevVal) => !prevVal)
  }, [])

  // CS読み込み処理
  const loadCs = useCallback(async () => {
    try {
      let data: CsData
      if (
        process.env.NEXT_PUBLIC_USE_SAMPLE === 'true' &&
        process.env.NEXT_PUBLIC_SAMPLE_DATA_PKB
      ) {
        const loaded = await import(process.env.NEXT_PUBLIC_SAMPLE_DATA_PKB)
        data = loaded.data
      } else {
        data = await fetchCsData<CsData>(csUrl, SYSTEM_ID.PKB)
      }

      if (data) {
        // イノセント
        const innoSkills = data.learned.reduce<string[]>((acc, skill) => {
          if (skill.id) {
            const split = skill.id.split('.')
            const skillType = split[2] as CSDataLearnedSkillType
            const row = split[1] as CSDataLearnedRow
            const skillName = SKILLS_WITH_ROW_NAME[skillType][row]

            return [...acc, skillName]
          }
          return acc
        }, [])
        const inno: Innocent = {
          name: data.base.innocent.name ?? '',
          age: data.base.innocent.age ?? '',
          memo: data.base.innocent.memo ?? '',
          sex: data.base.innocent.sex ?? '',
          talent: data.base.innocent.tarrent ?? '',
          weakpoint: data.base.innocent.weekpoint ?? '',
          skills: innoSkills,
          speciality: getSpecialityFromCsSkills(data.skills) ?? '',
        }
        setInnocent(inno)

        // スプーキー
        const spMagic = [
          data.ability.magic1 ?? '',
          data.ability.magic2 ?? '',
          data.ability.magic3 ?? '',
        ]
        const sp: Spooky = {
          name: data.base.spooky.name ?? '',
          attack: data.base.spooky.attack
            ? parseInt(data.base.spooky.attack, 10)
            : 0,
          defense: data.base.spooky.defense
            ? parseInt(data.base.spooky.defense, 10)
            : 0,
          help: data.base.spooky.help ? parseInt(data.base.spooky.help, 10) : 0,
          interrupt: data.base.spooky.interrupt
            ? parseInt(data.base.spooky.interrupt, 10)
            : 0,
          mana: data.base.spooky.magic
            ? parseInt(data.base.spooky.magic, 10)
            : 0,
          memo: data.base.spooky.memo ?? '',
          ring: data.base.spooky.ring ? `${data.base.spooky.ring}族` : '',
          url: data.base.spooky.url ?? '',
          weakpoint: data.base.spooky.weekpoint ?? '',
          magic: spMagic,
          body: {
            body: data.ability.body ?? '',
            wear1: data.ability.wear1 ?? '',
            wear2: data.ability.wear2 ?? '',
          },
        }
        setSpooky(sp)

        setIsLoadingCs(false)
        setStep(2)
      }
    } catch (e) {
      setIsLoadingCs(false)
      console.error(e)
      addToastAlert(
        'error',
        (e as Error)?.message || 'キャラクターシートの読み込みに失敗しました'
      )
    }
  }, [csUrl, addToastAlert])

  // CS読み込み中のローディング処理
  const handleClickLoadCs = useCallback(() => {
    setIsLoadingCs(true)
    setStep(1)
    loadCs()
  }, [loadCs])

  return (
    <ToastAlertsContext value={{ addToastAlert }}>
      <div className="md:flex flex-col gap-6 md:h-full">
        <div className="flex-none bg-box px-3 py-4 md:p-4">
          <StepHeading num={1}>キャラクターシートを読み込む！</StepHeading>
          <div className="md:flex gap-2 mt-3 md:mx-2">
            <TextInput
              value={csUrl}
              onChange={setCsUrl}
              placeholder="キャラクターシート倉庫URL"
              className="input-sm w-full"
            />
            <div className="flex-none max-md:mt-3 text-center">
              <button
                onClick={
                  csUrl || process.env.NEXT_PUBLIC_USE_SAMPLE === 'true'
                    ? handleClickLoadCs
                    : () => {}
                }
                className={`btn btn-success btn-sm msi msi-load gap-1 ${
                  !csUrl ? 'cursor-not-allowed' : ''
                }`}
              >
                CS読み込み
              </button>
            </div>
          </div>
        </div>

        {!isLoadingCs && step === 1 && (
          <div className="h-full flex items-center justify-center pt-6 md:py-6">
            <div className="p-8 rounded-full bg-base-100">
              <Image
                src="/pkb/spooky_loading.svg"
                width={150}
                height={150}
                alt=""
                className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] opacity-30"
              />
            </div>
          </div>
        )}

        {isLoadingCs && (
          <div className="h-full flex items-center justify-center pt-6 md:py-6">
            <div className="p-8 rounded-full bg-base-100 relative">
              <Image
                src="/pkb/spooky_loading.svg"
                width={150}
                height={150}
                alt=""
                className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] opacity-30 animate-pulse"
              />
              <div
                className={`${cherrybomb.className} text-center text-2xl md:text-3xl absolute top-1/2 left-1/2 -translate-x-1/2`}
              >
                loading...
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex-1 md:flex flex-col overflow-hidden max-md:mt-3">
            <div className="flex-1 bg-box md:overflow-auto md:scrollable-overlay animate-slide-in">
              <div className="px-3 py-4 md:p-4 md:pb-0 md:scrollable-overlay-content">
                <Step2Section
                  innocent={innocent}
                  spooky={spooky}
                  onSelectInnocent={handleSelectInnocent}
                  onSelectSpooky={handleSelectSpooky}
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex-1 md:flex flex-col overflow-hidden animate-slide-in max-md:mt-3">
            <div className="mb-1.5 md:mb-2">
              <button
                onClick={handleClickBackToStep2}
                className="btn btn-xs md:btn-sm btn-accent msi msi-arrow-back"
              >
                選択しなおす
              </button>
            </div>

            <div className="bg-box md:overflow-auto md:scrollable-overlay">
              <div className="px-3 py-4 md:p-4 md:pb-0 md:scrollable-overlay-content">
                <Step3Section
                  innocent={innocent}
                  spooky={spooky}
                  csUrl={csUrl}
                  outputType={outputType}
                  useMp={useMp}
                  onToggleUseMp={toggleUseMp}
                />
              </div>
            </div>
          </div>
        )}

        <ToastAlerts alerts={toastAlerts} />
      </div>
    </ToastAlertsContext>
  )
}
