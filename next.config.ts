import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.solarsystemscope.com',
        pathname: '/textures/download/**',
      },
    ],
  },
};

export default nextConfig;
