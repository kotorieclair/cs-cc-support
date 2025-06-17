export const URL_BASE = 'https://character-sheets.appspot.com/'

export const SYSTEM_ID = {
  MGLG: 'mglg',
  PKB: 'pkboo',
} as const
export type SystemId = (typeof SYSTEM_ID)[keyof typeof SYSTEM_ID]
