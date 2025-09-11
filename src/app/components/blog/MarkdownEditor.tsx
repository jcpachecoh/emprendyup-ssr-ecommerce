'use client';

import React from 'react';
import ToolbarButton from './ToolbarButton';
import { insertAtCursor } from '@/lib/blog/markdown';

interface MarkdownEditorProps {
  value: string;
  onChange: (val: string) => void;
}

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const applyFormat = (syntax: string) => {
    if (!textareaRef.current) return;
    const newVal = insertAtCursor(textareaRef.current, syntax);
    onChange(newVal);
  };

  return (
    <div className="border rounded p-2">
      <div className="flex gap-2 mb-2">
        <ToolbarButton label="B" onClick={() => applyFormat('**bold**')} />
        <ToolbarButton label="I" onClick={() => applyFormat('_italic_')} />
        <ToolbarButton label="H1" onClick={() => applyFormat('# ')} />
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-80 p-2 font-mono border rounded"
      />
    </div>
  );
}
