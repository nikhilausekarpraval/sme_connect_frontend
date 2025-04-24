

const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true, // Ignores ESLint during build
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        canvas: false,
        fs: false,
        path: false,
      };

      config.module.rules.push({
        test: /\.js$/,
        include: [/node_modules\/@tensorflow/, /node_modules\/@mediapipe/],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["next/babel"],
          },
        },
      });
    }

    return config;
  },
  experimental: {
    webGL: true,
  },
};

export default nextConfig;