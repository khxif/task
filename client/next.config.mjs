/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: process.env.NODE_ENV === "production" ? "https://billing-api-khxif.vercel.app/:path*" : "http://localhost:8000/:path*",

      },
    ];
  },
};

export default nextConfig;
