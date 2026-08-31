import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin root strictly to this project so Turbopack never scans the user home directory
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  ...(process.env.NODE_ENV === "production" ? { output: "standalone" } : {}),
};

export default nextConfig;
