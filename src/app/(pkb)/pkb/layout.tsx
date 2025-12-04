import type { Metadata, Viewport } from 'next'
import Image from 'next/image'
import '@kotorieclair/ktrecl-ui-tools/styles.css'
import './styles.css'
import { cherrybomb } from './fonts'
import { FooterProfile } from '@/lib/components/FooterProfile'

export const metadata: Metadata = {
  title: 'PKB! CC Support',
  description: 'ピーカーブーのココフォリア用キャラコマ作成サポートツール',
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
  openGraph: {
    title: 'PKB! CC Support',
    description: 'ピーカーブーのココフォリア用キャラコマ作成サポートツール',
    url: 'https://cs-cc-support.vercel.app/pkb',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PKB! CC Support',
    description: 'ピーカーブーのココフォリア用キャラコマ作成サポートツール',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function PkbLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" data-theme="synthwave">
      <body className="md:flex flex-col max-md:min-h-screen md:h-screen bg-pattern">
        <div className="flex-1 md:flex gap-6 w-full max-w-screen-xl md:h-screen md:min-h-[700px] md:max-h-[1000px] mx-auto p-3 md:p-6 md:pb-2">
          <header className="flex-none bg-box px-3 py-4 md:p-4 md:max-lgcol:w-[200px] min-lgcol:w-[280px]">
            <div>
              <h1
                className={`${cherrybomb.className} text-center w-full h-[100px] md:max-lgcol:h-[130px] min-lgcol:h-[200px] relative flex items-center justify-center`}
              >
                <div className="relative z-[1]">
                  <span className="block text-4xl md:max-lgcol:text-5xl min-lgcol:text-7xl leading-none text-primary text-border-2 md:text-border-3">
                    PKB!
                  </span>
                  <span className="block text-xl md:max-lgcol:text-2xl min-lgcol:text-3xl leading-none text-secondary text-border-1 min-md:text-border-2 mt-1.5 md:max-lgcol:mt-2 lgcol:mt-2.5">
                    CC Support
                  </span>
                </div>
                <div className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[100px] md:max-lgcol:size-[130px] min-lgcol:size-[190px]">
                  <Image
                    src="/pkb/header_star.svg"
                    width={190}
                    height={190}
                    alt=""
                    className="size-full"
                    priority
                  />
                </div>
              </h1>
              <p className="text-center text-sm min-[950px]:text-base mt-2 md:mt-8">
                <span className="block">
                  ピーカーブーの
                  <br className="max-md:hidden" />
                  キャラクターシートから
                </span>
                <span className="block">
                  ココフォリア用に
                  <br className="max-md:hidden" />
                  コマを出力するツール！
                </span>
              </p>
              <div className="text-center text-xs min-[950px]:text-sm mt-3 md:mt-10">
                <h2>最終更新日：2025/07/22</h2>
                <p className="mt-0.5 md:mt-1.5">
                  ツールデザイン更新
                  <br />
                  チャパレ出力内容の更新
                </p>
              </div>
            </div>
          </header>
          <main className="flex-1 max-md:mt-3">{children}</main>
        </div>

        <footer className="flex-none text-xs text-center bg-top text-base-content p-3 pb-5 md:p-5">
          <div>
            <span className="md:inline-block">
              <span className="block md:inline">当サイトは</span>
              <span className="block md:inline">
                「著：河嶋陶一朗、落合なごみ／冒険企画局、新紀元社」が権利を有する
              </span>
            </span>
            <span className="md:inline-block">
              <span className="block md:inline">
                『ご近所メルヒェンRPG ピーカーブー』の二次創作作品です。
              </span>
            </span>
          </div>
          <div className="mt-2 md:mt-1">
            <span className="block md:inline md:pr-4">
              &copy;アークライト／新紀元社
            </span>
            <span className="block md:inline">
              &copy;冒険企画局／河嶋陶一朗／落合なごみ
            </span>
          </div>
          <FooterProfile className="mt-4 md:mt-3" />
        </footer>
      </body>
    </html>
  )
}
