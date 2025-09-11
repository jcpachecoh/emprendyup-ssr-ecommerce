'use client';
import PostForm from '@/app/components/blog/PostForm';

export default function NewBlogPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Nuevo artículo del blog</h1>
      <PostForm
        initialData={{ status: 'DRAFT' }}
        onSave={(saved) => {
          localStorage.removeItem(saved.id ? `draft:${saved.id}` : 'draft:new');
        }}
      />
    </div>
  );
}
