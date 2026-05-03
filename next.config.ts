import type { NextConfig } from 'next'

export default {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/photos/**'
      },
      {
        protocol: 'https',
        hostname: 'static.funwero.xyz',
        port: '',
        pathname: '/'
      }
    ]
  }
} satisfies NextConfig
