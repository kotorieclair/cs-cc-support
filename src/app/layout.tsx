import type { Metadata, Viewport } from 'next'
import Image from 'next/image'
import '@kotorieclair/ktrecl-ui-tools/styles.css'
import './globals.css'
import { cherrybomb } from './fonts'

export const metadata: Metadata = {
  title: 'PKB! CC Support (仮)',
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
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" data-theme="synthwave">
      <body className="flex flex-col h-screen">
        <div className="flex-1 flex gap-6 w-full max-w-screen-xl h-screen min-h-[700px] max-h-[1000px] mx-auto p-6 pb-2">
          <header className="flex-none bg-box p-4 w-[280px] flex flex-col justify-between">
            <div>
              <h1
                className={`${cherrybomb.className} text-center w-full h-[200px] relative flex items-center justify-center`}
              >
                <div className="relative text-base-content z-[1]">
                  <span className="block text-7xl text-primary text-border-3 leading-none">
                    PKB!
                  </span>
                  <span className="block text-3xl text-secondary text-border-2 leading-none mt-2">
                    CC Support
                  </span>
                </div>
                <Image
                  src="/header_star.svg"
                  width={190}
                  height={190}
                  alt=""
                  className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-85"
                />
              </h1>
              <p className="text-center text-base mt-8">
                <span className="block">ピーカーブーのキャラシから</span>
                <span className="block">ココフォリア用に</span>
                <span className="block">コマを出力するツール！</span>
              </p>
              <div className="text-center text-sm mt-10">
                <h2>最終更新日：20XX/XX/XX</h2>
                <p className="mt-1.5">ツール公開開始</p>
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
        </div>

        <footer className="flex-none text-xs text-center bg-top text-base-content p-5">
          <div>
            <span className="inline-block">
              当サイトは「河嶋陶一朗」「落合なごみ」「冒険企画局」が権利を有する
            </span>
            <span className="inline-block">
              『ご近所メルヒェンRPG ピーカーブー』の二次創作作品です。
            </span>
          </div>
          <div className="mt-2 md:mt-1">
            <span className="inline-block">
              &copy;アークライト／新紀元社／冒険企画局／河嶋陶一朗／落合なごみ
            </span>
          </div>
          <div className="mt-3">
            <span className="block md:inline">
              このツールを作った人：暮亜 (
              <a
                href="https://x.com/kotorieclair"
                target="_blank"
                className="link hover:no-underline"
              >
                X:@kotorieclair
              </a>
              )
            </span>
            <span className="hidden md:inline px-0.5">／</span>
            <span className="block md:inline">
              <a
                href="https://ktrecl-trpg-tools.vercel.app/"
                className="link hover:no-underline"
              >
                KTRECL TRPG TOOLS
              </a>
            </span>
          </div>
          <div className="mt-2 md:mt-1">
            <span className="block md:inline">
              個人が趣味で勝手に作成しているツールです。
            </span>
            <span className="inline-block">
              キャラクターシート倉庫様ならびにココフォリア様とは
            </span>
            <span className="inline-block">一切関係ございません。</span>
          </div>
        </footer>
      </body>
    </html>
  )
}
