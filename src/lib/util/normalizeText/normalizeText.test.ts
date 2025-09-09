import { expect, test } from 'vitest'
import { normalizeText } from '.'

test('convert numbers', () => {
  expect(normalizeText('１')).toBe('1')
  expect(normalizeText('２')).toBe('2')
  expect(normalizeText('３')).toBe('3')
  expect(normalizeText('４')).toBe('4')
  expect(normalizeText('５')).toBe('5')
  expect(normalizeText('６')).toBe('6')
  expect(normalizeText('７')).toBe('7')
  expect(normalizeText('８')).toBe('8')
  expect(normalizeText('９')).toBe('9')
  expect(normalizeText('０')).toBe('0')

  expect(normalizeText('５２０９８７')).toBe('520987')
})

test('d for dice', () => {
  expect(normalizeText('ｄ')).toBe('d')
  expect(normalizeText('Ｄ')).toBe('D')
})

test('all', () => {
  expect(normalizeText('３d1０')).toBe('3d10')
  expect(normalizeText('２Ｄ６')).toBe('2D6')
})
