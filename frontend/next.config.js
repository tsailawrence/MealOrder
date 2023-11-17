/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.builder.io'],
    },
    env: {
        baseUrl: process.env.BASE_URL,
    },
}

module.exports = nextConfig
