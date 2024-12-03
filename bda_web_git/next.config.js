/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.ngrok-free.app', // Allow all ngrok subdomains
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com', // Allow Google Cloud Storage
      },
    ],
  },
};

module.exports = nextConfig;
