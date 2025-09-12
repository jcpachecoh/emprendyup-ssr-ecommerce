// lib/blog/blog.api.ts

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverImageUrl?: string;
  status: 'DRAFT' | 'PUBLISHED';
  blogCategoryId?: string;
  tagIds?: string[];
  relatedPosts?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BlogCategory {
  id?: string;
  name?: string;
  slug?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

const API_BASE = '/api/blog'; // ajusta si tu backend expone en /blog

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || 'Error en la API de Blog');
  }
  return res.json();
}

export const blogApi = {
  // Crear post
  createPost: (data: Partial<BlogPost>) =>
    fetch(`${API_BASE}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse<BlogPost>),

  // Actualizar post
  updatePost: (id: string, data: Partial<BlogPost>) =>
    fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse<BlogPost>),

  // Obtener un post por ID
  getPostById: (id: string) => fetch(`${API_BASE}/${id}`).then(handleResponse<BlogPost>),

  // Obtener un post por slug
  // Obtener un post por slug
  async getPostBySlug(slug: string) {
    const baseUrl =
      typeof window === 'undefined'
        ? process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
        : '';
    const res = await fetch(`${baseUrl}/api/blog/slug/${slug}`, {
      cache: 'no-store', // evita cache en server
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error('Error al obtener el post: ' + text);
    }
    return res.json();
  },

  // Listar posts (paginados)
  listPosts: (params?: { page?: number; limit?: number; status?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return fetch(`${API_BASE}?${query}`).then(handleResponse<BlogPost[]>);
  },

  // Buscar posts (para relacionados o autocompletar)
  searchPosts: (query: string) =>
    fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`).then(handleResponse<BlogPost[]>),

  // Listar categorías
  listCategories: () => fetch(`${API_BASE}-categories`).then(handleResponse<BlogCategory[]>),

  // Listar tags
  listTags: () => fetch(`${API_BASE}-tags`).then(handleResponse<Tag[]>),
};
