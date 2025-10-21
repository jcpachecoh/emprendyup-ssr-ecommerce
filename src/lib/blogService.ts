/**
 * Blog Service for EmprendyUp
 *
 * This service provides a unified interface to fetch blog data from multiple sources:
 * - Strapi CMS (primary)
 * - GraphQL API (fallback)
 * - Static data (development/fallback)
 */

import { fetchBlogPosts, fetchBlogPost, StrapiResponse, StrapiMedia } from './strapiClient';
import { BlogPost } from '../app/utils/types/BlogPost';

// Extended blog post interface for Strapi data
export interface StrapiBlogPost {
  id: number;
  attributes: {
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    publishedAt: string;
    updatedAt: string;
    author?: {
      data?: {
        id: number;
        attributes: {
          name: string;
          email?: string;
        };
      };
    };
    category?: {
      data?: {
        id: number;
        attributes: {
          name: string;
          slug: string;
        };
      };
    };
    tags?: {
      data: Array<{
        id: number;
        attributes: {
          name: string;
          slug: string;
        };
      }>;
    };
    featuredImage?: {
      data?: StrapiMedia;
    };
    seo?: {
      metaTitle?: string;
      metaDescription?: string;
      keywords?: string;
    };
    readTime?: number;
  };
}

/**
 * Configuration for blog data source
 */
export const BLOG_CONFIG = {
  USE_STRAPI: process.env.NEXT_PUBLIC_USE_STRAPI === 'true',
  USE_GRAPHQL: process.env.NEXT_PUBLIC_USE_GRAPHQL !== 'false', // Default to true
  FALLBACK_TO_STATIC: process.env.NODE_ENV === 'development',
};

/**
 * Converts Strapi blog post to BlogPost interface
 */
function convertStrapiBlogPost(strapiPost: StrapiBlogPost): BlogPost {
  const attributes = strapiPost.attributes;
  const featuredImage = attributes.featuredImage?.data?.attributes;

  return {
    id: strapiPost.id.toString(),
    title: attributes.title,
    desc: attributes.excerpt || attributes.content.substring(0, 200) + '...',
    date: new Date(attributes.publishedAt).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
    image: featuredImage?.url
      ? featuredImage.url.startsWith('http')
        ? featuredImage.url
        : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${featuredImage.url}`
      : '/images/blog/default.jpg',
    slug: `/blog-detalle/${attributes.slug}`,
    tags: attributes.tags?.data.map((tag) => tag.attributes.name) || [],
    keywords:
      attributes.seo?.keywords ||
      attributes.tags?.data.map((tag) => tag.attributes.name).join(', ') ||
      '',
    author: attributes.author?.data?.attributes.name || 'EmprendyUp Team',
    imageAlt: featuredImage?.alternativeText || attributes.title,
    content: attributes.content,
    readTime: attributes.readTime ? `${attributes.readTime} min` : '5 min',
  };
}

/**
 * Fetches blog posts from GraphQL API (existing implementation)
 */
async function fetchFromGraphQL(page: number = 1, pageSize: number = 9) {
  const query = `query ListPostsPaginated($categoryId: String, $page: Int, $pageSize: Int) { 
    listPostsPaginated(categoryId: $categoryId, page: $page, pageSize: $pageSize) { 
      items { 
        id 
        title 
        slug 
        excerpt 
        content 
        status 
        createdAt 
        updatedAt 
        publishedAt 
        creator { id name email } 
        blogCategory { id name slug } 
        tags { tag { id name slug } } 
        relatedPosts { id title slug } 
        coverImageUrl 
      } 
      total 
      page 
      pageSize 
      totalPages 
      hasNextPage 
      hasPrevPage 
    } 
  }`;

  const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql';

  try {
    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { categoryId: null, page, pageSize } }),
      next: { revalidate: 60 },
    });

    if (!resp.ok) {
      throw new Error(`GraphQL request failed: ${resp.status}`);
    }

    const json = await resp.json();
    return json?.data?.listPostsPaginated;
  } catch (error) {
    console.error('Error fetching from GraphQL:', error);
    return null;
  }
}

/**
 * Fetches blog posts with smart fallback strategy
 */
export async function getBlogPosts(
  options: {
    page?: number;
    pageSize?: number;
    category?: string;
  } = {}
) {
  const { page = 1, pageSize = 9, category } = options;

  // Try Strapi first if enabled
  if (BLOG_CONFIG.USE_STRAPI) {
    try {
      const strapiResponse: StrapiResponse<StrapiBlogPost[]> = await fetchBlogPosts({
        page,
        pageSize,
        sort: 'publishedAt:desc',
        filters: category ? { 'category.slug': category } : undefined,
      });

      const convertedPosts = strapiResponse.data.map(convertStrapiBlogPost);

      return {
        items: convertedPosts,
        total: strapiResponse.meta.pagination?.total || convertedPosts.length,
        page: strapiResponse.meta.pagination?.page || page,
        pageSize: strapiResponse.meta.pagination?.pageSize || pageSize,
        totalPages:
          strapiResponse.meta.pagination?.pageCount || Math.ceil(convertedPosts.length / pageSize),
        hasNextPage: page < (strapiResponse.meta.pagination?.pageCount || 1),
        hasPrevPage: page > 1,
        source: 'strapi' as const,
      };
    } catch (error) {
      console.error('Error fetching from Strapi, falling back to GraphQL:', error);
    }
  }

  // Fallback to GraphQL if Strapi fails or is disabled
  if (BLOG_CONFIG.USE_GRAPHQL) {
    try {
      const graphqlData = await fetchFromGraphQL(page, pageSize);
      if (graphqlData) {
        return {
          ...graphqlData,
          source: 'graphql' as const,
        };
      }
    } catch (error) {
      console.error('Error fetching from GraphQL:', error);
    }
  }

  // Final fallback to static data in development
  if (BLOG_CONFIG.FALLBACK_TO_STATIC) {
    const { blogPosts } = await import('../app/data/blogData');
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedPosts = blogPosts.slice(startIndex, endIndex);

    return {
      items: paginatedPosts,
      total: blogPosts.length,
      page,
      pageSize,
      totalPages: Math.ceil(blogPosts.length / pageSize),
      hasNextPage: endIndex < blogPosts.length,
      hasPrevPage: page > 1,
      source: 'static' as const,
    };
  }

  // Return empty result if all sources fail
  return {
    items: [],
    total: 0,
    page: 1,
    pageSize,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
    source: 'none' as const,
  };
}

/**
 * Fetches a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  // Remove leading slash and blog-detalle prefix if present
  const cleanSlug = slug.replace(/^\/?(blog-detalle\/)?/, '');

  // Try Strapi first if enabled
  if (BLOG_CONFIG.USE_STRAPI) {
    try {
      const strapiPost = await fetchBlogPost(cleanSlug);
      if (strapiPost) {
        return convertStrapiBlogPost(strapiPost);
      }
    } catch (error) {
      console.error('Error fetching blog post from Strapi:', error);
    }
  }

  // Fallback to GraphQL
  if (BLOG_CONFIG.USE_GRAPHQL) {
    try {
      const query = `query GetPostBySlug($slug: String!) {
        getPostBySlug(slug: $slug) {
          id
          title
          slug
          excerpt
          content
          publishedAt
          creator { name }
          blogCategory { name slug }
          tags { tag { name } }
          coverImageUrl
        }
      }`;

      const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql';
      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: { slug: cleanSlug } }),
        next: { revalidate: 60 },
      });

      if (resp.ok) {
        const json = await resp.json();
        const post = json?.data?.getPostBySlug;
        if (post) {
          return {
            id: post.id,
            title: post.title,
            desc: post.excerpt || post.content.substring(0, 200) + '...',
            date: new Date(post.publishedAt).toLocaleDateString('es-ES'),
            image: post.coverImageUrl?.startsWith('http')
              ? post.coverImageUrl
              : `https://emprendyup-images.s3.us-east-1.amazonaws.com/${post.coverImageUrl}`,
            slug: `/blog-detalle/${post.slug}`,
            tags: post.tags?.map((t: any) => t.tag.name) || [],
            keywords: post.tags?.map((t: any) => t.tag.name).join(', ') || '',
            author: post.creator?.name || 'EmprendyUp Team',
            imageAlt: post.title,
            content: post.content,
            readTime: '5 min',
          };
        }
      }
    } catch (error) {
      console.error('Error fetching blog post from GraphQL:', error);
    }
  }

  // Fallback to static data
  if (BLOG_CONFIG.FALLBACK_TO_STATIC) {
    const { blogPosts } = await import('../app/data/blogData');
    return blogPosts.find((post) => post.slug.includes(cleanSlug) || post.id === cleanSlug) || null;
  }

  return null;
}

/**
 * Fetches featured blog posts
 */
export async function getFeaturedBlogPosts(limit: number = 3): Promise<BlogPost[]> {
  const result = await getBlogPosts({ pageSize: limit });
  return result.items.slice(0, limit);
}

/**
 * Fetches blog posts by category
 */
export async function getBlogPostsByCategory(
  categorySlug: string,
  page: number = 1,
  pageSize: number = 9
) {
  return getBlogPosts({ page, pageSize, category: categorySlug });
}
