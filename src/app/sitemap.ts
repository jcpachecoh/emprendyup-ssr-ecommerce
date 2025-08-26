import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Base sitemap
  const routes = [
    {
      url: 'https://www.emprendyup.com',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: 'https://www.emprendyup.com/por-que-emprendy',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: 'https://www.emprendyup.com/ventajas',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: 'https://www.emprendyup.com/crear-tienda',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: 'https://www.emprendyup.com/registro',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: 'https://www.emprendyup.com/login',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: 'https://www.emprendyup.com/blog',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: 'https://www.emprendyup.com/contacto',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: 'https://www.emprendyup.com/centro-ayuda',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: 'https://www.emprendyup.com/privacidad',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: 'https://www.emprendyup.com/terminos',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ];

  // Blog posts
  const blogPosts = [
    'product-market-fit-emprendedores-locales',
    'canales-venta-hibridos',
    'branding-esencial-bajo-presupuesto',
    'precios-inteligentes-del-costo-al-valor',
    'validacion-rapida-ferias-popups',
    'atencion-cliente-whatsapp-guion',
    'logistica-envios-pymes',
    'finanzas-simples-flujo-caja',
    'comunidad-referidos-crecimiento',
    'vitrina-digital-fotos-que-venden',
  ];

  const blogRoutes = blogPosts.map((slug) => ({
    url: `https://www.emprendyup.com/blog-detalle/${slug}`,
    lastModified: new Date('2025-08-25'),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...routes, ...blogRoutes];
}
