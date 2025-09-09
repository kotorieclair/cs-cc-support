import { expect, test } from 'vitest'
import { STRATEGIES } from '@/strt/constants'
import { getStrategy } from '.'

test('correctly get strategy from CS data', () => {
  // そのまま（完全一致の必要あり）
  expect(getStrategy('エモーション')).toBe(STRATEGIES.EMOTION)
  expect(getStrategy('テクニック')).toBe(STRATEGIES.TECHNIQUE)
  expect(getStrategy('ロジック')).toBe(STRATEGIES.LOGIC)
})

test('return null when unknown strategy  is given', () => {
  // 存在しない作戦の場合はnullを返す
  expect(getStrategy('がむしゃら')).toBe(null)
})
