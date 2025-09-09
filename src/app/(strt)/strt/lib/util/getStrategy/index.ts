import { STRATEGIES, Strategy } from '@/strt/constants'

const arr = Object.values(STRATEGIES)

export const getStrategy = (strategy: string): Strategy | null => {
  const result = arr.includes(strategy as Strategy)
  return result ? (strategy as Strategy) : null
}
