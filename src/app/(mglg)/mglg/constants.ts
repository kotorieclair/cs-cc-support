export const MAGIC_TYPES = {
  SUMMON: '召喚',
  SPELL: '呪文',
  PERMANENT: '装備',
} as const
export type MagicType = (typeof MAGIC_TYPES)[keyof typeof MAGIC_TYPES]

export const DOMAIN_TYPES = {
  STAR: '星',
  BEAST: '獣',
  POWER: '力',
  SONG: '歌',
  DREAM: '夢',
  DARKNESS: '闇',
} as const
export type DomainType = (typeof DOMAIN_TYPES)[keyof typeof DOMAIN_TYPES]
export const DOMAIN_TYPE_ALL = '全' as const
export const DOMAIN_TYPES_LIST = Object.values(DOMAIN_TYPES)

export const DOMAIN_TYPE_MAPPER = {
  a: DOMAIN_TYPES.STAR,
  ab: DOMAIN_TYPES.BEAST,
  bc: DOMAIN_TYPES.POWER,
  cd: DOMAIN_TYPES.SONG,
  de: DOMAIN_TYPES.DREAM,
  e: DOMAIN_TYPES.DARKNESS,
} as const
export type CsDomainKey = keyof typeof DOMAIN_TYPE_MAPPER
export const CS_DOMAIN_KEYS = Object.keys(DOMAIN_TYPE_MAPPER) as CsDomainKey[]

export const SKILLS_STAR = [
  '黄金',
  '大地',
  '森',
  '道',
  '海',
  '静寂',
  '雨',
  '嵐',
  '太陽',
  '天空',
  '異界',
]
export const SKILLS_BEAST = [
  '肉',
  '蟲',
  '花',
  '血',
  '鱗',
  '混沌',
  '牙',
  '叫び',
  '怒り',
  '翼',
  'エロス',
]
export const SKILLS_POWER = [
  '重力',
  '風',
  '流れ',
  '水',
  '波',
  '自由',
  '衝撃',
  '雷',
  '炎',
  '光',
  '円環',
]
export const SKILLS_SONG = [
  '物語',
  '旋律',
  '涙',
  '別れ',
  '微笑み',
  '想い',
  '勝利',
  '恋',
  '情熱',
  '癒し',
  '時',
]
export const SKILLS_DREAM = [
  '追憶',
  '謎',
  '嘘',
  '不安',
  '眠り',
  '偶然',
  '幻',
  '狂気',
  '祈り',
  '希望',
  '未来',
]
export const SKILLS_DARKNESS = [
  '深淵',
  '腐敗',
  '裏切り',
  '迷い',
  '怠惰',
  '歪み',
  '不幸',
  'バカ',
  '悪意',
  '絶望',
  '死',
]
export const SKILLS_ALL = [
  ...SKILLS_STAR,
  ...SKILLS_BEAST,
  ...SKILLS_POWER,
  ...SKILLS_SONG,
  ...SKILLS_DREAM,
  ...SKILLS_DARKNESS,
]
export const SKILLS_WITH_ROW_NAME: {
  [domain: CSDataLearnedDomain]: { [row: CSDataLearnedRow]: string }
} = {
  name0: SKILLS_STAR.reduce((acc, s, i) => ({ ...acc, [`row${i}`]: s }), {}),
  name1: SKILLS_BEAST.reduce((acc, s, i) => ({ ...acc, [`row${i}`]: s }), {}),
  name2: SKILLS_POWER.reduce((acc, s, i) => ({ ...acc, [`row${i}`]: s }), {}),
  name3: SKILLS_SONG.reduce((acc, s, i) => ({ ...acc, [`row${i}`]: s }), {}),
  name4: SKILLS_DREAM.reduce((acc, s, i) => ({ ...acc, [`row${i}`]: s }), {}),
  name5: SKILLS_DARKNESS.reduce(
    (acc, s, i) => ({ ...acc, [`row${i}`]: s }),
    {}
  ),
}

export type CsDataBase = {
  [key: string]: string
} & {
  domain: CsDomainKey
}
export type CSDataLearnedRow = `row${number}`
export type CSDataLearnedDomain = `name${number}`
export type CSDataLearned = {
  id: `skills.${CSDataLearnedRow}.${CSDataLearnedDomain}` | null
  judge: null
}
export type CsDataLibrary = {
  [key: string]: string | null
} & {
  check: 'on' | null
  ivcheck: '1' | null
  type: MagicType
  charge: { value: string }
}
export type CsData = {
  base: CsDataBase
  learned: CSDataLearned[]
  library: CsDataLibrary[]
  soul: {
    skill: string
  }
}
export type Chara = {
  player: string
  covername: string
  magicname: string
  sex: string
  age: string
  level: string
  domain: DomainType
  soulSkill: string
  skills: string[]
  attack: number
  defense: number
  source: number
  career: string
  belief: string
  cover: string
  memo: string
}

export type MagicCost = {
  domain: DomainType | typeof DOMAIN_TYPE_ALL | ''
  value: number | 'X'
}
export type Magic = {
  check: boolean
  name: string[]
  type: MagicType
  skill: string
  target: string
  // cost: string
  cost: MagicCost | string
  costOrig: string
  charge: number | null
  effect: string
  ivcheck: boolean
  page: string
}

// コストに関して
// 指定特技の分野の魔素2
// 自分の領域の魔素1
// 全X
// 力3
// 置き換えしたいね
// 指定特技→skillから領域を推測
// 自分の領域→base.domainから取得
// 最後の一文字は必ず数字かXとなる
