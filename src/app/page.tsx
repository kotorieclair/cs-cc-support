'use client'

import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { TextInput } from '@/components/TextInput'
import { pickCostFromCsData } from '@/lib/util/pickCostFromCsData'
import {
  Chara,
  CsData,
  DOMAIN_TYPE_MAPPER,
  Magic,
  MAGIC_TYPES,
  MagicCost,
  SKILLS_ALL,
  URL_BASE,
} from './constants'
import { Checkbox, CheckboxProps } from '@/components/Checkbox'
import { StatusChip } from '@/components/StatusChip'
import { generateMagicStatusLabel } from '@/lib/util/generateMagicStatusLabel'
import { Radio } from '@/components/Radio'
import { TextWithBadge } from '@/components/TextWithBadge'
import { Tab } from '@/components/Tab'
import { RadioGroup } from '@/components/RadioGroup'
import { Textarea } from '@/components/Textarea'

type CcCharacterClipboardData = {
  kind: 'character'
  data: Partial<CcCharacter>
}

type CcCharacter = {
  name: string
  memo: string
  // initiative: number
  externalUrl: string
  status: {
    label: string
    value: number
    max: number
  }[]
  params: { label: string; value: string }[]
  // iconUrl: string | null // [!]
  // faces: { iconUrl: string | null; label: string }[] // [!]
  // x: number // [!]
  // y: number // [!]
  // angle: number
  // width: number
  // height: number
  // active: boolean // [!]
  // secret: boolean
  // invisible: boolean
  // hideStatus: boolean
  // color: string
  // commands: string
  // owner: string | null
}

const NAME_OUTPUT_LINE_1 = 0
const NAME_OUTPUT_LINE_2 = 1

const ADS_OUTPUT_DEST_PARAM = 'params'
const ADS_OUTPUT_DEST_STATUS = 'status'

const GROUP_MAGIC_OUTPUT_TRUE = 1
const GROUP_MAGIC_OUTPUT_FALSE = 0

type AlertType = 'info' | 'success' | 'warning' | 'error'
type ToastAlert = {
  id: string
  type: AlertType
  message: string
}
const ALERT_TYPE_CLASSNAMES: { [key in AlertType]: string } = {
  info: 'alert-info',
  success: 'alert-success',
  warning: 'alert-warning',
  error: 'alert-error',
}

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

export default function Home() {
  const [csUrl, setCsUrl] = useState('')
  const [isLoadingCs, setIsLoadingCs] = useState(false)

  const [chara, setChara] = useState<Chara>({} as Chara)
  const [magic, setMagic] = useState<Magic[]>([])

  const [selectedStatusMagic, setSelectedStatusMagic] = useState<number[]>([])
  const [selectedMemoMagic, setSelectedMemoMagic] = useState<number[]>([])

  const [nameOutputLine, setNameOutputLine] = useState(NAME_OUTPUT_LINE_1)
  const [adsOutputDest, setAdsOutputDest] = useState<
    typeof ADS_OUTPUT_DEST_PARAM | typeof ADS_OUTPUT_DEST_STATUS
  >(ADS_OUTPUT_DEST_PARAM)
  const [groupMagicOutput, setGroupMagicOutput] = useState(
    GROUP_MAGIC_OUTPUT_FALSE
  )
  // const [memoOutputItems, setMemoOutputItems] = useState<(keyof Chara)[]>([])

  // 追加上書き用のコーナー！
  const [nameOverride, setNameOverride] = useState('')
  const [memoOverride, setMemoOverride] = useState('')
  const [statusOverride, setStatusOverride] = useState<CcCharacter['status']>(
    []
  )

  const [toastAlerts, setToastAlerts] = useState<ToastAlert[]>([])
  const toastTimerRef = useRef<number[]>([])

  const addToastAlert = (type: AlertType, message: string) => {
    const id = Date.now().toString()
    setToastAlerts((alerts) => [...alerts, { id, type, message }])

    const timer = window.setTimeout(() => {
      setToastAlerts((alerts) => alerts.filter((alert) => id !== alert.id))
    }, 3000)

    toastTimerRef.current = [...toastTimerRef.current, timer]
  }

  // 魔法名コピーのカレー化
  const curryCopyMagicName = useCallback(
    (i: number) => {
      return () => {
        const name = magic[i].name[nameOutputLine]

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
    [magic, nameOutputLine]
  )

  // ステータスとして出力したい魔法を選択
  const handleSelectStatusMagic = useCallback(
    ({
      value: index,
      isChecked,
    }: Parameters<CheckboxProps<number>['onChange']>[0]) => {
      if (isChecked) {
        setSelectedStatusMagic((selected) =>
          [...selected, index].sort((a, b) => a - b)
        )
      } else {
        setSelectedStatusMagic((selected) =>
          selected.filter((s) => s !== index)
        )
      }
    },
    []
  )

  // キャラクターメモに出力したい魔法を選択
  const handleSelectMemoMagic = useCallback(
    ({
      value: index,
      isChecked,
    }: Parameters<CheckboxProps<number>['onChange']>[0]) => {
      if (isChecked) {
        setSelectedMemoMagic((selected) =>
          [...selected, index].sort((a, b) => a - b)
        )
      } else {
        setSelectedMemoMagic((selected) => selected.filter((s) => s !== index))
      }
    },
    []
  )

  // 魔法名出力に2行目を選択できるかどうか
  // 魔法名に2行目があるなら可能とする
  const isNameOutputLine2Disabled = useMemo(
    () => magic.some((m) => (m.cost || m.skill) && m.name.length === 1),
    [magic]
  )

  // const handleChangeMemoOutputItems = useCallback(
  //   ({
  //     value: item,
  //     isChecked,
  //   }: Parameters<CheckboxProps<string>['onChange']>[0]) => {
  //     if (isChecked) {
  //       setMemoOutputItems((items) => [...items, item])
  //     } else {
  //       setMemoOutputItems((items) => items.filter((i) => i !== item))
  //     }
  //   },
  //   []
  // )

  // 出力用ステータスのデータを生成
  const statusOutputData: CcCharacter['status'] = useMemo(() => {
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

    const statusMagicData = selectedStatusMagic.map((i) => ({
      label: generateMagicStatusLabel(
        magic[i].name[nameOutputLine],
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
    nameOutputLine,
    selectedStatusMagic,
  ])

  // ステータス更新
  useEffect(() => {
    setStatusOverride(statusOutputData)
  }, [statusOutputData])

  // ステータスの上書き
  const handleChangeStatusOverride = useCallback(
    (key: string, value: string | number, index: number) => {
      setStatusOverride((override) => ({
        ...override,
      }))
    },
    []
  )

  // 出力用パラメータのデータを生成
  const parameterOutputData: CcCharacter['params'] = useMemo(
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

  // 出力用キャラクターメモのデータを作成
  const memoOutputData: string[] = useMemo(() => {
    const { summon, spell, permanent } = selectedMemoMagic.reduce(
      (acc, i) => {
        const mgc = magic[i]
        if (mgc.name && (mgc.cost || mgc.skill)) {
          const name = `【${mgc.name[nameOutputLine]}】`
          if (mgc.type === MAGIC_TYPES.SUMMON || !groupMagicOutput) {
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

    const magicData = groupMagicOutput
      ? [
          '',
          `召喚：${summon.join('')}`,
          `呪文：${spell.join('')}`,
          `装備：${permanent.join('')}`,
        ]
      : ['', summon.join('')]

    return [
      `「${chara.magicname}」${chara.covername}`,
      [chara.level ? `第${chara.level}階梯` : '', chara.career].join('　'),
      [
        chara.domain ? `領域：${chara.domain}` : '',
        chara.soulSkill ? `魂の特技：${chara.soulSkill}` : '',
      ].join('　'),
      [
        chara.attack ? `攻撃力：${chara.attack}` : '',
        chara.defense ? `防御力：${chara.defense}` : '',
        chara.source ? `根源力：${chara.source}` : '',
      ].join('　'),
      // '',
      // `魔法一覧`,
      ...(selectedMemoMagic.length ? magicData : []),
    ]
  }, [chara, magic, nameOutputLine, selectedMemoMagic, groupMagicOutput])

  // キャラクターメモ更新
  useEffect(() => {
    setMemoOverride(memoOutputData.join('\n'))
  }, [memoOutputData])

  // コマ出力ボタンをクリック
  const handleClickOutput = useCallback(() => {
    const ccChara: CcCharacter = {
      name: chara.covername,
      memo: memoOutputData.join('\n'),
      status: statusOutputData,
      externalUrl: csUrl,
      params: parameterOutputData,
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
  }, [chara, csUrl, statusOutputData, parameterOutputData, memoOutputData])

  // CS読み込み処理
  const loadCs = useCallback(async () => {
    try {
      let data: CsData
      if (
        process.env.NEXT_PUBLIC_USE_SAMPLE === 'true' &&
        process.env.NEXT_PUBLIC_SAMPLE_DATA
      ) {
        const loaded = await require(process.env.NEXT_PUBLIC_SAMPLE_DATA)
        data = loaded.data
      } else {
        const { href, searchParams } = new URL(csUrl)
        console.log(href, searchParams.get('key'))

        if (!href.startsWith(URL_BASE)) {
          throw new Error('指定されたURLに問題があります。')
        }

        const key = searchParams.get('key')

        const res = await fetch(`/api/${key}`, {
          headers: { 'Content-Type': 'application/json' },
        })
        data = await res.json()
      }

      if (data) {
        const charaData: Chara = {
          player: data.base.player || '',
          covername: data.base.covername || '',
          magicname: data.base.magicname || '',
          sex: data.base.sex || '',
          age: data.base.age || '',
          level: data.base.level || '',
          domain: DOMAIN_TYPE_MAPPER[data.base.domain] || '',
          soulSkill: data.soul.skill,
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
      }
    } catch (e) {
      setIsLoadingCs(false)
      console.error(e)
      addToastAlert('error', 'キャラクターシートの読み込みに失敗しました')
    }
  }, [csUrl])

  // CS読み込み中のローディング処理
  const handleClickLoadCs = useCallback(() => {
    setIsLoadingCs(true)
    loadCs()
  }, [loadCs])

  return (
    <main className="">
      <div className="flex gap-2 mb-4 w-3/4">
        <TextInput
          placeholder="キャラクター倉庫URL"
          value={csUrl}
          onChange={setCsUrl}
          className="input input-bordered input-xs w-full"
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

      <div className="flex items-center gap-3 mb-3">
        <div className="text-md font-bold">
          {chara.magicname ? `「${chara.magicname}」` : ''}
          {chara.covername}
        </div>
        <div className="flex gap-2 items-center">
          {(chara.level || chara.career) && (
            <TextWithBadge
              badgeColor="neutral"
              badgeText="階梯/経歴/機関"
              text={
                <span className="flex gap-1 items-center">
                  <span>{chara.level ? `第${chara.level}階梯` : ''}</span>
                  <span>{chara.career}</span>
                </span>
              }
            />
          )}
          {chara.domain && (
            <TextWithBadge
              badgeColor="neutral"
              badgeText="領域"
              text={chara.domain}
            />
          )}
          {chara.soulSkill && (
            <TextWithBadge
              badgeColor="neutral"
              badgeText="魂の特技"
              text={chara.soulSkill}
            />
          )}
          {chara.attack && (
            <TextWithBadge
              badgeColor="neutral"
              badgeText="攻撃力"
              text={chara.attack}
            />
          )}
          {chara.defense && (
            <TextWithBadge
              badgeColor="neutral"
              badgeText="防御力"
              text={chara.defense}
            />
          )}
          {chara.source && (
            <TextWithBadge
              badgeColor="neutral"
              badgeText="根源力"
              text={chara.source}
            />
          )}
        </div>
      </div>

      <div className="overflow-x-auto mb-5">
        <table className="table table-xs border-y-2 border-base-200">
          <thead>
            <tr>
              <th className="w-28 text-center"></th>
              <th className="w-48">魔法名</th>
              <th className="w-20 text-center">タイプ</th>
              <th className="w-24 text-center">指定特技</th>
              <th className="w-24 text-center">目標</th>
              <th className="w-20 text-center">コスト</th>
              <th>効果</th>
            </tr>
          </thead>
          <tbody>
            {magic.map((m, i) => (
              <tr key={i} className={m.name && m.cost ? 'hover' : ''}>
                {/* <td className="text-center">
                  {m.name && (m.cost || m.skill) && (
                    <Checkbox
                      value={i}
                      onChange={handleSelectMagic}
                      checked={selectedMagic.includes(i)}
                      className="checkbox checkbox-xs checkbox-primary"
                    />
                  )}
                </td> */}
                <td>
                  <button
                    className="btn btn-xs btn-info"
                    onClick={curryCopyMagicName(i)}
                  >
                    魔法名コピー
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
                <td>{m.effect}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Tab title="ステータス／パラメータ出力設定" className="flex-1 w-50% mb-5">
        <div className="flex items-start">
          <div className="flex-none">
            <RadioGroup
              title="出力したい魔法名の行"
              options={[
                { label: '1行目', value: 0 },
                {
                  label: '2行目',
                  value: 1,
                  disabled: isNameOutputLine2Disabled,
                },
              ]}
              value={nameOutputLine}
              onChange={setNameOutputLine}
            />
            <RadioGroup
              title="攻撃力/防御力/根源力の出力先"
              options={[
                { label: 'パラメータ', value: ADS_OUTPUT_DEST_PARAM },
                { label: 'ステータス', value: ADS_OUTPUT_DEST_STATUS },
              ]}
              value={adsOutputDest}
              onChange={setAdsOutputDest}
              className="mt-3"
            />
            <div className="badge badge-md badge-accent mb-2 mt-3">
              ステータスとして出力したい魔法
            </div>
            <div className="p-3 ml-4 bg-base-100 rounded w-max">
              <table className="table table-xs border-y-2 border-base-200">
                <thead>
                  <tr>
                    <td className="w-14 text-center">選択</td>
                    <td className="w-48">魔法名</td>
                    <td className="w-20 text-center">コスト</td>
                  </tr>
                </thead>
                <tbody>
                  {magic.map(
                    (m, i) =>
                      m.name &&
                      m.cost && (
                        <tr key={i} className={m.name && m.cost ? 'hover' : ''}>
                          <td className="text-center">
                            {m.name && (m.cost || m.skill) && (
                              <Checkbox
                                value={i}
                                onChange={handleSelectStatusMagic}
                                checked={selectedStatusMagic.includes(i)}
                                className="checkbox checkbox-xs checkbox-primary align-middle"
                              />
                            )}
                          </td>
                          <td>{m.name[nameOutputLine]}</td>
                          <td className="text-center">
                            {typeof m.cost === 'string'
                              ? m.cost
                              : `${m.cost.domain}${m.cost.value}`}
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="divider divider-horizontal"></div>

          <div className="flex-none">
            <div className="badge badge-md badge-primary mb-2">
              ステータス出力プレビュー
            </div>
            {magic.length ? (
              <>
                <div className="w-full md:w-60 bg-base-content/[85%] rounded-sm p-3 h-[120px] mb-2">
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
                <div className="w-full md:w-96 bg-base-100 rounded-sm p-3 mb-4">
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
            ) : (
              <div className="text-sm mb-4">
                キャラクターシート読み込み後に表示されます
              </div>
            )}

            <div className="badge badge-md badge-primary mb-2">
              パラメータ出力プレビュー
            </div>
            {magic.length ? (
              <div className="w-full md:w-96 bg-base-100 rounded-sm p-3">
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
            ) : (
              <div className="text-sm mb-4">
                キャラクターシート読み込み後に表示されます
              </div>
            )}
          </div>
        </div>
      </Tab>

      <Tab title="キャラクターメモ出力設定" className="flex-1 w-50% mb-5">
        <div className="flex items-start">
          <div className="flex-none">
            <RadioGroup
              title="出力したい魔法名の行"
              options={[
                { label: '1行目', value: NAME_OUTPUT_LINE_1 },
                {
                  label: '2行目',
                  value: NAME_OUTPUT_LINE_2,
                  disabled: isNameOutputLine2Disabled,
                },
              ]}
              value={nameOutputLine}
              onChange={setNameOutputLine}
            />
            <RadioGroup
              title="魔法タイプごとに分けて記載"
              options={[
                { label: '分ける', value: GROUP_MAGIC_OUTPUT_TRUE },
                { label: '分けない', value: GROUP_MAGIC_OUTPUT_FALSE },
              ]}
              value={groupMagicOutput}
              onChange={setGroupMagicOutput}
              className="mt-3"
            />
            <div className="badge badge-md badge-accent mb-2 mt-3">
              キャラクターメモに出力したい魔法
            </div>
            <div className="p-3 ml-4 bg-base-100 rounded w-max">
              <table className="table table-xs border-y-2 border-base-200">
                <thead>
                  <tr>
                    <td className="w-14 text-center">選択</td>
                    <td className="w-48">魔法名</td>
                    <td className="w-20 text-center">タイプ</td>
                  </tr>
                </thead>
                <tbody>
                  {magic.map(
                    (m, i) =>
                      m.name &&
                      m.cost && (
                        <tr key={i} className={m.name && m.cost ? 'hover' : ''}>
                          <td className="text-center">
                            {m.name && (m.cost || m.skill) && (
                              <Checkbox
                                value={i}
                                onChange={handleSelectMemoMagic}
                                checked={selectedMemoMagic.includes(i)}
                                className="checkbox checkbox-xs checkbox-primary align-middle"
                              />
                            )}
                          </td>
                          <td>{m.name[nameOutputLine]}</td>
                          <td className="text-center">{m.type}</td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {/* <div className="md:flex gap-3 items-center mt-3">
            <div className="badge badge-md badge-accent mb-1 md:mb-0">
              キャラクターメモの出力内容
            </div>
            <div className="flex gap-3 items-center">
              <label className="flex gap-1 items-center leading-none cursor-pointer">
                <Checkbox
                  value="magicname"
                  onChange={handleChangeMemoOutputItems}
                  checked={memoOutputItems.includes('magicname')}
                  className="radio radio-xs radio-primary"
                />
                <span className="text-sm">魔法名</span>
              </label>
            </div>
          </div> */}
          <div className="divider divider-horizontal"></div>

          <div className="flex-none">
            <div className="mb-2">
              <div className="badge badge-md badge-primary">出力プレビュー</div>
            </div>
            {magic.length ? (
              <div className="w-full md:w-80 bg-base-content/[85%] text-base-100 text-xs rounded-sm p-3">
                {memoOutputData.map((n, i) => (
                  <span key={i}>
                    {n}
                    <br />
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-sm mb-4">
                キャラクターシート読み込み後に表示されます
              </div>
            )}
          </div>
        </div>
      </Tab>

      <Tab title="出力内容修正＆出力" className="mb-5">
        {/* <Tab title="コマ出力" className="mb-5"> */}
        {/* {magic.length ? (
          <>
            <div className="text-sm mb-1">
              以下の内容でココフォリア用のコマを出力します
            </div>
            <div className="badge badge-sm">名前</div>
            <div>
              <TextInput
                value={nameOverride}
                onChange={setNameOverride}
                className="input input-bordered w-1/2"
              />
            </div>
            <div className="badge badge-sm">キャラクターメモ</div>
            <div>
              <Textarea
                value={memoOverride}
                onChange={setMemoOverride}
                className="textarea textarea-bordered w-1/2 h-[250px]"
              />
            </div>
            <div className="badge badge-sm">参照URL</div>
            <div className="input input-bordered w-1/2">{csUrl}</div>
            <div className="badge badge-sm">ステータス</div>
            <div>
              {statusOutputData.map((s, i) => (
                <div key={i}>
                  <div className="join">
                    <TextInput
                      value={s.label}
                      onChange={() => {}}
                      className="input input-bordered join-item"
                    />
                    <TextInput
                      value={s.value}
                      onChange={() => {}}
                      className="input input-bordered join-item"
                    />
                    <TextInput
                      value={s.max}
                      onChange={() => {}}
                      className="input input-bordered join-item"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="badge badge-sm">パラメータ</div>
            <div>{chara.covername}</div>
          </>
        ) : (
          <div className="text-sm mb-4">
            キャラクターシート読み込み後に表示されます
          </div>
        )} */}

        <div>
          <button
            className="btn btn-success btn-md"
            onClick={handleClickOutput}
            disabled={!magic.length}
          >
            ココフォリア用のコマを出力
          </button>
        </div>
      </Tab>

      <div className="toast">
        {toastAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`alert ${ALERT_TYPE_CLASSNAMES[alert.type]}`}
          >
            <span>{alert.message}</span>
          </div>
        ))}
      </div>
    </main>
  )
}
