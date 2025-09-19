/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'images.unsplash.com', 
      'source.unsplash.com',
      'emprendyup-images.s3.us-east-1.amazonaws.com'
    ],
  },
};

export default nextConfig;
