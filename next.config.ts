import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'cms-staging-penyhq-d7d761-62-72-57-221.traefik.me',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'rac-content-bucket.s3.ap-southeast-3.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
