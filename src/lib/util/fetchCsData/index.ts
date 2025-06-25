import { SystemId, URL_BASE } from '@/app/constants'

export const fetchCsData = async <T>(csUrl: string, systemId: SystemId) => {
  const { href, searchParams } = new URL(csUrl)

  if (!href.startsWith(`${URL_BASE}${systemId}`)) {
    throw new Error('指定されたキャラクターシートURLに問題があります。')
  }

  const key = searchParams.get('key')

  const res = await fetch(`/api/${systemId}/${key}`, {
    headers: { 'Content-Type': 'application/json' },
  })
  const data: T = await res.json()

  return data
}
