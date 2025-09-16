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
    </div>
  );
}
