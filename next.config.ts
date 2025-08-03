import type { NextConfig } from "next";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'

// Extract hostname and port from URL
const getHostAndPort = (url: string) => {
  try {
    const urlObj = new URL(url)
    return {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? '443' : '80')
    }
  } catch {
    // Default values
    return {
      hostname: 'localhost',
      port: '8080'
    }
  }
}

const { hostname, port } = getHostAndPort(API_BASE_URL)

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: hostname,
        port: port,
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: hostname,
        port: port,
        pathname: '/uploads/**',
      },
    ],
    unoptimized: true, // For better compatibility
  },
  // Add experimental features for better SSR
  experimental: {
    optimizePackageImports: ['swiper'],
  },
  // Add headers for CORS
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ]
  },
  // Suppress hydration warnings for development
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  // Disable strict mode for development to reduce hydration issues
  reactStrictMode: false,
};

export default nextConfig;
