'use client';

import { useState, useEffect } from 'react';
import PostForm from './PostForm';
import MarkdownEditor from './MarkdownEditor';
import MarkdownPreview from './MarkdownPreview';
import { BlogPost } from '@/lib/blog/blog.api';

interface PostEditorProps {
  initialData?: BlogPost;
  isEdit?: boolean;
}

export default function PostEditor({ initialData, isEdit }: PostEditorProps) {
  const [content, setContent] = useState(initialData?.content || '');
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const editing = isEdit ?? Boolean(initialData);
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
      <PostForm
        initialData={{ ...initialData, content }}
        onSave={(saved) => {
          localStorage.removeItem(saved.id ? `draft:${saved.id}` : 'draft:new');
        }}
      />

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
            <MarkdownEditor value={content} onChange={setContent} />
          )}
          {(activeTab === 'preview' ||
            (typeof window !== 'undefined' && window.innerWidth >= 768)) && (
            <MarkdownPreview content={content} />
          )}
        </div>
      </div>
    </div>
  );
}
