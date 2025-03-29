/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://37.148.208.174:5006/:path*",
      },
    ];
  },
};

export default nextConfig;
