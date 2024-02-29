/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["@noahsaso/cosmodal"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/create", // When banner creator moved to subdomain
        destination: "https://zeus.apello.xyz/create",
        permanent: true,
      },
      {
        source: "/create/:slug", // When banner creator moved to subdomain
        destination: "https://zeus.apello.xyz/create",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
