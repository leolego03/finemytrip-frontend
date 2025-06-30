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
    ],
  },
};

export default nextConfig;
