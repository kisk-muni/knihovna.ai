const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["mdx", "ts", "tsx"],
  experimental: {
    missingSuspenseWithCSRBailout: false,
    serverComponentsExternalPackages: [
      "@sparticuz/chromium-min",
      "playwright-core",
    ],
  },
  async redirects() {
    return [
      {
        source: "/zprava",
        destination: "/reports/report.pdf",
        permanent: false,
      },
      {
        source: "/manual",
        destination: "/reports/manual.pdf",
        permanent: false,
      },
      {
        source: "/poznatky",
        destination: "/reports/learnings.pdf",
        permanent: false,
      },
      {
        source: "/shrnuti",
        destination: "/reports/summary.png",
        permanent: false,
      },
    ];
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
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};
// Merge MDX config with Next.js config
module.exports = withMDX(nextConfig);
