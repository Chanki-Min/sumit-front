/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true, // enable swc complier's styled-component support
    swcMinify: true, // enable swc minifier, https://nextjs.org/docs/advanced-features/compiler#minification
  },
};

module.exports = nextConfig;
