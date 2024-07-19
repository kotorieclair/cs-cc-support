import { NextRequest, NextResponse } from 'next/server'
import { URL_BASE } from '@/app/constants'

// https://character-sheets.appspot.com/mglg/edit.html?key=ahVzfmNoYXJhY3Rlci1zaGVldHMtbXByFwsSDUNoYXJhY3RlckRhdGEYqo7axgUM

//http://character-sheets.appspot.com/[システム固有]/display?ajax=1&key=[シートID]

export async function GET(
  req: NextRequest,
  { params: { key } }: { params: { key: string } }
) {
  if (!key) {
    throw new Error(`キャラシkeyの指定がありません。`)
  }

  const url = `${URL_BASE}display?ajax=1&key=${key}`

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  })

  const data = await res.json()

  return NextResponse.json(data)
}
