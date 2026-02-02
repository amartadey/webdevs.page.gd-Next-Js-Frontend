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
      // {
      //   protocol: 'https',
      //   hostname: 'your-production-wordpress.com',
      // },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    minimumCacheTTL: 60,
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
    ];
  },
};

export default nextConfig;