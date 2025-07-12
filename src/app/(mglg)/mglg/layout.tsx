import type { Metadata, Viewport } from 'next'
import '@kotorieclair/ktrecl-ui-tools/styles.css'
import './styles.css'
import { antiqua } from './fonts'
import { FooterProfile } from '@/lib/components/FooterProfile'

export const metadata: Metadata = {
  title: 'MagicaLogia CC Support',
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
              <p>マギカロギアのココフォリア用キャラコマ作成サポートツール</p>
              <p className="mt-2 text-xs">
                最終更新日：2025/07/13　チャパレ出力内容の更新、UI調整
              </p>
            </div>
            <div className="bg-base-100 max-w-screen-lg mx-auto py-8 px-4 min-[860px]:p-8">
              {children}
            </div>
          </main>
          <footer className="flex-none text-xs text-center bg-pattern bg-top text-primary-content p-5">
            <div>
              <span className="inline-block">当サイトは</span>

              <span className="inline-block">
                「著：河嶋陶一朗／冒険企画局、新紀元社」が権利を有する
              </span>
              <span className="inline-block">
                『魔道書大戦RPG マギカロギア』の二次創作作品です。
              </span>
              <span className="inline-block">&copy;冒険企画局／河嶋陶一朗</span>
            </div>
            <FooterProfile className="mt-3" />
          </footer>
        </div>
      </body>
    </html>
  )
}
