import { MagicCost } from '@/app/constants'

export const generateMagicStatusLabel = (name: string, cost?: MagicCost) =>
  `${name}${cost ? `:${cost.domain}${cost.value}` : ''}`
