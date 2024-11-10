/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ELEVEN_LABS_API_KEY: process.env.ELEVEN_LABS_API_KEY,
  },
};

module.exports = nextConfig;
