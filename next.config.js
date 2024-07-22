/** @type {import('next').NextConfig} */
const isProd = process.env.NEXT_PUBLIC_IS_PROD === "true" ? true : false;

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
    localeDetection: false
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  compiler:  {
    removeConsole: isProd,
  },
}

module.exports = nextConfig
