import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep Turbopack scoped to this app when the repository root also has a lockfile.
  turbopack: {
    root: __dirname,
  },

  // 图片优化 - 增强性能配置
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },

  // 环境变量
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },

  // 编译优化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // 跳过 TypeScript 类型检查加快构建（本地用 npx tsc --noEmit 验证）
  typescript: {
    ignoreBuildErrors: true,
  },

  // 让大型 icon / 工具库按需 tree-shake，减少 unused JS bundle 体积
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@heroicons/react',
      '@heroicons/react/24/outline',
      '@heroicons/react/24/solid',
    ],
  },

  // 安全头和缓存策略
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      // 图片缓存策略 - 1年不可变缓存
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
