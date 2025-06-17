import { CsDataSkills, SKILL_TYPES } from '@/pkb/constants'

export const getSpecialityFromCsSkills = (skills: CsDataSkills) => {
  if (skills.a === '1' && skills.b === '1') {
    return SKILL_TYPES.SPORT
  }
  if (skills.b === '1' && skills.c === '1') {
    return SKILL_TYPES.SPORT
  }
  if (skills.c === '1' && skills.d === '1') {
    return SKILL_TYPES.PLAY
  }
  if (skills.d === '1' && skills.e === '1') {
    return SKILL_TYPES.STUDY
  }
  if (skills.e === '1') {
    return SKILL_TYPES.ADULT
  }
  if (skills.a === '1') {
    return SKILL_TYPES.BAD
  }
}
