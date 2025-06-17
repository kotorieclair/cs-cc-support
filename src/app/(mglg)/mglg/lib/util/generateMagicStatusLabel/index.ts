import { MagicCost } from '@/mglg/constants'

export const generateMagicStatusLabel = (name: string, cost?: MagicCost) =>
  `${name}${cost ? `:${cost.domain}${cost.value}` : ''}`
