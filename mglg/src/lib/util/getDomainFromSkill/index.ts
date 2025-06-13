import {
  DOMAIN_TYPES,
  SKILLS_BEAST,
  SKILLS_DARKNESS,
  SKILLS_DREAM,
  SKILLS_POWER,
  SKILLS_SONG,
  SKILLS_STAR,
} from '@/app/constants'

export const getDomainFromSkill = (skill: string) => {
  if (SKILLS_STAR.includes(skill)) {
    return DOMAIN_TYPES.STAR
  }
  if (SKILLS_BEAST.includes(skill)) {
    return DOMAIN_TYPES.BEAST
  }
  if (SKILLS_POWER.includes(skill)) {
    return DOMAIN_TYPES.POWER
  }
  if (SKILLS_SONG.includes(skill)) {
    return DOMAIN_TYPES.SONG
  }
  if (SKILLS_DREAM.includes(skill)) {
    return DOMAIN_TYPES.DREAM
  }
  if (SKILLS_DARKNESS.includes(skill)) {
    return DOMAIN_TYPES.DARKNESS
  }
  return ''
}
