import { UserProfile } from '@/lib/schemas/dashboard';

// Tipos base para fechas
export type DateTime = string;

// Enumeración para el estado del post
export type PostStatus = 'DRAFT' | 'PUBLISHED';

// Interfaz para categorías del blog
export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  createdAt: DateTime;
  updatedAt: DateTime;
}

// Interfaz para etiquetas del blog
export interface BlogTag {
  id?: string;
  name: string;
  slug: string;
  createdAt: DateTime;
  updatedAt: DateTime;
}

// Interfaz principal para posts del blog
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  status: PostStatus;
  createdAt: DateTime;
  updatedAt: DateTime;
  publishedAt?: DateTime;
  coverImageUrl?: string;

  creator?: UserProfile;

  blogCategoryId?: string;
  blogCategory?: BlogCategory;

  tags?: BlogTag[];
  relatedPosts?: BlogPost[];
}

// Tipo para crear un nuevo post
export type CreatePostInput = {
  title: string;
  content: string;
  excerpt?: string;
  status?: PostStatus;
  blogCategoryId?: string;
  coverImageUrl?: string;
  tags?: string[];
  relatedPosts?: string[];
};

// Tipo para actualizar un post existente
export type UpdatePostInput = Partial<CreatePostInput>;
