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
import { Spooky } from '@/app/constants'
import { ToastAlertContext } from '@/app/context'
import { ConfirmFormBox } from '../ConfirmFormBox'
import { CharaSummary } from '../CharaSummary'

type Props = {
  spooky: Spooky
  csUrl: string
  useMp: boolean
  onToggleUseMp: () => void
}

const SpookySection = memo(function SpookySection({
  spooky,
  csUrl,
  useMp,
  onToggleUseMp,
}: Props) {
  const [nameOutputData, setNameOutputData] = useState<CcCharacter['name']>('')
  const [statusOutputData, setStatusOutputData] = useState<
    CcCharacter['status']
  >([])
  const [paramsOutputData, setParamsOutputData] = useState<
    CcCharacter['params']
  >([])
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
      params: paramsOutputData,
      commands: commandsOutputData,
    }

    const icon: CcCharacterClipboardData = {
      kind: 'character',
      data: charaData,
    }

    try {
      navigator.clipboard.writeText(JSON.stringify(icon))
      addToastAlert('info', 'スプーキー用コマをクリップボードに出力しました')
    } catch (e) {
      console.error(e)
      addToastAlert(
        'error',
        'スプーキー用コマのクリップボードへの出力に失敗しました'
      )
    }
  }, [
    csUrl,
    nameOutputData,
    memoOutputData,
    statusOutputData,
    paramsOutputData,
    commandsOutputData,
  ])

  // 初期ロード
  useEffect(() => {
    // 名前
    setNameOutputData(spooky.name)

    // ステータス
    let statusBase = [{ label: '魔力', value: spooky.mana, max: spooky.mana }]
    if (useMp) {
      statusBase = [
        ...statusBase,
        { label: 'MP', value: 0, max: 5 }, // これは最大値は5固定
      ]
    }
    setStatusOutputData(statusBase)

    // パラメータ
    const paramsBase = [
      { label: '攻撃力', value: `${spooky.attack}` },
      { label: '防御力', value: `${spooky.defense}` },
      { label: 'お助け力', value: `${spooky.help}` },
      { label: 'お邪魔力', value: `${spooky.interrupt}` },
    ]
    setParamsOutputData(paramsBase)

    // キャラクターメモ
    const memoBase = [
      spooky.name,
      `リング：${spooky.ring}`,
      `弱点：《${spooky.weakpoint}》`,
    ]
    const memoStatus = [
      '',
      `攻撃力：${spooky.attack}　防御力：${spooky.defense}`,
      `お助け力：${spooky.help}　お邪魔力：${spooky.interrupt}`,
    ]
    const magic = spooky.magic.map((m) => (m ? `「${m}」` : ''))
    const memoMagic = ['', `魔法：${magic.join('')}`]
    const memoBody = [
      '',
      `からだ：${spooky.body.body}`,
      `衣装1：${spooky.body.wear1}`,
    ].concat(spooky.body.wear2 ? [`衣装2：${spooky.body.wear2}`] : [])
    setMemoOutputData(
      [...memoBase, ...memoStatus, ...memoMagic, ...memoBody].join('\n')
    )

    // チャパレ
    const baseCommands = [
      '2D6>=9 （オバケ判定）',
      '1D6+{攻撃力} （ダメージロール）',
      '2B6 （合体攻撃！）',
      ...magic,
    ].join('\n')

    setCommandsOutputData(baseCommands)
  }, [spooky, useMp])

  return (
    <>
      <CharaSummary>
        <TextWithBadge badgeText="名前" badgeColor="accent">
          {spooky.name}
        </TextWithBadge>
        <TextWithBadge badgeText="リング" badgeColor="accent">
          {spooky.ring}
        </TextWithBadge>
        <TextWithBadge badgeText="弱点" badgeColor="accent">
          《{spooky.weakpoint}》
        </TextWithBadge>
        <TextWithBadge badgeText="攻撃力" badgeColor="accent">
          {spooky.attack}
        </TextWithBadge>
        <TextWithBadge badgeText="防御力" badgeColor="accent">
          {spooky.defense}
        </TextWithBadge>
        <TextWithBadge badgeText="お助け力" badgeColor="accent">
          {spooky.help}
        </TextWithBadge>
        <TextWithBadge badgeText="お邪魔力" badgeColor="accent">
          {spooky.interrupt}
        </TextWithBadge>
        <TextWithBadge badgeText="魔法" badgeColor="accent">
          {spooky.magic.map((m) => (m ? `「${m}」` : '')).join('')}
        </TextWithBadge>
        <TextWithBadge badgeText="からだ" badgeColor="accent">
          {spooky.body.body}
        </TextWithBadge>
        <TextWithBadge badgeText="衣装1" badgeColor="accent">
          {spooky.body.wear1}
        </TextWithBadge>
        {spooky.body.wear2 && (
          <TextWithBadge badgeText="衣装2" badgeColor="accent">
            {spooky.body.wear2}
          </TextWithBadge>
        )}
      </CharaSummary>

      <div className="grid grid-cols-1 gap-3 md:gap-4 md:max-w-[500px] mt-4 md:mt-6">
        <ConfirmFormBox titleColor="secondary" title="設定">
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
        <ConfirmFormBox titleColor="secondary" title="名前">
          <TextInput
            value={nameOutputData}
            onChange={setNameOutputData}
            className="input-sm w-full"
          />
        </ConfirmFormBox>
        <ConfirmFormBox titleColor="secondary" title="キャラクターメモ">
          <TextareaInput
            value={memoOutputData}
            onChange={setMemoOutputData}
            className="textarea-sm w-full h-[300px]"
          />
        </ConfirmFormBox>
        <ConfirmFormBox titleColor="secondary" title="参照URL（※編集不可）">
          <FakeInput className="input-sm">{csUrl}</FakeInput>
        </ConfirmFormBox>
        <ConfirmFormBox titleColor="secondary" title="ステータス">
          <StatusParamsField
            type="status"
            size="sm"
            values={statusOutputData}
            onChange={setStatusOutputData}
          />
        </ConfirmFormBox>
        <ConfirmFormBox titleColor="secondary" title="パラメータ">
          <StatusParamsField
            type="params"
            size="sm"
            values={paramsOutputData}
            onChange={setParamsOutputData}
          />
        </ConfirmFormBox>
        <ConfirmFormBox titleColor="secondary" title="チャットパレット">
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
          スプーキー用のコマを出力する！
        </button>
      </div>
    </>
  )
})

export { SpookySection }
