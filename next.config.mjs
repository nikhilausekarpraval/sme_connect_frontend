

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true, // Ignores ESLint during build
  },
};

export default nextConfig;