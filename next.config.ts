import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/codinggame',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
