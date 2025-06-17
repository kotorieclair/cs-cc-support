import { NextRequest, NextResponse } from 'next/server'
import { SystemId } from '@/app/constants'

// https://character-sheets.appspot.com/mglg/edit.html?key=ahVzfmNoYXJhY3Rlci1zaGVldHMtbXByFwsSDUNoYXJhY3RlckRhdGEYqo7axgUM

//http://character-sheets.appspot.com/[システム固有]/display?ajax=1&key=[シートID]

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ system: SystemId; id: string }> }
) {
  const { system, id } = await params

  if (!id) {
    throw new Error('キャラシIDの指定がありません。')
  }
  if (!system) {
    throw new Error(
      'システムの指定がないか、もしくは対応していないシステムです。'
    )
  }

  const url = `https://character-sheets.appspot.com/${system}/display?ajax=1&key=${id}`

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  })

  const data = await res.json()

  return NextResponse.json(data)
}
