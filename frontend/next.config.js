/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.builder.io'],
    },
    env: {
        baseUrl: process.env.BASE_URL,
        privateKey: process.env.PRIVATE_KEY,
    },
}

module.exports = nextConfig
