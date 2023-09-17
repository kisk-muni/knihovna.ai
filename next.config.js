/** @type {import('next').NextConfig} */
const nextConfig = {
  fastRefresh: true,
  experimental: {
    serverComponentsExternalPackages: [
      "@sparticuz/chromium-min",
      "playwright-core",
    ],
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "knihovna.ai",
      },
      {
        protocol: "https",
        hostname: "s3.us-west-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
      },
    ],
  },
};
// Merge MDX config with Next.js config
module.exports = nextConfig;
