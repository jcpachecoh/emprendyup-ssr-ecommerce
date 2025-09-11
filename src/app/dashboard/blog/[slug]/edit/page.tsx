import PostEditor from '@/app/components/blog/PostEditor';
import { blogApi } from '@/lib/blog/blog.api';

interface EditBlogPageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { slug } = await params;
  const post = await blogApi.getPostBySlug(slug);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Editar artículo</h1>
      <PostEditor initialData={post} isEdit />
    </div>
  );
}
