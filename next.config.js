/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: [
    //   "avatars.githubusercontent.com",
    //   "lh3.googleusercontent.com",
    //   "res.cloudinary.com",
    // ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
