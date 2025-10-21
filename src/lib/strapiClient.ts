/**
 * Strapi Client for EmprendyUp
 *
 * This module provides utilities to fetch data from Strapi CMS
 * using environment variables for configuration.
 */

// Environment variables validation
const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

if (!STRAPI_API_URL) {
  throw new Error('NEXT_PUBLIC_STRAPI_API_URL environment variable is required');
}

if (!STRAPI_TOKEN) {
  console.warn('STRAPI_TOKEN not found. Some requests may fail if authentication is required.');
}

/**
 * Fetches data from Strapi API
 * @param endpoint - The API endpoint to fetch from (e.g., '/api/articles')
 * @param options - Additional fetch options
 * @returns Promise with the JSON response
 */
export async function fetchFromStrapi(endpoint: string, options?: RequestInit) {
  const url = `${STRAPI_API_URL}${endpoint}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Add authorization header if token is available
  if (STRAPI_TOKEN) {
    headers.Authorization = `Bearer ${STRAPI_TOKEN}`;
  }

  // Merge with provided headers
  if (options?.headers) {
    Object.assign(headers, options.headers);
  }

  const res = await fetch(url, {
    headers,
    next: { revalidate: 60 }, // Revalidate every 60 seconds
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

/**
 * Fetches multiple blog posts from Strapi
 * @param params - Query parameters for filtering, sorting, pagination
 * @returns Promise with blog posts data
 */
export async function fetchBlogPosts(params?: {
  page?: number;
  pageSize?: number;
  sort?: string;
  filters?: Record<string, any>;
}) {
  const searchParams = new URLSearchParams();

  if (params?.page) searchParams.set('pagination[page]', params.page.toString());
  if (params?.pageSize) searchParams.set('pagination[pageSize]', params.pageSize.toString());
  if (params?.sort) searchParams.set('sort', params.sort);

  // Add filters if provided
  if (params?.filters) {
    Object.entries(params.filters).forEach(([key, value]) => {
      searchParams.set(`filters[${key}]`, value);
    });
  }

  const endpoint = `/api/blog-posts?${searchParams.toString()}&populate=*`;
  return fetchFromStrapi(endpoint);
}

/**
 * Fetches a single blog post by slug
 * @param slug - The blog post slug
 * @returns Promise with blog post data
 */
export async function fetchBlogPost(slug: string) {
  const endpoint = `/api/blog-posts?filters[slug][$eq]=${slug}&populate=*`;
  const response = await fetchFromStrapi(endpoint);

  // Return the first item since we're filtering by unique slug
  return response.data?.[0] || null;
}

/**
 * Fetches hero section content
 * @returns Promise with hero section data
 */
export async function fetchHeroSection() {
  const endpoint = '/api/hero-section?populate=*';
  return fetchFromStrapi(endpoint);
}

/**
 * Fetches testimonials
 * @param limit - Maximum number of testimonials to fetch
 * @returns Promise with testimonials data
 */
export async function fetchTestimonials(limit?: number) {
  const searchParams = new URLSearchParams();
  if (limit) searchParams.set('pagination[pageSize]', limit.toString());

  const endpoint = `/api/testimonials?${searchParams.toString()}&populate=*`;
  return fetchFromStrapi(endpoint);
}

/**
 * Fetches featured products or content
 * @param limit - Maximum number of featured items to fetch
 * @returns Promise with featured content data
 */
export async function fetchFeaturedContent(limit?: number) {
  const searchParams = new URLSearchParams();
  if (limit) searchParams.set('pagination[pageSize]', limit.toString());

  const endpoint = `/api/featured-content?${searchParams.toString()}&populate=*`;
  return fetchFromStrapi(endpoint);
}

/**
 * Utility function to build Strapi media URL
 * @param url - The relative URL from Strapi
 * @returns Full media URL
 */
export function getStrapiMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null;

  // If URL is already absolute, return as is
  if (url.startsWith('http')) return url;

  // Build full URL with Strapi base URL
  return `${STRAPI_API_URL}${url}`;
}

/**
 * Types for Strapi responses
 */
export interface StrapiResponse<T = any> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiMediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface StrapiMedia {
  id: number;
  attributes: {
    name: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    formats?: {
      thumbnail?: StrapiMediaFormat;
      small?: StrapiMediaFormat;
      medium?: StrapiMediaFormat;
      large?: StrapiMediaFormat;
    };
    url: string;
  };
}
