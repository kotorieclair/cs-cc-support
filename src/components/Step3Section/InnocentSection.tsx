import { memo, useCallback, useContext, useEffect, useState } from 'react'
import {
  CcCharacter,
  CcCharacterClipboardData,
  FakeInput,
  RadioCheckInput,
  StatusParamsField,
  TextareaInput,
  TextInput,
  TextWithBadge,
} from '@kotorieclair/ktrecl-ui-tools'
import { Innocent, SKILLS_ADULT, SKILLS_BAD } from '@/app/constants'
import { ToastAlertContext } from '@/app/context'
import { ConfirmFormBox } from '../ConfirmFormBox'
import { CharaSummary } from '../CharaSummary'

type Props = {
  innocent: Innocent
  csUrl: string
  useMp: boolean
  onToggleUseMp: () => void
}

const InnocentSection = memo(function InnocentSection({
  innocent,
  csUrl,
  useMp,
  onToggleUseMp,
}: Props) {
  const [nameOutputData, setNameOutputData] = useState<CcCharacter['name']>('')
  const [statusOutputData, setStatusOutputData] = useState<
    CcCharacter['status']
  >([])
  // const [paramsOutput, setParamsOutput] =
  //   useState<CcCharacter['params']>([])
  const [memoOutputData, setMemoOutputData] = useState<CcCharacter['memo']>('')
  const [commandsOutputData, setCommandsOutputData] =
    useState<CcCharacter['commands']>('')

  const { addToastAlert } = useContext(ToastAlertContext)

  const handleClickOutput = useCallback(() => {
    const charaData: CcCharacter = {
      name: nameOutputData,
      externalUrl: csUrl,
      memo: memoOutputData,
      status: statusOutputData,
      params: [],
      commands: commandsOutputData,
    }

    const icon: CcCharacterClipboardData = {
      kind: 'character',
      data: charaData,
    }

    try {
      navigator.clipboard.writeText(JSON.stringify(icon))
      addToastAlert('info', 'イノセント用コマをクリップボードに出力しました')
    } catch (e) {
      console.error(e)
      addToastAlert(
        'error',
        'イノセント用コマのクリップボードへの出力に失敗しました'
      )
    }
  }, [
    csUrl,
    nameOutputData,
    memoOutputData,
    statusOutputData,
    commandsOutputData,
    addToastAlert,
  ])

  // 初期ロード
  useEffect(() => {
    // 名前
    setNameOutputData(innocent.name)

    // ステータス
    let hpPlus = 0
    if (innocent.talent?.match(/超元気/g)) {
      hpPlus += 2
    }
    if (innocent.talent?.match(/天恵/g)) {
      hpPlus += 1
    }
    if (innocent.weakpoint?.match(/病弱/g)) {
      hpPlus -= 1
    }

    let statusBase = [
      { label: '元気', value: 6 + hpPlus, max: 0 },
      { label: '眠気', value: 0, max: 0 },
      { label: 'おこづかい', value: 1, max: 10 },
    ]

    if (useMp) {
      //不良の特技：1つにつき最大値+1
      //大人の特技：1つにつき最大値+1
      const badAdultNum = innocent.skills.filter(
        (s) => SKILLS_BAD.includes(s) || SKILLS_ADULT.includes(s)
      ).length

      statusBase = [
        ...statusBase,
        { label: 'MP', value: 0, max: 5 + badAdultNum },
      ]
    }

    setStatusOutputData(statusBase)

    // パラメータはなし

    // キャラクターメモ
    const memoBase = [
      innocent.name,
      `年齢：${innocent.age}　性別：${innocent.sex}`,
      `才能：${innocent.talent}`,
      `弱点：${innocent.weakpoint}`,
    ]

    const memoSkills = [
      '',
      `特技：${innocent.skills?.map((s) => `《${s}》`).join('')}`,
      `得意分野：${innocent.speciality}`,
    ]

    setMemoOutputData([...memoBase, ...memoSkills, '', '持ち物：'].join('\n'))

    // チャパレ
    const baseCommands = [
      ...innocent.skills?.map((s) => `2D6>=5 （判定：${s}）`),
      '2B6 （合体攻撃！）',
    ].join('\n')

    setCommandsOutputData(baseCommands)
  }, [innocent, useMp])

  return (
    <>
      <CharaSummary className="">
        <TextWithBadge badgeText="名前" badgeColor="accent">
          {innocent.name}
        </TextWithBadge>
        <TextWithBadge badgeText="年齢" badgeColor="accent">
          {innocent.age}
        </TextWithBadge>
        <TextWithBadge badgeText="性別" badgeColor="accent">
          {innocent.sex}
        </TextWithBadge>
        <TextWithBadge badgeText="才能" badgeColor="accent">
          {innocent.talent}
        </TextWithBadge>
        <TextWithBadge badgeText="弱点" badgeColor="accent">
          {innocent.weakpoint}
        </TextWithBadge>
        <TextWithBadge badgeText="特技" badgeColor="accent">
          {innocent.skills.map((s) => `《${s}》`)}
        </TextWithBadge>
        <TextWithBadge badgeText="得意分野" badgeColor="accent">
          {innocent.speciality}
        </TextWithBadge>
      </CharaSummary>

      <div className="grid grid-cols-1 gap-3 md:gap-4 md:max-w-[500px] mt-4 md:mt-6">
        <ConfirmFormBox titleColor="primary" title="設定">
          <div className="flex gap-1 items-center">
            <div className="text-sm md:text-base">MPを採用する：</div>
            <RadioCheckInput
              type="toggle"
              value="mp"
              checked={useMp}
              onChange={onToggleUseMp}
              className="toggle-sm toggle-warning"
            />
          </div>
        </ConfirmFormBox>
        <ConfirmFormBox titleColor="primary" title="名前">
          <TextInput
            value={nameOutputData}
            onChange={setNameOutputData}
            className="input-sm w-full"
          />
        </ConfirmFormBox>
        <ConfirmFormBox titleColor="primary" title="キャラクターメモ">
          <TextareaInput
            value={memoOutputData}
            onChange={setMemoOutputData}
            className="textarea-sm w-full h-[300px]"
          />
        </ConfirmFormBox>
        <ConfirmFormBox titleColor="primary" title="参照URL（※編集不可）">
          <FakeInput className="input-sm">{csUrl}</FakeInput>
        </ConfirmFormBox>
        <ConfirmFormBox titleColor="primary" title="ステータス">
          <StatusParamsField
            type="status"
            size="sm"
            values={statusOutputData}
            onChange={setStatusOutputData}
          />
        </ConfirmFormBox>
        <ConfirmFormBox titleColor="primary" title="チャットパレット">
          <TextareaInput
            value={commandsOutputData}
            onChange={setCommandsOutputData}
            className="textarea-sm w-full h-[300px]"
          />
        </ConfirmFormBox>
      </div>

      <div className="mt-5 md:mt-8">
        <button
          onClick={handleClickOutput}
          className="btn btn-md md:btn-lg btn-success max-md:w-full md:px-10 md:text-base msi msi-output"
        >
          イノセント用のコマを出力する！
        </button>
      </div>
    </>
  )
})

export { InnocentSection }
