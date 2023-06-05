/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/create/:slug", // When banner creator moved to subdomain
        destination: "https://zeus.apello.xyz/create",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
