/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',  // Google profile images
        pathname: '/a/**',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',   // Other Google storage domains
      }
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: false // Ensure type checking during build
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        dns: false,
        net: false,
        tls: false,
        ...config.resolve.fallback,
        punycode: false
      };
    }
    return config;
  }
}

export default nextConfig;
