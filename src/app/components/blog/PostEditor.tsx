'use client';

import { useState, useEffect } from 'react';
import PostForm from './PostForm';
import RichTextEditor from './RichTextEditor';
import DOMPurify from 'dompurify';
import { BlogPost } from '@/lib/blog/blog.api';

interface PostEditorProps {
  initialData?: BlogPost;
}

export default function PostEditor({ initialData }: PostEditorProps) {
  const [content, setContent] = useState(initialData?.content || '');
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [saving, setSaving] = useState(false);
  // image upload handled at form level when needed
  // editing flag not used directly here
  // Autosave en localStorage
  useEffect(() => {
    const draftKey = initialData?.id ? `draft:${initialData.id}` : 'draft:new';
    const saved = localStorage.getItem(draftKey);
    if (!initialData && saved) {
      setContent(saved);
      alert('Borrador restaurado');
    }
    const interval = setInterval(() => {
      localStorage.setItem(draftKey, content);
    }, 5000);
    return () => clearInterval(interval);
  }, [content, initialData]);

  return (
    <div className="space-y-6">
      <PostForm initialData={initialData} />

      {/* Editor / Preview */}
      <div className="border rounded-lg overflow-hidden">
        {/* Tabs para mobile */}
        <div className="flex md:hidden border-b">
          <button
            className={`flex-1 p-2 ${activeTab === 'edit' ? 'bg-gray-200' : ''}`}
            onClick={() => setActiveTab('edit')}
          >
            Editar
          </button>
          <button
            className={`flex-1 p-2 ${activeTab === 'preview' ? 'bg-gray-200' : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            Previsualizar
          </button>
        </div>

        <div className="grid md:grid-cols-2">
          {(activeTab === 'edit' ||
            (typeof window !== 'undefined' && window.innerWidth >= 768)) && (
            <RichTextEditor
              value={content}
              onChange={(html) => setContent(html)}
              onKeyDown={() => {}}
              onSubmit={() => {}}
              placeholder="Escribe el contenido del artículo..."
            />
          )}
          {(activeTab === 'preview' ||
            (typeof window !== 'undefined' && window.innerWidth >= 768)) && (
            <div className="p-4 bg-white text-black prose max-w-none" aria-live="polite">
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content || '') }} />
            </div>
          )}
        </div>
        {/* Save action for editor content */}
        <div className="p-4 flex justify-end gap-2">
          <button
            className="rounded bg-gray-100 px-3 py-2"
            onClick={() => {
              setContent(initialData?.content || '');
            }}
            disabled={saving}
          >
            Restaurar
          </button>
          <button
            className="rounded bg-blue-600 px-3 py-2 text-white"
            onClick={async () => {
              if (!initialData?.id) return alert('No hay post para actualizar');
              setSaving(true);
              try {
                const mutation = `mutation UpdatePost($input: UpdatePostInput!) { updatePost(input: $input) { id title slug content excerpt status createdAt updatedAt publishedAt creator { id name email } blogCategory { id name slug } tags { tag { id name slug } } relatedPosts { id title slug } } }`;
                const endpoint =
                  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql';
                const variables = {
                  input: {
                    id: initialData.id,
                    title: initialData.title,
                    content,
                    excerpt: initialData.excerpt || '',
                    status: 'PUBLISHED',
                  },
                };
                const res = await fetch(endpoint, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ query: mutation, variables }),
                });
                const json = await res.json();
                if (json?.errors) {
                  console.error(json.errors);
                  alert('Error al actualizar: ' + (json.errors[0]?.message || ''));
                } else {
                  alert('Artículo actualizado');
                }
              } catch (err) {
                console.error(err);
                alert('Error al actualizar');
              } finally {
                setSaving(false);
              }
            }}
            disabled={saving}
          >
            {saving ? 'Guardando...' : 'Guardar como publicado'}
          </button>
        </div>
      </div>
    </div>
  );
}
