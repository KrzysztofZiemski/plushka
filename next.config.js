/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["pl"],
    defaultLocale: "pl",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "datocms-assets.com",
        port: "8080",
        pathname: "/47033/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "8080",
      },
    ],
    // domains: [
    //     'datocms-assets.com',

    // ],
  },
};

module.exports = nextConfig;
