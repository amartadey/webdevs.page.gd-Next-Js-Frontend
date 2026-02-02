/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // Disable optimization in development (local WordPress with private IPs)
    // Enable optimization in production (public WordPress domain)
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'amartadey.test',
      },
      // Add your production WordPress domain here when deploying
      {
        protocol: 'https',
        hostname: 'dev.amartadey.com',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Increased cache TTL to reduce repeated requests to WordPress (1 hour)
    minimumCacheTTL: 3600,
    // Optimize image sizes for common device widths
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-src 'self' https: http:; frame-ancestors 'self';",
          },
        ],
      },
      // Add CORS headers for image optimization requests
      {
        source: '/_next/image',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },
};

export default nextConfig;