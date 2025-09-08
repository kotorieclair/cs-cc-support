import { Instrument, INSTRUMENTS_INVERTED } from '@/strt/constants'

const regex = new RegExp(
  Object.keys(INSTRUMENTS_INVERTED)
    .map((name) => `(${name})`)
    .join('|'),
  'g'
)

export const getInstrument = (instrument: string): Instrument | null => {
  // ドラムとドラムスの表記揺れなどをここで吸収したい
  const result = instrument.match(regex)
  return result ? (result[0] as Instrument) : null
}
