import { z } from 'zod';

export const BlogPostSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Título requerido'),
  slug: z.string().min(1, 'Slug requerido'),
  content: z.string().min(1, 'Contenido requerido'),
  tags: z.array(z.string()).optional(),
  relatedPosts: z.array(z.string()).optional(),
  excerpt: z.string().optional(),
  coverImageUrl: z.string().url().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED']),
});

export type BlogPost = z.infer<typeof BlogPostSchema>;
