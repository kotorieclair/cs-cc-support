const normalizeMap: { [full: string]: string } = {
  '１': '1',
  '２': '2',
  '３': '3',
  '４': '4',
  '５': '5',
  '６': '6',
  '７': '7',
  '８': '8',
  '９': '9',
  '０': '0',
  Ｄ: 'D',
  ｄ: 'd',
}

const regex = new RegExp(
  Object.keys(normalizeMap)
    .map((full) => `(${full})`)
    .join('|'),
  'g'
)

export const normalizeText = (str: string) => {
  return str.replace(regex, (s) => normalizeMap[s])
}
