import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Server-side GraphQL client for sitemap and other static generation
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql',
  // Remove credentials for server-side usage to avoid potential issues
  fetch: (uri, options) => {
    return fetch(uri, {
      ...options,
      headers: {
        ...options?.headers,
        'Content-Type': 'application/json',
        // Add any required server-side authentication headers here
      },
    });
  },
});

// Optional: Add authentication context for server-side requests
const authLink = setContext((_, { headers }) => {
  // Server-side auth token if needed
  const serverToken = process.env.GRAPHQL_SERVER_TOKEN;

  return {
    headers: {
      ...headers,
      ...(serverToken && { authorization: `Bearer ${serverToken}` }),
    },
  };
});

export const serverGraphQLClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  // Disable cache for server-side requests to ensure fresh data
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
  },
});

// Types for blog posts sitemap
export interface BlogPostSitemap {
  id: string;
  slug: string;
  title: string;
  publishedAt: string;
  updatedAt: string;
  status: string;
}

export interface BlogPostsPaginatedResponse {
  listPostsPaginated: {
    data: BlogPostSitemap[];
    pagination: {
      total: number;
      limit: number;
      offset: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
}

// Utility function to fetch all posts with pagination
export async function fetchAllPublishedPosts(): Promise<BlogPostSitemap[]> {
  const allPosts: BlogPostSitemap[] = [];
  let offset = 0;
  const limit = 50; // Fetch in chunks
  let hasMore = true;

  while (hasMore) {
    try {
      const { data } = await serverGraphQLClient.query<BlogPostsPaginatedResponse>({
        query: require('./queries').LIST_POSTS_PAGINATED,
        variables: {
          limit,
          offset,
          status: 'PUBLISHED',
        },
      });

      const posts = data.listPostsPaginated.data;
      allPosts.push(...posts);

      hasMore = data.listPostsPaginated.pagination.hasNext;
      offset += limit;

      // Safety break to avoid infinite loops
      if (offset > 10000) {
        console.warn('Breaking pagination loop at 10,000 posts for safety');
        break;
      }
    } catch (error) {
      console.error(`Error fetching posts at offset ${offset}:`, error);
      break;
    }
  }

  return allPosts;
}
