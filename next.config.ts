import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: 'https://ktrecl-trpg-tools.vercel.app/',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
