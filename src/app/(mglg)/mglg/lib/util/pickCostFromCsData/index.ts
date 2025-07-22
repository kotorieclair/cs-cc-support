import {
  Chara,
  CsDataLibrary,
  DOMAIN_TYPES_LIST,
  DOMAIN_TYPE_ALL,
  DomainType,
  MagicCost,
} from '@/mglg/constants'
import { getDomainFromSkill } from '../getDomainFromSkill'

const SPECIFIED_SKILL_TEXT = /指定(特技)?/
const OWN_DOMAIN_TEXT = /(自).*(領域).*/
const DOMAIN_ALL_TEXT = new RegExp(DOMAIN_TYPE_ALL)
const DOMAIN_LIST_TEXT = new RegExp(DOMAIN_TYPES_LIST.join('|'))

export const pickCostFromCsData = (
  library: CsDataLibrary,
  chara: Chara
): MagicCost | string => {
  // コストに関して
  // 指定特技の分野の魔素2 → 指定(特技)
  // 自分の領域の魔素1 → (自)(領域)
  // 全X
  // 力3
  // 置き換えしたいね
  // 指定特技→skillから領域を推測
  // 自分の領域→base.domainから取得
  // 最後の一文字は必ず数字かXとなる
  //

  if (!library.cost) {
    return ''
  }

  const last = library.cost.at(-1)
  const cost = last === 'X' ? last : parseInt(last || '', 10)

  if (!Number.isInteger(cost) && cost !== 'X') {
    return library.cost
  }

  const preText = library.cost.slice(0, -1)

  if (preText.match(SPECIFIED_SKILL_TEXT) && library.skill) {
    const domain = getDomainFromSkill(library.skill)
    return {
      domain,
      value: cost,
    }
  }
  if (preText.match(OWN_DOMAIN_TEXT)) {
    return {
      domain: chara.domain,
      value: cost,
    }
  }
  if (preText.match(DOMAIN_ALL_TEXT)) {
    return {
      domain: DOMAIN_TYPE_ALL,
      value: cost,
    }
  }
  if (preText.match(DOMAIN_LIST_TEXT)) {
    return {
      domain: preText as DomainType,
      value: cost,
    }
  }

  return library.cost
}
