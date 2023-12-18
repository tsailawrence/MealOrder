/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    domains: ["cdn.builder.io", "res.cloudinary.com", "via.placeholder.com"],
  },
  env: {
    baseUrl: process.env.BASE_URL,
    privateKey: process.env.PRIVATE_KEY,
  },
};

module.exports = nextConfig;
