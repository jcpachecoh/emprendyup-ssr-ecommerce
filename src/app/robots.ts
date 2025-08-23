import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/',
          '/user-account/',
          '/user-billing/',
          '/user-payment/',
          '/user-setting/',
          '/private/',
          '/*?*', // Disallow pages with query parameters to avoid duplicate content
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/',
          '/user-account/',
          '/user-billing/',
          '/user-payment/',
          '/user-setting/',
          '/private/',
        ],
      },
    ],
    sitemap: 'https://www.emprendyup.com/sitemap.xml',
    host: 'https://www.emprendyup.com',
  };
}
