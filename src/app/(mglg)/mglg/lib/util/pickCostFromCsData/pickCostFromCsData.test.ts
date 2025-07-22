import { expect, test } from 'vitest'
import { pickCostFromCsData } from '.'
import { Chara, CsDataLibrary, DOMAIN_TYPES, MagicCost } from '@/mglg/constants'
import { data } from '@/mglg/sample_data/data_1'

const TEST_CHARA: Chara = {
  ...data.base,
  attack: 3,
  defense: 3,
  source: 3,
  domain: DOMAIN_TYPES.DARKNESS,
  soulSkill: '魂特技',
  skills: ['衝撃', '牙', '別れ', '情熱', '腐敗'],
}

test('correctly pick cost from CS data', () => {
  // コスト：なし
  const data1 = data.library[0] as unknown as CsDataLibrary
  const res1 = 'なし'
  expect(pickCostFromCsData(data1, TEST_CHARA)).toEqual(res1)

  // コスト：指定特技の分野の魔素2
  const data2a = data.library[1] as unknown as CsDataLibrary
  const res2a: MagicCost = {
    domain: DOMAIN_TYPES.SONG,
    value: 2,
  }
  expect(pickCostFromCsData(data2a, TEST_CHARA)).toEqual(res2a)

  // コスト：指定3（短縮パターン1）
  const data2b = {
    ...data.library[1],
    skill: '牙',
    cost: '指定3',
  } as unknown as CsDataLibrary
  const res2b: MagicCost = {
    domain: DOMAIN_TYPES.BEAST,
    value: 3,
  }
  expect(pickCostFromCsData(data2b, TEST_CHARA)).toEqual(res2b)

  // コスト：指定特技4（短縮パターン2）
  const data2c = {
    ...data.library[1],
    skill: '牙',
    cost: '指定特技4',
  } as unknown as CsDataLibrary
  const res2c: MagicCost = {
    domain: DOMAIN_TYPES.BEAST,
    value: 4,
  }
  expect(pickCostFromCsData(data2c, TEST_CHARA)).toEqual(res2c)

  // コスト：自分の領域の魔素3
  const data3a = {
    ...data.library[1],
    cost: '自分の領域の魔素3',
  } as unknown as CsDataLibrary
  const res3a: MagicCost = {
    domain: DOMAIN_TYPES.DARKNESS,
    value: 3,
  }
  expect(pickCostFromCsData(data3a, TEST_CHARA)).toEqual(res3a)

  // コスト：自領域3（短縮パターン）
  const data3b = {
    ...data.library[1],
    cost: '自領域4',
  } as unknown as CsDataLibrary
  const res3b: MagicCost = {
    domain: DOMAIN_TYPES.DARKNESS,
    value: 4,
  }
  expect(pickCostFromCsData(data3b, TEST_CHARA)).toEqual(res3b)

  // コスト：星1（分野指定の固定数値）
  const data4 = data.library[2] as unknown as CsDataLibrary
  const res4: MagicCost = {
    domain: DOMAIN_TYPES.STAR,
    value: 1,
  }
  expect(pickCostFromCsData(data4, TEST_CHARA)).toEqual(res4)

  // コスト：力X（分野指定のX）
  const data5 = data.library[3] as unknown as CsDataLibrary
  const res5: MagicCost = {
    domain: DOMAIN_TYPES.POWER,
    value: 'X',
  }
  expect(pickCostFromCsData(data5, TEST_CHARA)).toEqual(res5)

  // コストに入力がない場合は空白文字
  const data6 = data.library[6] as unknown as CsDataLibrary
  const res6 = ''
  expect(pickCostFromCsData(data6, TEST_CHARA)).toEqual(res6)
})
