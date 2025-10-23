import { MetadataRoute } from 'next';
import { serverGraphQLClient, BlogPostsPaginatedResponse } from '@/lib/graphql/client';
import { LIST_POSTS_PAGINATED } from '@/lib/graphql/queries';
import { gql } from '@apollo/client';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.emprendyup.com';

// GraphQL query for products
const PAGINATED_PRODUCTS_QUERY = gql`
  query GetPaginatedProducts($page: Int, $pageSize: Int) {
    paginatedProducts(pagination: { page: $page, pageSize: $pageSize }) {
      items {
        id
        title
        available
        createdAt
        updatedAt
      }
      total
      page
      pageSize
    }
  }
`;

// Types for products sitemap
interface ProductSitemap {
  id: string;
  title: string;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ProductsPaginatedResponse {
  paginatedProducts: {
    items: ProductSitemap[];
    total: number;
    page: number;
    pageSize: number;
  };
}

// Función para obtener todos los productos disponibles desde GraphQL
async function getAllAvailableProducts() {
  try {
    const allProducts: ProductSitemap[] = [];
    let page = 1;
    const pageSize = 50;
    let hasMore = true;

    while (hasMore) {
      const { data } = await serverGraphQLClient.query<ProductsPaginatedResponse>({
        query: PAGINATED_PRODUCTS_QUERY,
        variables: {
          page,
          pageSize,
        },
        fetchPolicy: 'no-cache',
      });

      const products = data.paginatedProducts.items.filter((product) => product.available);
      allProducts.push(...products);

      hasMore = data.paginatedProducts.items.length === pageSize;
      page++;

      // Safety break to avoid infinite loops
      if (page > 100) {
        console.warn('Breaking pagination loop at 100 pages for safety');
        break;
      }
    }

    return allProducts;
  } catch (error) {
    console.error('Error fetching products for sitemap:', error);
    // Return empty array if there's an error
    return [];
  }
}

// Función para obtener todos los posts publicados desde GraphQL
async function getAllPublishedPosts() {
  try {
    const { data } = await serverGraphQLClient.query<BlogPostsPaginatedResponse>({
      query: LIST_POSTS_PAGINATED,
      variables: {
        limit: 1000, // Obtener muchos posts de una vez
        offset: 0,
        status: 'PUBLISHED', // Solo posts publicados
      },
    });

    return data.listPostsPaginated.data;
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
    // Fallback a lista estática en caso de error
    return [
      {
        id: '1',
        slug: 'product-market-fit-emprendedores-locales',
        title: 'Product Market Fit para Emprendedores Locales',
        publishedAt: '2024-08-25T00:00:00Z',
        updatedAt: '2024-08-25T00:00:00Z',
        status: 'PUBLISHED',
      },
      {
        id: '2',
        slug: 'canales-venta-hibridos',
        title: 'Canales de Venta Híbridos',
        publishedAt: '2024-08-25T00:00:00Z',
        updatedAt: '2024-08-25T00:00:00Z',
        status: 'PUBLISHED',
      },
      {
        id: '3',
        slug: 'branding-esencial-bajo-presupuesto',
        title: 'Branding Esencial con Bajo Presupuesto',
        publishedAt: '2024-08-25T00:00:00Z',
        updatedAt: '2024-08-25T00:00:00Z',
        status: 'PUBLISHED',
      },
      {
        id: '4',
        slug: 'precios-inteligentes-del-costo-al-valor',
        title: 'Precios Inteligentes: del Costo al Valor',
        publishedAt: '2024-08-25T00:00:00Z',
        updatedAt: '2024-08-25T00:00:00Z',
        status: 'PUBLISHED',
      },
      {
        id: '5',
        slug: 'validacion-rapida-ferias-popups',
        title: 'Validación Rápida: Ferias y Pop-ups',
        publishedAt: '2024-08-25T00:00:00Z',
        updatedAt: '2024-08-25T00:00:00Z',
        status: 'PUBLISHED',
      },
      {
        id: '6',
        slug: 'atencion-cliente-whatsapp-guion',
        title: 'Atención al Cliente por WhatsApp',
        publishedAt: '2024-08-25T00:00:00Z',
        updatedAt: '2024-08-25T00:00:00Z',
        status: 'PUBLISHED',
      },
      {
        id: '7',
        slug: 'logistica-envios-pymes',
        title: 'Logística de Envíos para PyMEs',
        publishedAt: '2024-08-25T00:00:00Z',
        updatedAt: '2024-08-25T00:00:00Z',
        status: 'PUBLISHED',
      },
      {
        id: '8',
        slug: 'finanzas-simples-flujo-caja',
        title: 'Finanzas Simples: Flujo de Caja',
        publishedAt: '2024-08-25T00:00:00Z',
        updatedAt: '2024-08-25T00:00:00Z',
        status: 'PUBLISHED',
      },
      {
        id: '9',
        slug: 'comunidad-referidos-crecimiento',
        title: 'Comunidad y Referidos para Crecimiento',
        publishedAt: '2024-08-25T00:00:00Z',
        updatedAt: '2024-08-25T00:00:00Z',
        status: 'PUBLISHED',
      },
      {
        id: '10',
        slug: 'vitrina-digital-fotos-que-venden',
        title: 'Vitrina Digital: Fotos que Venden',
        publishedAt: '2024-08-25T00:00:00Z',
        updatedAt: '2024-08-25T00:00:00Z',
        status: 'PUBLISHED',
      },
    ];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base sitemap
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/por-que-emprendy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ventajas`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/crear-tienda-online`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/automatizacion-whatsapp`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/marketplace`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/herramientas`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ferias-emprendedores`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/registro`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/centro-ayuda`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacidad`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terminos`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ];

  // Obtener posts dinámicamente desde GraphQL
  const blogPosts = await getAllPublishedPosts();

  // Obtener productos dinámicamente desde GraphQL
  const products = await getAllAvailableProducts();

  // Generar rutas de blog dinámicamente
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog-detalle/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Generar rutas de productos dinámicamente
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/producto/${product.id}`,
    lastModified: new Date(product.updatedAt || product.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...routes, ...blogRoutes, ...productRoutes];
}
