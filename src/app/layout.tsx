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
      <body className="md:flex flex-col md:h-screen">
        <div className="flex-1 md:flex gap-6 w-full max-w-screen-xl md:h-screen md:min-h-[700px] md:max-h-[1000px] mx-auto p-3 md:p-6 md:pb-2">
          <header className="flex-none bg-box px-3 py-4 md:p-4 md:w-[200px] min-[950px]:w-[280px]">
            <div>
              <h1
                className={`${cherrybomb.className} text-center w-full h-[100px] md:h-[130px] min-[950px]:h-[200px] relative flex items-center justify-center`}
              >
                <div className="relative z-[1]">
                  <span className="block text-4xl md:text-5xl min-[950px]:text-7xl text-primary text-border-2 md:text-border-3 leading-none">
                    PKB!
                  </span>
                  <span className="block text-xl md:text-2xl min-[950px]:text-3xl text-secondary text-border-1 md:text-border-2 leading-none mt-1.5 min-[950px]:mt-2">
                    CC Support
                  </span>
                </div>
                <div className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-85 w-[100px] h-[100px] md:w-[120px] md:h-[120px] min-[950px]:w-[190px] min-[950px]:h-[190px]">
                  <Image
                    src="/header_star.svg"
                    width={190}
                    height={190}
                    alt=""
                    className="w-[100%] h-[100%]"
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
                <h2>最終更新日：20XX/XX/XX</h2>
                <p className="mt-0.5 md:mt-1.5">ツール公開開始</p>
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
                「河嶋陶一朗」「落合なごみ」「冒険企画局」が権利を有する
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
          <div className="mt-4 md:mt-3">
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
