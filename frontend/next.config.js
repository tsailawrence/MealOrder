/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.builder.io','res.cloudinary.com'],
    },
    env: {
        baseUrl: 'https://api.foody-app.shop/',
        privateKey: process.env.PRIVATE_KEY,
    },
}

module.exports = nextConfig
