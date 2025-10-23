import { MetadataRoute } from 'next';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/por-que-emprendy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/ventajas`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/marketplace`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/privacidad`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/terminos`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  let productUrls: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_URL}/product`, { cache: 'no-store' });
    if (res.ok) {
      const products = await res.json();
      productUrls = products.map((product: any) => ({
        url: `${SITE_URL}/producto/${product.slug || product.id}`,
        lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      }));
    } else {
      console.warn('⚠️ No se pudieron obtener los productos del backend');
    }
  } catch (error) {
    console.error('❌ Error al cargar productos para el sitemap:', error);
  }

  let blogUrls: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_URL}/blog`, { cache: 'no-store' });
    if (res.ok) {
      const blogs = await res.json();
      blogUrls = blogs.map((post: any) => ({
        url: `${SITE_URL}/blog-detalle/${post.slug}`,
        lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      }));
    } else {
      console.warn('⚠️ No se pudieron obtener los blogs del backend');
    }
  } catch (error) {
    console.error('❌ Error al cargar blogs para el sitemap:', error);
  }

  return [...staticPages, ...productUrls, ...blogUrls];
}
