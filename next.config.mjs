

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    output: 'export',
    ignoreDuringBuilds: true, // Ignores ESLint during build
  },
};

export default nextConfig;