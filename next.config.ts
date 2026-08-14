import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "pg",
    "@prisma/client",
    "@prisma/adapter-pg",
    "prisma",
    "bcryptjs",
  ],
};

export default nextConfig;
