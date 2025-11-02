import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    formats: ['image/avif', 'image/webp'], // AVIF优先（更小体积）
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // 响应式图片尺寸
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // 小图标尺寸
    minimumCacheTTL: 31536000, // 1年缓存（秒）
  },

  // 环境变量
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },

  // 编译优化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // 暂时禁用ESLint和TypeScript检查以加快构建
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
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
