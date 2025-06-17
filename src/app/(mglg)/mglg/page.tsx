'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  CcCharacter,
  CcCharacterClipboardData,
  FakeInput,
  StatusParamsField,
  TextareaInput,
  TextInput,
  TextWithBadge,
  ToastAlerts,
  useToastAlerts,
} from '@kotorieclair/ktrecl-ui-tools'
import { pickCostFromCsData } from './lib/util/pickCostFromCsData'
import { generateMagicStatusLabel } from './lib/util/generateMagicStatusLabel'
import { StatusChip } from './lib/components/StatusChip'
import {
  Tab,
  TabColContent,
  TabColDivider,
  TabColLeft,
  TabColRight,
} from './lib/components/Tab'
import { RadioGroup } from './lib/components/RadioGroup'
import { CheckboxGroup } from './lib/components/CheckboxGroup'
import { SelectTable } from './lib/components/SelectTable'
import { PreviewItem } from './lib/components/PreviewItem'
import { ConfirmFormBox } from './lib/components/ConfirmFormBox'
import {
  Chara,
  CsData,
  CSDataLearnedDomain,
  CSDataLearnedRow,
  DOMAIN_TYPE_MAPPER,
  Magic,
  MAGIC_TYPES,
  MagicCost,
  SKILLS_ALL,
  SKILLS_WITH_ROW_NAME,
} from './constants'
import { antiqua } from './fonts'
import { SYSTEM_ID, URL_BASE } from '@/app/constants'

const MAGIC_OUTPUT_LINE_1 = 0
const MAGIC_OUTPUT_LINE_2 = 1

const ADS_OUTPUT_DEST_PARAM = 'params'
const ADS_OUTPUT_DEST_STATUS = 'status'

const RADIO_COMMON_TRUE = 1
const RADIO_COMMON_FALSE = 0

const PALETTE_OUTPUT_SOUL_SKILL = 'soulSkill'
const PALETTE_OUTPUT_SKILLS = 'skills'
const PALETTE_OUTPUT_SKILL_NAMES = 'skillNames'

// キャラコマをオンマウスしたときに、蔵書を表示したほうがよいかな？
// 攻撃力、防御力、根源力はパラメータに
// 魔力と一時的魔力をステータスに
// オンマウスで名前、魔法名、階梯、経歴／機関とか追加……選択式にしたいね

// やっぱりコスト：なしも選択できるようにしたい
// テキセだと一覧で見れたほうがよいかも
// 特技かコストに入力があれば表示するか……

// 順番入れ替え機能欲しいな……
// キャラ一覧に表示されるのは最大8個まで、という注意書きを入れたい

// ステータスとして管理したい蔵書と、コマのキャラメモに出力したい蔵書を分けて設定したい

// キャラコマのキャラメモも出力サンプルつけたい

export default function MglgHome() {
  const [csUrl, setCsUrl] = useState('')
  const [isLoadingCs, setIsLoadingCs] = useState(false)

  const [chara, setChara] = useState<Chara>({} as Chara)
  const [magic, setMagic] = useState<Magic[]>([])

  const [magicOutputLineNum, setMagicOutputLineNum] =
    useState(MAGIC_OUTPUT_LINE_1)

  const [statusOutputMagic, setStatusOutputMagic] = useState<number[]>([])
  const [adsOutputDest, setAdsOutputDest] = useState<
    typeof ADS_OUTPUT_DEST_PARAM | typeof ADS_OUTPUT_DEST_STATUS
  >(ADS_OUTPUT_DEST_PARAM)

  const [memoOutputMagic, setMemoOutputMagic] = useState<number[]>([])
  const [isMagicOutputGrouped, setIsMagicOutputGrouped] =
    useState(RADIO_COMMON_FALSE)
  const [shouldOutputSkills, setShouldOutputSkills] =
    useState(RADIO_COMMON_TRUE)

  const [paletteOutputSettings, setPaletteOutputSettings] = useState([
    PALETTE_OUTPUT_SKILLS,
    PALETTE_OUTPUT_SOUL_SKILL,
    PALETTE_OUTPUT_SKILL_NAMES,
  ])
  const [paletteOutputMagic, setPaletteOutputMagic] = useState<number[]>([])

  // 追加上書き用のコーナー！
  const [nameOverride, setNameOverride] = useState('')
  const [memoOverride, setMemoOverride] = useState('')
  const [statusOverride, setStatusOverride] = useState<CcCharacter['status']>(
    []
  )
  const [parameterOverride, setParameterOverride] = useState<
    CcCharacter['params']
  >([])
  const [paletteOverride, setPaletteOverride] =
    useState<CcCharacter['commands']>('')

  const { toastAlerts, addToastAlert } = useToastAlerts()

  // 魔法名コピーのカレー化
  const curryCopyMagicName = useCallback(
    (i: number) => {
      return () => {
        const name = magic[i].name[magicOutputLineNum]

        try {
          navigator.clipboard.writeText(name)
          addToastAlert('info', '魔法名をクリップボードにコピーしました')
        } catch (e) {
          console.error(e)
          addToastAlert(
            'error',
            '魔法名のクリップボードへのコピーに失敗しました'
          )
        }
      }
    },
    [magic, magicOutputLineNum, addToastAlert]
  )

  // 出力として選択できる魔法一覧
  const outputSelectableMagic = useMemo(
    () => magic.filter((m) => m.name && (m.cost || m.skill)),
    [magic]
  )

  // 魔法名出力に2行目を選択できるかどうか
  // 魔法名に2行目があるなら可能とする
  const isNameOutputLineNum2Disabled = useMemo(
    () => magic.some((m) => (m.cost || m.skill) && m.name.length === 1),
    [magic]
  )

  // 出力用ステータスのデータを生成
  const statusOutputData = useMemo<CcCharacter['status']>(() => {
    const adsData =
      adsOutputDest === ADS_OUTPUT_DEST_STATUS
        ? [
            {
              label: '攻撃力',
              value: chara.attack,
              max: 0,
            },
            {
              label: '防御力',
              value: chara.defense,
              max: 0,
            },
            {
              label: '根源力',
              value: chara.source,
              max: 0,
            },
          ]
        : []

    const statusMagicData = statusOutputMagic.map((i) => ({
      label: generateMagicStatusLabel(
        magic[i].name[magicOutputLineNum],
        typeof magic[i].cost === 'object'
          ? (magic[i].cost as MagicCost)
          : undefined
      ),
      value: 0,
      max: typeof magic[i].cost === 'object' ? chara.source : 0,
    }))

    return [
      { label: '魔力', value: 0, max: 0 },
      { label: '一時的魔力', value: 0, max: 0 },
      ...adsData,
      ...statusMagicData,
    ]
  }, [
    adsOutputDest,
    chara.attack,
    chara.defense,
    chara.source,
    magic,
    magicOutputLineNum,
    statusOutputMagic,
  ])

  // ステータス更新
  useEffect(() => {
    setStatusOverride(statusOutputData)
  }, [statusOutputData])

  // 出力用パラメータのデータを生成
  const parameterOutputData = useMemo<CcCharacter['params']>(
    () =>
      adsOutputDest === ADS_OUTPUT_DEST_PARAM
        ? [
            {
              label: '攻撃力',
              value: `${chara.attack || 0}`,
            },
            {
              label: '防御力',
              value: `${chara.defense || 0}`,
            },
            {
              label: '根源力',
              value: `${chara.source || 0}`,
            },
          ]
        : [],
    [adsOutputDest, chara.attack, chara.defense, chara.source]
  )

  // パラメータ更新
  useEffect(() => {
    setParameterOverride(parameterOutputData)
  }, [parameterOutputData])

  // 出力用キャラクターメモのデータを作成
  const memoOutputData = useMemo<string[]>(() => {
    const { summon, spell, permanent } = memoOutputMagic.reduce(
      (acc, i) => {
        const mgc = magic[i]
        if (mgc.name && (mgc.cost || mgc.skill)) {
          const name = `【${mgc.name[magicOutputLineNum]}】`
          if (mgc.type === MAGIC_TYPES.SUMMON || !isMagicOutputGrouped) {
            return {
              ...acc,
              summon: [...acc.summon, name],
            }
          }
          if (mgc.type === MAGIC_TYPES.SPELL) {
            return {
              ...acc,
              spell: [...acc.spell, name],
            }
          }
          if (mgc.type === MAGIC_TYPES.PERMANENT) {
            return {
              ...acc,
              permanent: [...acc.permanent, name],
            }
          }
          return acc
        } else {
          return acc
        }
      },
      {
        summon: [],
        spell: [],
        permanent: [],
      } as {
        [key in 'summon' | 'spell' | 'permanent']: string[]
      }
    )

    const magicData = isMagicOutputGrouped
      ? [
          '',
          `召喚：${summon.join('')}`,
          `呪文：${spell.join('')}`,
          `装備：${permanent.join('')}`,
        ]
      : ['', summon.join('')]

    const skillsData = shouldOutputSkills
      ? ['', `特技：${(chara.skills ?? []).map((s) => `《${s}》`).join('')}`]
      : []

    return [
      `「${chara.magicname}」${chara.covername}`,
      [chara.level ? `第${chara.level}階梯` : '', chara.career].join('　'),
      [
        chara.domain ? `領域：${chara.domain}` : '',
        chara.soulSkill ? `魂の特技：《${chara.soulSkill}》` : '',
      ].join('　'),
      [
        chara.attack ? `攻撃力：${chara.attack}` : '',
        chara.defense ? `防御力：${chara.defense}` : '',
        chara.source ? `根源力：${chara.source}` : '',
      ].join('　'),
      ...skillsData,
      // '',
      ...(memoOutputMagic.length ? magicData : []),
    ]
  }, [
    chara,
    magic,
    magicOutputLineNum,
    memoOutputMagic,
    isMagicOutputGrouped,
    shouldOutputSkills,
  ])

  // キャラクターメモ更新
  useEffect(() => {
    setMemoOverride(memoOutputData.join('\n'))
  }, [memoOutputData])

  // 出力用チャットパレットのデータを作成
  const paletteOutputData = useMemo<string[]>(() => {
    const skillsOutput = paletteOutputSettings.includes(PALETTE_OUTPUT_SKILLS)
      ? chara.skills?.map((s) => `2D6>=5 （判定：${s}）`) ?? []
      : []

    const soulSkillOutput = paletteOutputSettings.includes(
      PALETTE_OUTPUT_SOUL_SKILL
    )
      ? [`2D6>=6 （判定：${chara.soulSkill}／魔力1消費）`]
      : []

    const skillNamesOutput = paletteOutputSettings.includes(
      PALETTE_OUTPUT_SKILL_NAMES
    )
      ? chara.skills?.map((s) => `《${s}》`) ?? []
      : []

    const magicOutput = paletteOutputMagic.map(
      (i) => `【${magic[i].name[magicOutputLineNum]}】`
    )

    return [
      ...skillsOutput,
      ...soulSkillOutput,
      ...skillNamesOutput,
      ...magicOutput,
    ]
  }, [
    chara,
    magic,
    paletteOutputMagic,
    paletteOutputSettings,
    magicOutputLineNum,
  ])

  // チャットパレット更新
  useEffect(() => {
    setPaletteOverride(paletteOutputData.join('\n'))
  }, [paletteOutputData])

  // コマ出力ボタンをクリック
  const handleClickOutput = useCallback(() => {
    const ccChara: CcCharacter = {
      name: chara.covername,
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
    chara,
    csUrl,
    statusOverride,
    parameterOverride,
    memoOverride,
    paletteOverride,
    addToastAlert,
  ])

  // CS読み込み処理
  const loadCs = useCallback(async () => {
    try {
      let data: CsData
      if (
        process.env.NEXT_PUBLIC_USE_SAMPLE === 'true' &&
        process.env.NEXT_PUBLIC_SAMPLE_DATA_MGLG
      ) {
        const loaded = await import(process.env.NEXT_PUBLIC_SAMPLE_DATA_MGLG)
        data = loaded.data
      } else {
        const { href, searchParams } = new URL(csUrl)

        if (!href.startsWith(`${URL_BASE}${SYSTEM_ID.MGLG}`)) {
          throw new Error('指定されたURLに問題があります。')
        }

        const key = searchParams.get('key')

        const res = await fetch(`/api/${SYSTEM_ID.MGLG}/${key}`, {
          headers: { 'Content-Type': 'application/json' },
        })
        data = await res.json()
      }

      if (data) {
        const skills = data.learned.reduce<string[]>((acc, skill) => {
          if (skill.id) {
            const split = skill.id.split('.')
            const domain = split[2] as CSDataLearnedDomain
            const row = split[1] as CSDataLearnedRow
            const skillName = SKILLS_WITH_ROW_NAME[domain][row]

            return [...acc, skillName]
          }
          return acc
        }, [])

        const charaData: Chara = {
          player: data.base.player || '',
          covername: data.base.covername || '',
          magicname: data.base.magicname || '',
          sex: data.base.sex || '',
          age: data.base.age || '',
          level: data.base.level || '',
          domain: DOMAIN_TYPE_MAPPER[data.base.domain] || '',
          soulSkill: data.soul.skill,
          skills,
          attack: data.base.attack ? parseInt(data.base.attack, 10) : 0,
          defense: data.base.defense ? parseInt(data.base.defense, 10) : 0,
          source: data.base.source ? parseInt(data.base.source, 10) : 0,
          career: data.base.career || '',
          belief: data.base.belief || '',
          cover: data.base.cover || '',
          memo: data.base.memo || '',
        }
        setChara(charaData)

        const magicList: Magic[] = data.library.map((l) => ({
          check: l.check === 'on',
          name: l.name?.split('\n') || [],
          type: l.type || '',
          skill: l.skill || '',
          target: l.target || '',
          cost: pickCostFromCsData(l, charaData),
          costOrig: l.cost || '',
          charge: l.charge.value !== null ? parseInt(l.charge.value, 10) : null,
          effect: l.effect || '',
          ivcheck: l.ivcheck === '1',
          page: l.page || '',
        }))
        setMagic(magicList)

        setNameOverride(charaData.covername)

        setIsLoadingCs(false)
      }
    } catch (e) {
      setIsLoadingCs(false)
      console.error(e)
      addToastAlert('error', 'キャラクターシートの読み込みに失敗しました')
    }
  }, [csUrl, addToastAlert])

  // CS読み込み中のローディング処理
  const handleClickLoadCs = useCallback(() => {
    setIsLoadingCs(true)
    loadCs()
  }, [loadCs])

  return (
    <div className="">
      <div className="flex justify-center gap-2 mb-6">
        <TextInput
          placeholder="キャラクター倉庫URL"
          value={csUrl}
          onChange={setCsUrl}
          className="input-xs w-full md:max-w-[60%]"
        />
        <button
          onClick={
            csUrl || process.env.NEXT_PUBLIC_USE_SAMPLE === 'true'
              ? handleClickLoadCs
              : () => {}
          }
          className={`btn btn-xs btn-success flex-none ${
            !csUrl ? 'cursor-not-allowed' : ''
          }`}
        >
          CS読み込み
        </button>
      </div>

      <div className="text-lg font-bold text-center mb-3">
        {chara.magicname ? `「${chara.magicname}」` : ''}
        {chara.covername}
      </div>
      <div className="flex flex-wrap gap-2 items-center justify-center mb-6">
        {(chara.level || chara.career) && (
          <TextWithBadge badgeColor="neutral" badgeText="階梯/経歴/機関">
            <span className="flex gap-1 items-center">
              <span>{chara.level ? `第${chara.level}階梯` : ''}</span>
              <span>{chara.career}</span>
            </span>
          </TextWithBadge>
        )}
        {chara.domain && (
          <TextWithBadge badgeColor="neutral" badgeText="領域">
            {chara.domain}
          </TextWithBadge>
        )}
        {chara.soulSkill && (
          <TextWithBadge badgeColor="neutral" badgeText="魂の特技">
            {chara.soulSkill}
          </TextWithBadge>
        )}
        {chara.attack && (
          <TextWithBadge badgeColor="neutral" badgeText="攻撃力">
            {chara.attack}
          </TextWithBadge>
        )}
        {chara.defense && (
          <TextWithBadge badgeColor="neutral" badgeText="防御力">
            {chara.defense}
          </TextWithBadge>
        )}
        {chara.source && (
          <TextWithBadge badgeColor="neutral" badgeText="根源力">
            {chara.source}
          </TextWithBadge>
        )}
      </div>

      <div className="overflow-x-auto relative mb-8">
        {isLoadingCs ? (
          <div className="w-full h-full text-center bg-base-100/50 pt-20 pb-9 md:pt-16 sticky left-0 top-0 z-10">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : null}
        <div className={isLoadingCs ? 'absolute top-0 left-0 right-0' : ''}>
          <table className="table table-xs border-y-2 border-base-200">
            <thead>
              <tr className="grid md:table-row grid-cols-magic">
                <th className="md:w-28 text-center rowspan-2 flex md:table-cell items-center justify-center"></th>
                <th className="md:w-40">魔法名</th>
                <th className="md:w-20 text-center">タイプ</th>
                <th className="md:w-24 text-center">指定特技</th>
                <th className="md:w-24 text-center">目標</th>
                <th className="md:w-20 text-center">コスト</th>
                <th className="col-start-2 col-end-7">効果</th>
              </tr>
            </thead>
            <tbody>
              {magic.map((m, i) => (
                <tr
                  key={i}
                  className={`${
                    m.name && m.cost ? 'hover' : ''
                  } grid md:table-row grid-cols-magic items-center`}
                >
                  <td className="text-center row-span-2 md:table-cell flex items-center justify-center">
                    <button
                      className="btn btn-xs btn-info max-md:h-[2.5rem] max-md:leading-tight"
                      onClick={curryCopyMagicName(i)}
                    >
                      魔法名
                      <br className="md:hidden" />
                      コピー
                    </button>
                  </td>
                  <td>
                    {m.name.map((n, i) => (
                      <span key={i}>
                        {n}
                        <br />
                      </span>
                    ))}
                  </td>
                  <td className="text-center">{m.name && m.cost && m.type}</td>
                  <td className="text-center">
                    {SKILLS_ALL.includes(m.skill) ? `《${m.skill}》` : m.skill}
                  </td>
                  <td className="text-center">{m.target}</td>
                  <td className="text-center">
                    {typeof m.cost === 'string'
                      ? m.cost
                      : `${m.cost.domain}${m.cost.value}`}
                  </td>
                  <td className="col-start-2 col-end-7 flex md:table-cell gap-0.5">
                    <span
                      className={`md:hidden relative before:content-['*'] inline-block text-primary text-[1.5em] leading-none translate-y-[0.2em] ${antiqua.className}`}
                    ></span>
                    {m.effect}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Tab title="ステータス／パラメータ出力設定" className="mb-5">
        <TabColContent>
          <TabColLeft>
            <div className="grid grid-cols-1 gap-4">
              <RadioGroup
                title="攻撃力/防御力/根源力の出力先"
                options={[
                  { label: 'パラメータ', value: ADS_OUTPUT_DEST_PARAM },
                  { label: 'ステータス', value: ADS_OUTPUT_DEST_STATUS },
                ]}
                value={adsOutputDest}
                onChange={setAdsOutputDest}
              />
              <RadioGroup
                title="出力したい魔法名の行"
                options={[
                  { label: '1行目', value: 0 },
                  {
                    label: '2行目',
                    value: 1,
                    disabled: isNameOutputLineNum2Disabled,
                  },
                ]}
                value={magicOutputLineNum}
                onChange={setMagicOutputLineNum}
              />
              <SelectTable
                title="ステータスとして出力したい魔法"
                headers={
                  <>
                    <td>魔法名</td>
                    <td className="w-20 text-center">コスト</td>
                  </>
                }
                rows={outputSelectableMagic}
                rowRenderer={(m) => (
                  <>
                    <td>{m.name[magicOutputLineNum]}</td>
                    <td className="text-center">
                      {typeof m.cost === 'string'
                        ? m.cost
                        : `${m.cost.domain}${m.cost.value}`}
                    </td>
                  </>
                )}
                selectedRows={statusOutputMagic}
                onSelect={setStatusOutputMagic}
              />
            </div>
          </TabColLeft>

          <TabColDivider />

          <TabColRight>
            <div className="grid grid-cols-1 gap-4">
              <PreviewItem
                title="ステータス出力プレビュー"
                showPreview={!!magic.length}
              >
                <>
                  <div className="w-full max-w-60 bg-base-content/[85%] rounded-sm p-3 h-[120px] mb-2">
                    <div className="flex flex-wrap gap-[3px] max-w-[210px]">
                      {statusOutputData.map(
                        (d, i) =>
                          i < 8 && (
                            <StatusChip
                              key={i}
                              label={d.label}
                              value={d.value}
                              max={d.max}
                            />
                          )
                      )}
                    </div>
                  </div>
                  <div className="w-full max-w-96 bg-base-100 rounded-sm p-3">
                    <table className="table table-sm border-y-2 border-base-200">
                      <thead>
                        <tr>
                          <th>ラベル</th>
                          <th>現在値</th>
                          <th>最大値</th>
                        </tr>
                      </thead>
                      <tbody>
                        {statusOutputData.map((d, i) => (
                          <tr key={i}>
                            <td>{d.label}</td>
                            <td>{d.value}</td>
                            <td>{d.max}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              </PreviewItem>
              <PreviewItem
                title="パラメータ出力プレビュー"
                showPreview={!!magic.length}
              >
                <div className="w-full max-w-96 bg-base-100 rounded-sm p-3">
                  <table className="table table-sm border-y-2 border-base-200">
                    <thead>
                      <tr>
                        <th>ラベル</th>
                        <th>値</th>
                      </tr>
                    </thead>
                    <tbody>
                      {parameterOutputData.map((d, i) => (
                        <tr key={i}>
                          <td>{d.label}</td>
                          <td>{d.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </PreviewItem>
            </div>
          </TabColRight>
        </TabColContent>
      </Tab>

      <Tab title="キャラクターメモ出力設定" className="mb-5">
        <TabColContent>
          <TabColLeft>
            <div className="grid grid-cols-1 gap-4">
              <RadioGroup
                title="特技を出力"
                options={[
                  { label: '出力する', value: RADIO_COMMON_TRUE },
                  {
                    label: '出力しない',
                    value: RADIO_COMMON_FALSE,
                  },
                ]}
                value={shouldOutputSkills}
                onChange={setShouldOutputSkills}
              />
              <RadioGroup
                title="出力したい魔法名の行"
                options={[
                  { label: '1行目', value: MAGIC_OUTPUT_LINE_1 },
                  {
                    label: '2行目',
                    value: MAGIC_OUTPUT_LINE_2,
                    disabled: isNameOutputLineNum2Disabled,
                  },
                ]}
                value={magicOutputLineNum}
                onChange={setMagicOutputLineNum}
              />
              <RadioGroup
                title="魔法タイプごとに分けて記載"
                options={[
                  { label: '分ける', value: RADIO_COMMON_TRUE },
                  { label: '分けない', value: RADIO_COMMON_FALSE },
                ]}
                value={isMagicOutputGrouped}
                onChange={setIsMagicOutputGrouped}
              />
              <SelectTable
                title="キャラクターメモに出力したい魔法"
                headers={
                  <>
                    <td>魔法名</td>
                    <td className="w-20 text-center">タイプ</td>
                  </>
                }
                rows={outputSelectableMagic}
                rowRenderer={(m) => (
                  <>
                    <td>{m.name[magicOutputLineNum]}</td>
                    <td className="text-center">{m.type}</td>
                  </>
                )}
                selectedRows={memoOutputMagic}
                onSelect={setMemoOutputMagic}
              />
            </div>
          </TabColLeft>

          <TabColDivider />

          <TabColRight>
            <PreviewItem title="出力プレビュー" showPreview={!!magic.length}>
              <div className="w-full max-w-80 bg-base-content/[85%] text-base-100 text-xs rounded-sm p-3">
                {memoOutputData.map((m, i) => (
                  <span key={i}>
                    {m}
                    <br />
                  </span>
                ))}
              </div>
            </PreviewItem>
          </TabColRight>
        </TabColContent>
      </Tab>

      <Tab title="チャットパレット出力設定" className="mb-5">
        <TabColContent>
          <TabColLeft>
            <div className="grid grid-cols-1 gap-4">
              <CheckboxGroup
                title="出力する項目を選択"
                options={[
                  { label: '特技の判定式', value: PALETTE_OUTPUT_SKILLS },
                  {
                    label: '魂の特技の判定式',
                    value: PALETTE_OUTPUT_SOUL_SKILL,
                  },
                  {
                    label: '特技（チャット貼付用）',
                    value: PALETTE_OUTPUT_SKILL_NAMES,
                  },
                ]}
                values={paletteOutputSettings}
                onChange={setPaletteOutputSettings}
              />
              <SelectTable
                title="チャット貼付用に出力したい魔法名"
                headers={<td>魔法名</td>}
                rows={outputSelectableMagic}
                rowRenderer={(m) => <td>{m.name[magicOutputLineNum]}</td>}
                selectedRows={paletteOutputMagic}
                onSelect={setPaletteOutputMagic}
              />
            </div>
          </TabColLeft>

          <TabColDivider />

          <TabColRight>
            <PreviewItem title="出力プレビュー" showPreview={!!magic.length}>
              <div className="w-full max-w-80 h-[300px] overflow-y-auto bg-base-content/[85%] text-base-100 text-base rounded-sm pt-2">
                {paletteOutputData.map((p, i) => (
                  <div
                    key={i}
                    className="px-4 py-3 hover:bg-white/10 cursor-pointer"
                  >
                    {p}
                    <br />
                  </div>
                ))}
              </div>
            </PreviewItem>
          </TabColRight>
        </TabColContent>
      </Tab>

      <Tab title="内容の最終調整＆出力" className="mb-5">
        {magic.length ? (
          <>
            <div className="text-sm mb-5">
              以下の内容でココフォリア用のコマを出力します。
              <br />
              （ここで内容の最終調整を行うことができます）
            </div>
            <div className="grid grid-cols-1 gap-4 w-full max-w-[540px]">
              <ConfirmFormBox title="名前">
                <TextInput
                  value={nameOverride}
                  onChange={setNameOverride}
                  className="input-md w-full"
                />
              </ConfirmFormBox>
              <ConfirmFormBox title="キャラクターメモ">
                <TextareaInput
                  value={memoOverride}
                  onChange={setMemoOverride}
                  className="textarea-md w-full h-[250px] align-bottom"
                />
              </ConfirmFormBox>
              <ConfirmFormBox title="参照URL（※編集不可）">
                <FakeInput value={csUrl} className="input-md w-full" />
              </ConfirmFormBox>
              <ConfirmFormBox title="ステータス">
                <StatusParamsField
                  type="status"
                  size="md"
                  values={statusOverride}
                  onChange={setStatusOverride}
                />
              </ConfirmFormBox>
              <ConfirmFormBox title="パラメータ">
                {parameterOverride.length ? (
                  <StatusParamsField
                    type="params"
                    size="md"
                    values={parameterOverride}
                    onChange={setParameterOverride}
                  />
                ) : (
                  <div className="text-sm">設定なし</div>
                )}
              </ConfirmFormBox>
              <ConfirmFormBox title="チャットパレット">
                <TextareaInput
                  value={paletteOverride}
                  onChange={setPaletteOverride}
                  className="textarea-md w-full h-[250px] align-bottom"
                />
              </ConfirmFormBox>
            </div>
          </>
        ) : (
          <div className="text-sm">
            キャラクターシート読み込み後に表示されます
          </div>
        )}

        <div className="mt-10">
          <button
            className="btn btn-success btn-md"
            onClick={handleClickOutput}
            disabled={!magic.length}
          >
            ココフォリア用のコマを出力
          </button>
        </div>
      </Tab>

      <ToastAlerts alerts={toastAlerts} />
    </div>
  )
}
