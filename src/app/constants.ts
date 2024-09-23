export const URL_BASE = 'https://character-sheets.appspot.com/pkboo/'

export const SKILL_TYPES = {
  BAD: '不良',
  SPORT: '運動',
  FRIEND: '友達',
  PLAY: '遊び',
  STUDY: '勉強',
  ADULT: '大人',
} as const
export type SkillType = (typeof SKILL_TYPES)[keyof typeof SKILL_TYPES]

export const SKILL_TYPE_MAPPER = {
  a: SKILL_TYPES.BAD,
  ab: SKILL_TYPES.SPORT,
  bc: SKILL_TYPES.FRIEND,
  cd: SKILL_TYPES.PLAY,
  de: SKILL_TYPES.STUDY,
  e: SKILL_TYPES.ADULT,
} as const

//不良
export const SKILLS_BAD = [
  '夜ふかし',
  'いねむり',
  '無視',
  'ウソつき',
  '悪口',
  'いたずら',
  'ズル',
  '隠れる',
  'ぬすむ',
  'おどす',
  'けんか',
]
// 運動
export const SKILLS_SPORT = [
  '泳ぐ',
  '木登り',
  '柔らかい',
  'マラソン',
  'とぶ',
  'かけっこ',
  'バランス',
  '投げる',
  '球技',
  '打ち返す',
  '力持ち',
]
// 友達
export const SKILLS_FRIEND = [
  'ネット',
  'うわさ話',
  '優しさ',
  'がまん',
  'お手紙',
  'おしゃべり',
  '自転車',
  '勇気',
  '約束',
  '仕切る',
  '秘密基地',
]
// 遊び
export const SKILLS_PLAY = [
  'パソコン',
  'ゲーム',
  '集める',
  '絵',
  '音楽',
  '空想',
  '読書',
  'お話づくり',
  'クイズ',
  '手品',
  '占い',
]
// 勉強
export const SKILLS_STUDY = [
  '実験',
  '宇宙',
  '生き物',
  '工作',
  '計算',
  '宿題',
  '漢字',
  '作文',
  '歴史',
  '地理',
  '外国語',
]
// 大人
export const SKILLS_ADULT = [
  '法律',
  'しかる',
  '手当て',
  'マナー',
  '推理',
  '計画性',
  'お料理',
  'お買い物',
  'オシャレ',
  '恋愛',
  '道楽',
]
export const SKILLS_ALL = [
  ...SKILLS_BAD,
  ...SKILLS_SPORT,
  ...SKILLS_FRIEND,
  ...SKILLS_PLAY,
  ...SKILLS_STUDY,
  ...SKILLS_ADULT,
]
export const SKILLS_WITH_ROW_NAME: {
  [skillType: CSDataLearnedSkillType]: { [row: CSDataLearnedRow]: string }
} = {
  name0: SKILLS_BAD.reduce((acc, s, i) => ({ ...acc, [`row${i}`]: s }), {}),
  name1: SKILLS_SPORT.reduce((acc, s, i) => ({ ...acc, [`row${i}`]: s }), {}),
  name2: SKILLS_FRIEND.reduce((acc, s, i) => ({ ...acc, [`row${i}`]: s }), {}),
  name3: SKILLS_PLAY.reduce((acc, s, i) => ({ ...acc, [`row${i}`]: s }), {}),
  name4: SKILLS_STUDY.reduce((acc, s, i) => ({ ...acc, [`row${i}`]: s }), {}),
  name5: SKILLS_ADULT.reduce((acc, s, i) => ({ ...acc, [`row${i}`]: s }), {}),
}

export type CsDataBase = {
  innocent: {
    [key: string]: string
  }
  spooky: {
    [key: string]: string
  }
  player: string
}

export type CsDataAbility = {
  body: string
  magic1: string
  magic1cost: string
  magic2: string
  magic2cost: string
  magic3: string | null
  magic3cost: string | null
  wear1: string
  wear2: string
}

export type CSDataLearnedRow = `row${number}`
export type CSDataLearnedSkillType = `name${number}`
export type CSDataLearned = {
  id: `skills.${CSDataLearnedRow}.${CSDataLearnedSkillType}` | null
  judge: null
}

export type CsDataSkills = {
  a: string | null
  b: string | null
  c: string | null
  d: string | null
  e: string | null
  f: string | null // 不良の左
}

export type CsData = {
  ability: CsDataAbility
  base: CsDataBase
  learned: CSDataLearned[]
  skills: CsDataSkills
}

export type Innocent = {
  name: string
  age: string
  memo: string
  sex: string
  talent: string
  weakpoint: string
  skills: string[]
  speciality: SkillType | ''
}

export type Spooky = {
  name: string
  attack: number
  defense: number
  help: number
  interrupt: number
  mana: number
  memo: string
  ring: string
  url: string
  weakpoint: string
  magic: string[]
  body: {
    body: string
    wear1: string
    wear2: string
  }
}

export const OUTPUT_TYPE = {
  INNOCENT: 'innocent',
  SPOOKY: 'spooky',
  NONE: null,
} as const
export type OutputType = (typeof OUTPUT_TYPE)[keyof typeof OUTPUT_TYPE]
