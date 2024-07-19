import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'mglg cc support',
  description: 'マギロギのココフォリア駒作成サポートツール',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" data-theme="cupcake">
      <body className="bg-base-100 min-h-screen p-5">{children}</body>
    </html>
  )
}
