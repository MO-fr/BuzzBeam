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
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        punycode: false
      };
    }
    return config;
  }
}

export default nextConfig;
