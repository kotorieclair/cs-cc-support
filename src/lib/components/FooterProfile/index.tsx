import { memo } from 'react'

type Props = {
  className?: string
}

const FooterProfile = memo(function FooterProfile({ className }: Props) {
  return (
    <div className={className}>
      <div>
        <span className="block md:inline">
          このツールを作った人：暮亜 (
          <a
            href="https://takusuki.com/@kotorieclair"
            target="_blank"
            className="link hover:no-underline"
          >
            卓すきー:@kotorieclair
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
    </div>
  )
})

export { FooterProfile }
export type { Props as FooterProfileProps }
