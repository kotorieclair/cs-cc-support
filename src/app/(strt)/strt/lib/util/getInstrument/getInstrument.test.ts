import { expect, test } from 'vitest'
import { INSTRUMENTS } from '@/strt/constants'
import { getInstrument } from '.'

test('correctly get instrument from CS data', () => {
  // そのまま
  expect(getInstrument('ボーカル')).toBe(INSTRUMENTS.VO)
  expect(getInstrument('ギター')).toBe(INSTRUMENTS.GT)
  expect(getInstrument('ベース')).toBe(INSTRUMENTS.BA)
  expect(getInstrument('キーボード')).toBe(INSTRUMENTS.KEY)

  // 表記揺れ
  expect(getInstrument('リードギター')).toBe(INSTRUMENTS.GT)
  expect(getInstrument('ドラムス')).toBe(INSTRUMENTS.DR)
  expect(getInstrument('ドラム')).toBe(INSTRUMENTS.DR)
})

test('get the name of the first match instrument', () => {
  // 優先順位（一番最初にヒットした楽器を採用）
  expect(getInstrument('ギターボーカル')).toBe(INSTRUMENTS.GT)
  expect(getInstrument('ボーカル／ギターボーカル')).toBe(INSTRUMENTS.VO)
  expect(getInstrument('キーボードボーカル')).toBe(INSTRUMENTS.KEY)
})

test('return null when unknown instrument name is given', () => {
  // ヒットしない楽器名のみの場合はnullを返す
  expect(getInstrument('三味線')).toBe(null)
  expect(getInstrument('ギター／三味線')).toBe(INSTRUMENTS.GT)
})
