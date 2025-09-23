/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
  // allow images from Unsplash domains and from the S3 bucket used for uploads
  domains: ['images.unsplash.com', 'source.unsplash.com'],
  remotePatterns: [
      {
        protocol: 'https',
        hostname: 'emprendyup-images.s3.us-east-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
