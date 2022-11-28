/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  // swcMinify: true,
  // env: {
  //   publicKey: 'my-value',
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'datocms-assets.com',
        port: '',
        pathname: '/47033/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
      }
    ],
    // domains: [
    //     'datocms-assets.com',
        
    // ],
  },
 
}

module.exports = nextConfig
