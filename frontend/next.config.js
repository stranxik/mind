/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8006/:path*'
      }
    ]
  }
}

module.exports = nextConfig 