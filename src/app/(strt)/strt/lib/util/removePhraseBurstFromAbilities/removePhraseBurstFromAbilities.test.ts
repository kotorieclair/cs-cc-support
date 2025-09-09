import { expect, test } from 'vitest'
import { CsDataAbility } from '@/strt/constants'
import { removePhraseBurstFromAbilities } from '.'

const TEST_ABILITIES: CsDataAbility[] = [
  { name: 'アド・リブ' },
  { name: 'ホットスタート' },
  { name: '共鳴' },
]

test('correctly remove phrase burst from ability list', () => {
  expect(
    removePhraseBurstFromAbilities([...TEST_ABILITIES, { name: '天唱' }])
  ).toEqual(TEST_ABILITIES)
  expect(
    removePhraseBurstFromAbilities([
      ...TEST_ABILITIES,
      { name: 'ストラトシャウト' },
    ])
  ).toEqual(TEST_ABILITIES)
  expect(
    removePhraseBurstFromAbilities([
      ...TEST_ABILITIES,
      { name: '弦語（コードトーカー）' },
    ])
  ).toEqual(TEST_ABILITIES)
  expect(
    removePhraseBurstFromAbilities([
      ...TEST_ABILITIES,
      { name: 'モーメントキラー／隙殺' },
    ])
  ).toEqual(TEST_ABILITIES)
  expect(
    removePhraseBurstFromAbilities([
      ...TEST_ABILITIES,
      { name: '軽階(スケールダンス)' },
    ])
  ).toEqual(TEST_ABILITIES)
  expect(
    removePhraseBurstFromAbilities([
      ...TEST_ABILITIES,
      { name: 'チェイスラウンド' },
    ])
  ).toEqual(TEST_ABILITIES)
  expect(
    removePhraseBurstFromAbilities([...TEST_ABILITIES, { name: '追鳴' }])
  ).toEqual(TEST_ABILITIES)

  // どこに入ってもOK
  expect(
    removePhraseBurstFromAbilities([
      { name: 'スケールダンス' },
      ...TEST_ABILITIES,
    ])
  ).toEqual(TEST_ABILITIES)
  expect(
    removePhraseBurstFromAbilities([
      TEST_ABILITIES[0],
      { name: '隙殺' },
      TEST_ABILITIES[1],
      TEST_ABILITIES[2],
    ])
  ).toEqual(TEST_ABILITIES)
  expect(
    removePhraseBurstFromAbilities([
      TEST_ABILITIES[2],
      TEST_ABILITIES[0],
      { name: '弦語' },
      TEST_ABILITIES[1],
      { name: 'チェイスラウンド' },
    ])
  ).toEqual([TEST_ABILITIES[2], TEST_ABILITIES[0], TEST_ABILITIES[1]])
})
