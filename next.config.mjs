const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },

      // DigitalOcean Spaces
      {
        protocol: "https",
        hostname: "your-space.your-region.digitaloceanspaces.com",
        pathname: "/**",
      },

      // Google Review Images
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;