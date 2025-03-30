/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  distDir: "build",
  /* async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://37.148.210.172:5006/:path*",
      },
    ];
  }, */
};

module.exports = nextConfig;

/* 
  nps :5004/payment-successful

*/
