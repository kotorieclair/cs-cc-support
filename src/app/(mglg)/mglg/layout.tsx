import type { Metadata, Viewport } from 'next'
import '@kotorieclair/ktrecl-ui-tools/styles.css'
import './styles.css'
import { antiqua } from './fonts'

export const metadata: Metadata = {
  title: 'MagicaLogia CC Support (仮)',
  description: 'マギカロギアのココフォリア用キャラコマ作成サポートツール',
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

export default function MglgLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" data-theme="autumn">
      <body className="flex flex-col justify-between bg-primary min-h-screen">
        <header className="flex-none sticky top-0 w-full p-2 md:p-4 bg-pattern bg-bottom text-white text-center z-10">
          <div
            className={`text-xl md:text-3xl ${antiqua.className} before:content-['*'] before:text-primary-content before:inline-block before:translate-y-[0.15em] before:mr-3 after:content-['*'] after:text-primary-content after:inline-block after:translate-y-[0.15em] after:ml-3`}
          >
            MagicaLogia CC Support
          </div>
        </header>
        <div className="flex-auto flex flex-col justify-between">
          <main className="w-full bg-pattern-sub">
            <div className="text-xs md:text-sm px-2 md:px-4 pt-0 pb-2 md:pb-4 bg-pattern bg-top text-white text-center">
              マギカロギアのココフォリア用キャラコマ作成サポートツール (仮)
            </div>
            <div className="bg-base-100 max-w-screen-lg mx-auto py-8 px-4 min-[860px]:p-8">
              {children}
            </div>
          </main>
          <footer className="flex-none text-xs text-center bg-pattern bg-top text-primary-content p-5">
            <div>
              <span className="inline-block">
                当サイトは「河嶋陶一朗」「冒険企画局」が権利を有する
              </span>
              <span className="inline-block">
                『魔道書大戦RPG マギカロギア』の二次創作作品です。
              </span>
              <span className="inline-block">&copy;冒険企画局／河嶋陶一朗</span>
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
        </div>
      </body>
    </html>
  )
}
