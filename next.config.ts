/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: false, // Ensure this is false for Vercel
};

module.exports = nextConfig;
