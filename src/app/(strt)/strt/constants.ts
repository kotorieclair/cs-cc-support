import {
  CSDataLearned,
  CSDataLearnedRow,
  CSDataLearnedSkillType,
} from '@/app/constants'
import { SelectInputOption } from '@kotorieclair/ktrecl-ui-tools'

export const INSTRUMENTS = {
  VO: 'ボーカル',
  GT: 'ギター',
  BA: 'ベース',
  KEY: 'キーボード',
  DR: 'ドラム',
} as const
export type Instrument = (typeof INSTRUMENTS)[keyof typeof INSTRUMENTS]
export const INSTRUMENTS_INVERTED = Object.fromEntries(
  Object.entries(INSTRUMENTS).map(([k, v]) => [v, k as Instrument])
)
export const INSTRUMENTS_OPTIONS: SelectInputOption<Instrument>[] =
  Object.values(INSTRUMENTS).map((v) => ({ label: v, value: v }))

export const STRATEGIES = {
  EMOTION: 'エモーション',
  TECHNIQUE: 'テクニック',
  LOGIC: 'ロジック',
} as const
export type Strategy = (typeof STRATEGIES)[keyof typeof STRATEGIES]
export const STRATEGIES_INVERTED = Object.fromEntries(
  Object.entries(STRATEGIES).map(([k, v]) => [v, k as Strategy])
)
export const STRATEGIES_OPTIONS: SelectInputOption<Strategy>[] = Object.values(
  STRATEGIES
).map((v) => ({ label: v, value: v }))

export const SKILL_TYPES = {
  ISM: '主義',
  BODY: '身体',
  MOTIF: 'モチーフ',
  FEELINGS: '情緒',
  ACTION: '行動',
  CHALLENGE: '逆境',
} as const
export type SkillType = (typeof SKILL_TYPES)[keyof typeof SKILL_TYPES]

export const SKILL_TYPE_MAPPER = {
  a: SKILL_TYPES.ISM,
  ab: SKILL_TYPES.BODY,
  bc: SKILL_TYPES.MOTIF,
  cd: SKILL_TYPES.FEELINGS,
  de: SKILL_TYPES.ACTION,
  e: SKILL_TYPES.CHALLENGE,
} as const

// 主義
export const SKILLS_ISM = [
  '過去',
  '恋人',
  '仲間',
  '家族',
  '自分',
  '今',
  '理由',
  '夢',
  '世界',
  '幸せ',
  '未来',
]
// 身体
export const SKILLS_BODY = [
  '頭',
  '目',
  '耳',
  '口',
  '胸',
  '心臓',
  '血',
  '背中',
  '手',
  'XXX',
  '足',
]
// モチーフ
export const SKILLS_MOTIF = [
  '闇',
  '武器',
  '魔法',
  '獣',
  '町',
  '歌',
  '窓',
  '花',
  '空',
  '季節',
  '光',
]
// 情緒
export const SKILLS_FEELINGS = [
  '悲しい',
  '怒り',
  '不安',
  '恐怖',
  '驚き',
  '高鳴り',
  '情熱',
  '確信',
  '期待',
  '楽しい',
  '喜び',
]
// 行動
export const SKILLS_ACTION = [
  '泣く',
  '忘れる',
  '消す',
  '壊す',
  '叫ぶ',
  '歌う',
  '踊る',
  '走る',
  '出会う',
  '呼ぶ',
  '笑う',
]
// 逆境
export const SKILLS_CHALLENGE = [
  '死',
  '喪失',
  '暴力',
  '孤独',
  '後悔',
  '実力',
  '退屈',
  '本性',
  '富',
  '恋愛',
  '生',
]
export const SKILLS_ALL = [
  ...SKILLS_ISM,
  ...SKILLS_BODY,
  ...SKILLS_MOTIF,
  ...SKILLS_FEELINGS,
  ...SKILLS_ACTION,
  ...SKILLS_CHALLENGE,
]
export const SKILLS_WITH_ROW_NAME: {
  [skillType: CSDataLearnedSkillType]: { [row: CSDataLearnedRow]: string }
} = {
  name0: SKILLS_ISM.reduce((acc, s, i) => ({ ...acc, [`row${i}`]: s }), {}),
  name1: SKILLS_BODY.reduce((acc, s, i) => ({ ...acc, [`row${i}`]: s }), {}),
  name2: SKILLS_MOTIF.reduce((acc, s, i) => ({ ...acc, [`row${i}`]: s }), {}),
  name3: SKILLS_FEELINGS.reduce(
    (acc, s, i) => ({ ...acc, [`row${i}`]: s }),
    {}
  ),
  name4: SKILLS_ACTION.reduce((acc, s, i) => ({ ...acc, [`row${i}`]: s }), {}),
  name5: SKILLS_CHALLENGE.reduce(
    (acc, s, i) => ({ ...acc, [`row${i}`]: s }),
    {}
  ),
}

export type CsDataBase = {
  [key: string]: string
} & {
  instrument: {
    [key: string]: string | null
  }
}
export type CsDataAbility = {
  [key: string]: string | null
}
export type CsDataBonds = {
  [key: string]: string | null
}
export type CsData = {
  base: CsDataBase
  learned: CSDataLearned[]
  ability: CsDataAbility[]
  bonds: CsDataBonds[]
}

export type Chara = {
  player: string
  name: string
  nameKana: string
  sex: string
  age: string
  level: number
  bandName: string
  circumstances: string
  instrument: Instrument
  instrumentDamage: string
  strategy: Strategy
  mastery: number
  skills: string[]
  abilities: Ability[]
  bonds: Bond[]
}

export type Ability = {
  name: string
  timing: string
  effect: string
}
export type Bond = {
  name: string
  attribute: string
  level: number
}

export const LABELS = {
  BASE_SKILL: '腕前',
  INST_DAMAGE: '楽器威力',
  LAST_SPURT: 'ラストスパート',
  USED_COND: '消費コンディション',
  NEUT_ENEMS: '無力化シガラミ数',
}
