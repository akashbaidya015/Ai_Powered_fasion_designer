/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**.ngrok-free.app', // Allow all ngrok subdomains
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  