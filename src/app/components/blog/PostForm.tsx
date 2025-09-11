'use client';

import { useEffect, useState } from 'react';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { blogApi, BlogPost } from '@/lib/blog/blog.api';
import { generateSlug } from '@/lib/blog/slug';
import { BlogPostSchema } from '@/lib/blog/validation';
import TextEditor from './TextEditor';
import { OutputData } from '@editorjs/editorjs';

interface PostFormProps {
  initialData?: Partial<BlogPost>;
  onSave?: (data: BlogPost) => void;
}

export default function PostForm({ initialData, onSave }: PostFormProps) {
  const [formData, setFormData] = useState<Partial<BlogPost>>(initialData || { status: 'DRAFT' });
  const [message, setMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [editorData, setEditorData] = useState<OutputData | undefined>(
    initialData?.content ? JSON.parse(initialData.content) : undefined
  );
  const router = useRouter();
  const isEdit = Boolean(initialData?.id);

  // Autogenerar slug al salir del título
  const handleTitleBlur = () => {
    if (!formData.slug && formData.title) {
      setFormData((prev) => ({ ...prev, slug: generateSlug(formData.title!) }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Guardar el contenido del editor
  const handleEditorChange = (data: OutputData) => {
    setEditorData(data); // 👈 solo actualizamos editorData
  };

  const handleSubmit = async (status: 'DRAFT' | 'PUBLISHED') => {
    try {
      setIsSaving(true);
      setMessage(null);

      // Validación con zod
      const parsed = BlogPostSchema.parse({
        ...formData,
        content: JSON.stringify(editorData || {}),
        status,
      });
      let saved: BlogPost;
      if (isEdit && initialData?.id) {
        saved = await blogApi.updatePost(initialData.id, parsed);
      } else {
        saved = await blogApi.createPost(parsed);
      }

      if (onSave) onSave(saved);

      router.push(`/dashboard/blog/${saved.slug}`);
    } catch (err: any) {
      console.error(err);
      setMessage(err.message || 'Error al guardar. Intenta nuevamente.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {message && (
        <p className="text-sm text-red-500" role="alert">
          {message}
        </p>
      )}

      {/* Title */}
      <div>
        <label className="block text-sm font-medium">Título</label>
        <input
          type="text"
          name="title"
          value={formData.title || ''}
          onChange={handleChange}
          onBlur={handleTitleBlur}
          className="w-full rounded border px-3 py-2"
          required
        />
      </div>

      {/* Slug */}
      <div>
        <label className="block text-sm font-medium">Slug</label>
        <input
          type="text"
          name="slug"
          value={formData.slug || ''}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2"
        />
      </div>

      {/* Content (EditorJS) */}
      <div>
        <label className="block text-sm font-medium">Contenido</label>
        <TextEditor
          data={editorData}
          onChange={handleEditorChange}
          placeholder="Escribe el contenido del artículo..."
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          type="button"
          disabled={isSaving}
          onClick={() => handleSubmit('DRAFT')}
          className="rounded bg-gray-200 text-black px-4 py-2 hover:bg-gray-300"
        >
          Guardar borrador
        </button>
        <button
          type="button"
          disabled={isSaving}
          onClick={() => handleSubmit('PUBLISHED')}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          {isEdit ? 'Actualizar' : 'Publicar'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/dashboard/blog')}
          className="rounded bg-gray-100 text-black px-4 py-2 hover:bg-gray-200"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
