import { expect, test } from 'vitest'
import { pickCostFromCsData } from '.'
import { Chara, CsDataLibrary, DOMAIN_TYPES, MagicCost } from '@/app/constants'
import { data } from '@/sample_data/data_1'

const TEST_CHARA: Chara = {
  ...data.base,
  attack: 3,
  defense: 3,
  source: 3,
  domain: DOMAIN_TYPES.DARKNESS,
}

test('correctly pick cost from CS data', () => {
  // コスト：なし
  const data1 = data.library[0] as unknown as CsDataLibrary
  const res1 = 'なし'
  expect(pickCostFromCsData(data1, TEST_CHARA)).toEqual(res1)

  // コスト：指定特技の分野の魔素2
  const data2 = data.library[1] as unknown as CsDataLibrary
  const res2: MagicCost = {
    domain: DOMAIN_TYPES.SONG,
    value: 2,
  }
  expect(pickCostFromCsData(data2, TEST_CHARA)).toEqual(res2)

  // コスト：自分の領域の魔素3
  const data3 = {
    ...data.library[1],
    cost: '自分の領域の魔素3',
  } as unknown as CsDataLibrary
  const res3: MagicCost = {
    domain: DOMAIN_TYPES.DARKNESS,
    value: 3,
  }
  expect(pickCostFromCsData(data3, TEST_CHARA)).toEqual(res3)

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
