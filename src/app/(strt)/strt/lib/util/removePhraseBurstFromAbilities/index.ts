import { CsDataAbility } from '@/strt/constants'

const regex =
  /ストラトシャウト|天唱|コードトーカー|弦語|モーメントキラー|隙殺|スケールダンス|軽階|チェイスラウンド|追鳴/g

export const removePhraseBurstFromAbilities = (abilities: CsDataAbility[]) => {
  return abilities.filter((a) => !(a.name || '').match(regex))
}
