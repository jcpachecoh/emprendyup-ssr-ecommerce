import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/crear-tienda-online',
          '/automatizacion-whatsapp',
          '/ferias-emprendedores',
          '/herramientas',
          '/precios',
          '/marketplace',
          '/impulsa-tu-emprendimiento',
          '/blog',
          '/blog-detalle/',
        ],
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
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/crear-tienda-online',
          '/automatizacion-whatsapp',
          '/ferias-emprendedores',
          '/herramientas',
          '/precios',
          '/marketplace',
          '/impulsa-tu-emprendimiento',
          '/blog',
          '/blog-detalle/',
        ],
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
