/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    modularizeImports: {
      lodash: {
        transform: "lodash/{{member}}",
      },
    },
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true, // enable swc complier's styled-component support
    swcMinify: true, // enable swc minifier, https://nextjs.org/docs/advanced-features/compiler#minification
  },
  images: {
    domains: ["lh3.googleusercontent.com", "s3.ap-northeast-2.amazonaws.com"],
  },
};

module.exports = nextConfig;
