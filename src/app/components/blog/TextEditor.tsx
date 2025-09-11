'use client';

import { useEffect, useRef } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';

// Herramientas
// @ts-ignore
import ImageTool from '@editorjs/image';
// @ts-ignore
import Embed from '@editorjs/embed';
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import Paragraph from 'editorjs-paragraph-with-alignment';
// @ts-ignore
import DragDrop from 'editorjs-drag-drop';
// @ts-ignore
import Delimiter from '@editorjs/delimiter';

interface TextEditorProps {
  data?: OutputData;
  onChange: (data: OutputData) => void;
  placeholder?: string;
}

export default function TextEditor({ data, onChange, placeholder }: TextEditorProps) {
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: 'editor',
        autofocus: false,
        data: data || undefined,
        inlineToolbar: true,
        placeholder: placeholder || 'Escribe algo...',
        onReady: () => {
          new DragDrop(editor);
        },
        onChange: async () => {
          const output = await editor.save();
          onChange(output);
        },
        tools: {
          header: {
            class: Header as any,
            shortcut: 'CMD+SHIFT+D',
            config: {
              levels: [1, 2, 3, 4, 5, 6],
              defaultLevel: 2,
            },
          },
          paragraph: {
            class: Paragraph,
          },
          image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: '/api/upload', // Ajusta a tu backend
                byUrl: '/api/fetch-url',
              },
            },
          },
          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
                coub: true,
              },
            },
          },
          delimiter: Delimiter,
        },
        i18n: {
          toolNames: {
            Text: 'Texto',
            List: 'Lista',
            'Heading 1': 'Título 1',
            'Heading 2': 'Título 2',
            'Heading 3': 'Título 3',
            'Heading 4': 'Título 4',
            Image: 'Imagen',
            Delimiter: 'Delimitador',
            Bold: 'Negrita',
            Italic: 'Cursiva',
          },
        } as any,
      });

      editorRef.current = editor;
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy?.();
        editorRef.current = null;
      }
    };
  }, [data, onChange, placeholder]);

  return (
    <div
      id="editor"
      className="
        prose prose-invert max-w-none
        text-white dark:text-white
        prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-4
        prose-h2:text-3xl prose-h2:font-semibold prose-h2:mb-3
        prose-h3:text-2xl prose-h3:font-medium prose-h3:mb-2
        prose-p:text-base prose-p:leading-relaxed
        prose-img:rounded-xl prose-img:shadow-lg
      "
    />
  );
}
