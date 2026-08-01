const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/uploads/**",
      },

      // Keep your existing DigitalOcean configuration here
      {
        protocol: "https",
        hostname: "your-space.your-region.digitaloceanspaces.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;