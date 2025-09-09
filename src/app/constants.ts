export const URL_BASE = 'https://character-sheets.appspot.com/'

export const SYSTEM_ID = {
  MGLG: 'mglg',
  PKB: 'pkboo',
  STRT: 'stratoshout',
} as const
export type SystemId = (typeof SYSTEM_ID)[keyof typeof SYSTEM_ID]

// キャラシ共通項目
export type CSDataLearnedRow = `row${number}`
export type CSDataLearnedSkillType = `name${number}`
export type CSDataLearned = {
  id: `skills.${CSDataLearnedRow}.${CSDataLearnedSkillType}` | null
  judge: null
}
