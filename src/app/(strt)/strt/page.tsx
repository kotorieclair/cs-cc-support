'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  CcCharacter,
  CcCharacterClipboardData,
  FakeInput,
  RadioCheckInput,
  SelectInput,
  StatusParamsField,
  TextareaInput,
  TextInput,
  ToastAlerts,
  useToastAlerts,
} from '@kotorieclair/ktrecl-ui-tools'
import { fetchCsData } from '@/lib/util/fetchCsData'
import { normalizeText } from '@/lib/util/normalizeText'
import {
  CSDataLearnedRow,
  CSDataLearnedSkillType,
  SYSTEM_ID,
} from '@/app/constants'
import {
  Chara,
  CsData,
  INSTRUMENTS,
  INSTRUMENTS_OPTIONS,
  LABELS,
  SKILLS_WITH_ROW_NAME,
  STRATEGIES,
  STRATEGIES_OPTIONS,
} from './constants'
import { getInstrument } from './lib/util/getInstrument'
import { getStrategy } from './lib/util/getStrategy'
import {
  ConfirmFormBox,
  ConfirmFormBoxContainer,
  ConfirmFormBoxDivider,
  ConfirmFormBoxPreview,
  ConfirmFormBoxSettings,
} from './lib/components/ConfirmFormBox'
import { removePhraseBurstFromAbilities } from './lib/util/removePhraseBurstFromAbilities'
import { StepSection } from './lib/components/StepSection'
import { MemoPreview } from '@/lib/components/MemoPreview'
import { StatusPreview } from '@/lib/components/StatusPreview'
import { PalettePreview } from '@/lib/components/PalettePreview'

export default function StrtHome() {
  const [csUrl, setCsUrl] = useState('')
  const [isLoadingCs, setIsLoadingCs] = useState(false)

  const [chara, setChara] = useState<Chara>({} as Chara)

  // ステータスに消費コンディションや無効化シガラミ数を含めるかどうか
  const [useUsedCondition, setUseUsedCondition] = useState(true)
  const [useNeutralizedEnems, setUseNeutralizedEnems] = useState(true)

  // 出力上書きのコーナー！
  const [nameOverride, setNameOverride] = useState('')
  const [instrumentOverride, setInstrumentOverride] = useState('')
  const [strategyOverride, setStrategyOverride] = useState('')
  const [memoOverride, setMemoOverride] = useState('')
  const [statusOverride, setStatusOverride] = useState<CcCharacter['status']>(
    []
  )
  const [parameterOverride, setParameterOverride] = useState<
    CcCharacter['params']
  >([])
  const [paletteOverride, setPaletteOverride] =
    useState<CcCharacter['commands']>('')

  // 現在ステップ数管理
  const [currentStep, setCurrentStep] = useState(1)

  const { toastAlerts, addToastAlert } = useToastAlerts()

  const stepContainerRef = useRef<HTMLDivElement>(null)

  const goToStep1 = useCallback(() => {
    setCurrentStep(1)
    stepContainerRef.current
      ?.querySelector('[data-scroll-target="1"]')
      ?.scrollTo({ top: 0 })
  }, [])
  const goToStep2 = useCallback(() => {
    setCurrentStep(2)
    stepContainerRef.current
      ?.querySelector('[data-scroll-target="2"]')
      ?.scrollTo({ top: 0 })
  }, [])
  const goToStep3 = useCallback(() => {
    setCurrentStep(3)
    stepContainerRef.current
      ?.querySelector('[data-scroll-target="3"]')
      ?.scrollTo({ top: 0 })
  }, [])

  // 消費コンディションをステータスに含めるかどうか切り替え
  const toggleUseUsedCondition = useCallback(() => {
    setUseUsedCondition((prevVal) => !prevVal)
  }, [])

  // 無効化シガラミ数をステータスに含めるかどうか切り替え
  const toggleUseNeutralizedEnems = useCallback(() => {
    setUseNeutralizedEnems((prevVal) => !prevVal)
  }, [])

  // キャラクターメモの出力用データの元を作成
  const memoOutputData = useMemo<string[]>(() => {
    const subInfo = []
    if (chara.age) {
      subInfo.push(`年齢：${chara.age}`)
    }
    if (chara.sex) {
      subInfo.push(`性別：${chara.sex}`)
    }
    if (chara.level) {
      subInfo.push(`レベル：${chara.level}`)
    }

    const bonds =
      chara.bonds?.length && chara.bonds?.some((b) => b.name)
        ? [
            '',
            '絆：',
            ...chara.bonds.map(
              (b) => `${b.name}（${b.attribute}／強度${b.level}）`
            ),
          ]
        : []

    const abilities =
      chara.abilities?.length && chara.abilities?.some((a) => a.name)
        ? [
            '',
            `スキル：${chara.abilities.map((a) => `【${a.name}】`).join('')}`,
          ]
        : []

    return [
      `${chara.name}${chara.nameKana ? `（${chara.nameKana}）` : ''}${
        chara.player ? `　PL:${chara.player}` : ''
      }`,
      subInfo.join('／'),
      '',
      `楽器：${
        chara.instrument === instrumentOverride
          ? chara.instrumentName
          : instrumentOverride
      }`,
      `作戦：${strategyOverride}`,
      `経緯：${chara.circumstances}`,
      '',
      `特技：${chara.skills?.map((s) => `《${s}》`).join('')}`,
      ...bonds,
      ...abilities,
    ]
  }, [chara, instrumentOverride, strategyOverride])

  // メモ出力用データの元が変わったら、上書き設定のほうも上書き
  useEffect(() => {
    setMemoOverride(memoOutputData.join('\n'))
  }, [memoOutputData])

  // ステータスの出力用データを作成
  const statusOutputData = useMemo<CcCharacter['status']>(
    () => [
      { label: LABELS.BASE_SKILL, value: chara.mastery || 0, max: 0 },
      { label: 'コンディション', value: 0, max: 0 },
      { label: 'ディスコード', value: 0, max: 0 },
      ...(useUsedCondition
        ? [{ label: LABELS.USED_COND, value: 0, max: 0 }]
        : []),
      ...(instrumentOverride === INSTRUMENTS.VO && useNeutralizedEnems
        ? [{ label: LABELS.NEUT_ENEMS, value: 0, max: 0 }]
        : []),
    ],
    [useUsedCondition, useNeutralizedEnems, chara.mastery, instrumentOverride]
  )

  // ステータス出力用データの元が変わったら、上書き設定のほうも上書き
  useEffect(() => {
    setStatusOverride(statusOutputData)
  }, [statusOutputData])

  // チャットパレットの出力用データを作成
  const paletteOutputData = useMemo<string[]>(() => {
    const usedCond = useUsedCondition
      ? `{${LABELS.USED_COND}}`
      : `(${LABELS.USED_COND})`
    const neutEnems = useNeutralizedEnems
      ? `{${LABELS.NEUT_ENEMS}}`
      : `(${LABELS.NEUT_ENEMS})`

    const BASE_DMG = `{${LABELS.INST_DAMAGE}}+{${LABELS.BASE_SKILL}}+${usedCond}`
    const NORMAL_DMG = `${BASE_DMG}+{${LABELS.LAST_SPURT}}`
    const PHRASE_DMG = `${BASE_DMG}+2D6+{${LABELS.LAST_SPURT}}`

    const phraseBurst =
      instrumentOverride === INSTRUMENTS.VO
        ? `${PHRASE_DMG}+(${neutEnems}*2)D6 フレーズバースト・天唱`
        : instrumentOverride === INSTRUMENTS.GT
        ? `${NORMAL_DMG} フレーズバースト・弦語`
        : instrumentOverride === INSTRUMENTS.BA
        ? `${BASE_DMG}D6+{${LABELS.LAST_SPURT}} フレーズバースト・隙殺`
        : instrumentOverride === INSTRUMENTS.KEY
        ? `${PHRASE_DMG} フレーズバースト・軽階`
        : instrumentOverride === INSTRUMENTS.DR
        ? `${PHRASE_DMG} フレーズバースト・追鳴`
        : ''

    const abilities =
      chara.abilities?.length && chara.abilities?.some((a) => a.name)
        ? [
            ' ',
            '### スキル ###',
            ...chara.abilities.map((a) => `【${a.name}】`),
          ]
        : []

    return [
      '### 判定 ###',
      ...(chara.skills || []).map((s) => `2D6>=5 （判定：${s}）`),
      ' ',
      '### 攻撃 ###',
      `${NORMAL_DMG} 通常攻撃`,
      `${PHRASE_DMG} フレーズ攻撃`,
      `${phraseBurst}`,
      ' ',
      '### 回復 ###',
      '1D6 通常回復',
      '2D6 フレーズ回復',
      ' ',
      '### 特技 ###',
      ...(chara.skills || []).map((s) => `《${s}》`),
      ...abilities,
    ]
  }, [
    chara.skills,
    chara.abilities,
    instrumentOverride,
    useUsedCondition,
    useNeutralizedEnems,
  ])

  // チャットパレット出力用データの元が変わったら、上書き設定のほうも上書き
  useEffect(() => {
    setPaletteOverride(paletteOutputData.join('\n'))
  }, [paletteOutputData])

  const handleClickOutput = useCallback(() => {
    const ccChara: CcCharacter = {
      name: nameOverride,
      memo: memoOverride,
      status: statusOverride,
      externalUrl: csUrl,
      params: parameterOverride,
      commands: paletteOverride,
    }

    const ccOutput: CcCharacterClipboardData = {
      kind: 'character',
      data: ccChara,
    }

    try {
      navigator.clipboard.writeText(JSON.stringify(ccOutput))
      addToastAlert('info', 'キャラクターコマをクリップボードに出力しました')
    } catch (e) {
      console.error(e)
      addToastAlert(
        'error',
        'キャラクターコマのクリップボードへの出力に失敗しました'
      )
    }
  }, [
    nameOverride,
    memoOverride,
    csUrl,
    statusOverride,
    parameterOverride,
    paletteOverride,
    addToastAlert,
  ])

  // キャラシのデータが無事に読み込まれているかどうか
  const isCharaDataAvailable = useMemo(() => Object.keys(chara).length, [chara])

  // CS読み込み処理
  const loadCs = useCallback(async () => {
    try {
      let data: CsData
      if (
        process.env.NEXT_PUBLIC_USE_SAMPLE === 'true' &&
        process.env.NEXT_PUBLIC_SAMPLE_DATA_STRT
      ) {
        const loaded = await import(process.env.NEXT_PUBLIC_SAMPLE_DATA_STRT)
        data = loaded.data
      } else {
        data = await fetchCsData<CsData>(csUrl, SYSTEM_ID.STRT)
      }

      if (data) {
        // 特技
        const skills = data.learned.reduce<string[]>((acc, skill) => {
          if (skill.id) {
            const split = skill.id.split('.')
            const skillType = split[2] as CSDataLearnedSkillType
            const row = split[1] as CSDataLearnedRow
            const skillName = SKILLS_WITH_ROW_NAME[skillType][row]

            return [...acc, skillName]
          }
          return acc
        }, [])

        const instrument = getInstrument(data.base.instrument.name || '')

        const strategy = getStrategy(data.base.strategy || '')

        const abilities =
          data.ability &&
          removePhraseBurstFromAbilities(data.ability).map((a) => ({
            name: a.name || '',
            timing: a.timing || '',
            effect: a.effect || '',
          }))

        const bonds = data.bonds?.map((b) => ({
          name: b.name || '',
          attribute: b.attribute || '',
          level: b.level ? parseInt(normalizeText(b.level), 10) : 0,
        }))

        const charaData: Chara = {
          player: data.base.player || '',
          name: data.base.name || '',
          nameKana: data.base.nameKana || '',
          sex: data.base.sex || '',
          age: data.base.age || '',
          level: data.base.level
            ? parseInt(normalizeText(data.base.level), 10)
            : 0,
          bandName: data.base.bandname || '',
          circumstances: data.base.circumstances || '',
          instrument: instrument || INSTRUMENTS.VO,
          instrumentDamage: normalizeText(data.base.instrument.damage || ''),
          instrumentName: data.base.instrument.name || '',
          strategy: strategy || STRATEGIES.EMOTION,
          mastery: data.base.instrument.skill
            ? parseInt(normalizeText(data.base.instrument.skill), 10)
            : 0,
          skills,
          abilities: abilities || [],
          bonds: bonds || [],
        }

        setChara(charaData)

        // 出力用データの上書きを準備
        setNameOverride(charaData.name)
        setInstrumentOverride(charaData.instrument)
        setStrategyOverride(charaData.strategy)
        setParameterOverride([
          { label: LABELS.INST_DAMAGE, value: charaData.instrumentDamage },
          { label: LABELS.LAST_SPURT, value: '0' },
        ])

        goToStep2()
        setIsLoadingCs(false)
      }
    } catch (e) {
      setIsLoadingCs(false)
      console.error(e)
      addToastAlert(
        'error',
        (e as Error)?.message || 'キャラクターシートの読み込みに失敗しました'
      )
    }
  }, [csUrl, addToastAlert, goToStep2])

  // CS読み込み中のローディング処理
  const handleClickLoadCs = useCallback(() => {
    setIsLoadingCs(true)
    loadCs()
  }, [loadCs])

  return (
    <div className="h-full overflow-x-hidden relative">
      <div
        className={`h-full flex transition-transform duration-300 ${
          currentStep === 1
            ? 'translate-x-0'
            : currentStep === 2
            ? '-translate-x-[100%]'
            : currentStep === 3
            ? '-translate-x-[200%]'
            : ''
        }`}
        ref={stepContainerRef}
      >
        <StepSection
          step={1}
          title="キャラクターシートの読み込み"
          className="flex-none px-8"
        >
          <div className="text-center">
            <TextInput
              placeholder="キャラクターシート倉庫URL"
              value={csUrl}
              onChange={setCsUrl}
              className="input-md w-full mb-7"
            />
            <button
              onClick={
                csUrl || process.env.NEXT_PUBLIC_USE_SAMPLE === 'true'
                  ? handleClickLoadCs
                  : () => {}
              }
              className={`btn btn-md btn-success ${
                !csUrl ? 'cursor-not-allowed' : ''
              } px-10 msi msi-load`}
              disabled={
                !(csUrl || process.env.NEXT_PUBLIC_USE_SAMPLE === 'true')
              }
            >
              CS読み込み
            </button>
          </div>

          <div
            className={`text-center mt-8 ${!isLoadingCs ? 'invisible' : ''}`}
          >
            <span className="loading loading-ring w-8" />
            <span className="loading loading-ring w-8" />
            <span className="loading loading-ring w-8" />
            <div>loading...</div>
          </div>
        </StepSection>
        <StepSection
          step={2}
          title="読み込んだ内容の確認"
          className="flex-none px-8"
        >
          <div className="badge badge-md badge-secondary mb-4">
            キャラシデータ
          </div>
          <div className="text-xs">{chara.nameKana}</div>
          <div className="text-xl">{chara.name}</div>
          <div className="text-sm flex flex-wrap gap-x-3 gap-y-1 mt-3">
            <span className="flex gap-1 items-center">
              <span className="badge badge-xs badge-primary">年齢</span>
              {chara.age}
            </span>
            <span className="flex gap-1 items-center">
              <span className="badge badge-xs badge-primary">性別</span>
              {chara.sex}
            </span>
            <span className="flex gap-1 items-center">
              <span className="badge badge-xs badge-primary">レベル</span>
              {chara.level}
            </span>
            <span className="flex gap-1 items-center">
              <span className="badge badge-xs badge-primary">楽器威力</span>
              {chara.instrumentDamage}
            </span>
            <span className="flex gap-1 items-center">
              <span className="badge badge-xs badge-primary">腕前</span>
              {chara.mastery}
            </span>
          </div>
          <div className="flex gap-4 mt-7">
            <div className="w-1/2 max-w-50">
              <div className="badge badge-sm badge-primary mb-1.5">楽器</div>
              <div>
                <SelectInput
                  options={INSTRUMENTS_OPTIONS}
                  value={instrumentOverride}
                  onChange={setInstrumentOverride}
                  initLabel="楽器を選択"
                  className="select-md"
                />
              </div>
            </div>
            <div className="w-1/2 max-w-50">
              <div className="badge badge-sm badge-primary mb-1.5">作戦</div>
              <div>
                <SelectInput
                  options={STRATEGIES_OPTIONS}
                  value={strategyOverride}
                  onChange={setStrategyOverride}
                  initLabel="作戦を選択"
                  className="select-md"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-12">
            <button
              className="btn btn-md btn-warning msi msi-rewind px-8"
              onClick={goToStep1}
            >
              戻る
            </button>
            <button
              className="btn btn-md btn-success msi msi-forward flex-row-reverse px-8"
              onClick={goToStep3}
            >
              確認OK
            </button>
          </div>
        </StepSection>
        <StepSection
          step={3}
          title="出力内容の確認・調整と出力"
          className="flex-none px-8"
        >
          <div className="badge badge-md badge-secondary mb-3">
            ステータスに含めるもの
          </div>
          <div className="flex gap-1 items-center">
            <div className="text-sm">{LABELS.USED_COND}：</div>
            <RadioCheckInput
              type="toggle"
              value="usedCond"
              checked={useUsedCondition}
              onChange={toggleUseUsedCondition}
              className="toggle-sm toggle-primary"
            />
          </div>
          {instrumentOverride === INSTRUMENTS.VO && (
            <div className="flex gap-1 items-center mt-2">
              <div className="text-sm">{LABELS.NEUT_ENEMS}：</div>
              <RadioCheckInput
                type="toggle"
                value="usedCond"
                checked={useNeutralizedEnems}
                onChange={toggleUseNeutralizedEnems}
                className="toggle-sm toggle-primary"
              />
            </div>
          )}
          {isCharaDataAvailable && (
            <ConfirmFormBoxContainer className="gap-y-6 mt-10">
              <ConfirmFormBox title="名前">
                <TextInput
                  value={nameOverride}
                  onChange={setNameOverride}
                  className="w-full"
                />
              </ConfirmFormBox>
              <ConfirmFormBox title="キャラクターメモ" hasPreview>
                <ConfirmFormBoxSettings>
                  <TextareaInput
                    value={memoOverride}
                    onChange={setMemoOverride}
                    className="w-full h-[250px]"
                  />
                </ConfirmFormBoxSettings>
                <ConfirmFormBoxDivider />
                <ConfirmFormBoxPreview>
                  <MemoPreview memoData={memoOverride.split('\n')} />
                </ConfirmFormBoxPreview>
              </ConfirmFormBox>
              <ConfirmFormBox title="参照URL（※編集不可）">
                <FakeInput value={csUrl} className="w-full" />
              </ConfirmFormBox>
              <ConfirmFormBox title="ステータス" hasPreview>
                <ConfirmFormBoxSettings>
                  <StatusParamsField
                    type="status"
                    size="md"
                    values={statusOverride}
                    onChange={setStatusOverride}
                  />
                </ConfirmFormBoxSettings>
                <ConfirmFormBoxDivider />
                <ConfirmFormBoxPreview>
                  <StatusPreview statusData={statusOverride} />
                </ConfirmFormBoxPreview>
              </ConfirmFormBox>
              <ConfirmFormBox title="パラメータ" hasPreview>
                <StatusParamsField
                  type="params"
                  size="md"
                  values={parameterOverride}
                  onChange={setParameterOverride}
                />
              </ConfirmFormBox>
              <ConfirmFormBox title="チャットパレット" hasPreview>
                <ConfirmFormBoxSettings>
                  <TextareaInput
                    value={paletteOverride}
                    onChange={setPaletteOverride}
                    className="w-full h-[250px]"
                  />
                </ConfirmFormBoxSettings>
                <ConfirmFormBoxDivider />
                <ConfirmFormBoxPreview>
                  <PalettePreview paletteData={paletteOverride.split('\n')} />
                </ConfirmFormBoxPreview>
              </ConfirmFormBox>
            </ConfirmFormBoxContainer>
          )}
          <div className="flex justify-between mt-12">
            <button
              className="btn btn-md btn-warning msi msi-rewind px-8"
              onClick={goToStep2}
            >
              戻る
            </button>
            <button
              className="btn btn-md btn-info msi msi-output flex-row-reverse px-8"
              onClick={handleClickOutput}
            >
              コマを出力
            </button>
          </div>
        </StepSection>
      </div>

      <ToastAlerts alerts={toastAlerts} />
    </div>
  )
}
