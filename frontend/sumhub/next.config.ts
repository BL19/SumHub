import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: 'standalone',
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

export default nextConfig;
