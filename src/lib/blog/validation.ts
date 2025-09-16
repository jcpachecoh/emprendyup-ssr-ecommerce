import { z } from 'zod';

export const BlogPostSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Título requerido'),
  content: z.string().min(1, 'Contenido requerido'),
  tagIds: z.array(z.string()).optional(),
  relatedPosts: z.array(z.string()).optional(),
  excerpt: z.string().optional(),
  coverImageUrl: z.string().url().optional(),
  blogCategoryId: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED']),
});

export type BlogPost = z.infer<typeof BlogPostSchema>;
