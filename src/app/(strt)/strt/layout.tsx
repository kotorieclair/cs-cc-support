import type { Metadata, Viewport } from 'next'
// import Image from 'next/image'
import '@kotorieclair/ktrecl-ui-tools/styles.css'
import './styles.css'
import { bungeeOutline } from './fonts'
import { FooterProfile } from '@/lib/components/FooterProfile'

export const metadata: Metadata = {
  title: 'STRATOSHOUT CC Support',
  description: 'ストラトシャウトのココフォリア用キャラコマ作成サポートツール',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    notranslate: true,
    indexifembedded: false,
    nositelinkssearchbox: true,
    googleBot: {
      index: false,
      follow: false,
      nocache: true,
      noarchive: true,
      nosnippet: true,
      noimageindex: true,
      notranslate: true,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function StrtLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" data-theme="darkstrt">
      <body className="md:h-screen md:flex flex-col bg-pattern-back">
        <header className="flex-none md:flex gap-20 items-center justify-center p-3 md:p-5 pb-6">
          <div className="max-md:text-center">
            <h1
              className={`text-accent text-2xl md:text-3xl leading-none ${bungeeOutline.className}`}
            >
              <span className="md:block">STRATOSHOUT </span>
              <span className="inline-block md:block">CC Support</span>
            </h1>
            <p className="text-xs mt-2 md:mt-1">
              ストラトシャウトのキャラクターシートから
              <br />
              ココフォリア用コマを出力するツール
            </p>
          </div>
          <div className="max-md:text-center">
            <p className="text-xs md:text-sm max-md:mt-2">
              最終更新日：25/09/10
            </p>
            <p className="text-xs">ツール公開開始</p>
          </div>
        </header>

        <div className="flex-1 flex flex-col overflow-y-hidden bg-base-100">
          {children}
        </div>

        <footer className="flex-none text-xs p-4 pt-6 text-center">
          <div>
            <span className="inline-block">当サイトは</span>
            <span className="inline-block">
              「著：古町みゆき／冒険企画局、新紀元社」が権利を有する
            </span>
            <span className="inline-block">
              『青春バンドTRPG ストラトシャウト』の二次創作作品です。
            </span>
            <span className="inline-block">
              &copy;冒険企画局／古町みゆき／河嶋陶一朗
            </span>
          </div>
          <FooterProfile className="mt-4 md:mt-3" />
        </footer>
      </body>
    </html>
  )
}
