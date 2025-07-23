'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

// Simple fallback component that renders the same on server and client
const RichTextEditorFallback: React.FC<{ label?: string }> = ({ label }) => (
  <div className="space-y-2">
    {label && (
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
    )}
    <div className="border border-gray-300 rounded-md">
      <div className="h-32 bg-gray-100 rounded animate-pulse"></div>
    </div>
  </div>
);

// Client-only RichTextEditor component
const RichTextEditorClient: React.FC<RichTextEditorProps> = ({ 
  value, 
  onChange, 
  placeholder = "Введите текст...",
  label 
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
    ],
    content: mounted ? value : '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[150px] px-3 py-2',
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && mounted && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor, mounted]);

  if (!mounted) {
    return <RichTextEditorFallback label={label} />;
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="border border-gray-300 rounded-md">
        {/* Toolbar */}
        <div className="border-b border-gray-200 p-2 bg-gray-50">
          <div className="flex flex-wrap gap-1">
            {/* Text formatting */}
            <button
              onClick={() => editor?.chain().focus().toggleBold().run()}
              className={`p-2 rounded ${editor?.isActive('bold') ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              title="Жирный"
            >
              <strong>B</strong>
            </button>
            <button
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              className={`p-2 rounded ${editor?.isActive('italic') ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              title="Курсив"
            >
              <em>I</em>
            </button>
            <button
              onClick={() => editor?.chain().focus().toggleUnderline().run()}
              className={`p-2 rounded ${editor?.isActive('underline') ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              title="Подчеркнутый"
            >
              <u>U</u>
            </button>
            
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            
            {/* Headers */}
            <button
              onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
              className={`p-2 rounded ${editor?.isActive('heading', { level: 1 }) ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              title="Заголовок 1"
            >
              H1
            </button>
            <button
              onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`p-2 rounded ${editor?.isActive('heading', { level: 2 }) ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              title="Заголовок 2"
            >
              H2
            </button>
            <button
              onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
              className={`p-2 rounded ${editor?.isActive('heading', { level: 3 }) ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              title="Заголовок 3"
            >
              H3
            </button>
            
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            
            {/* Lists */}
            <button
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              className={`p-2 rounded ${editor?.isActive('bulletList') ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              title="Маркированный список"
            >
              •
            </button>
            <button
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
              className={`p-2 rounded ${editor?.isActive('orderedList') ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              title="Нумерованный список"
            >
              1.
            </button>
            
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            
            {/* Alignment */}
            <button
              onClick={() => editor?.chain().focus().setTextAlign('left').run()}
              className={`p-2 rounded ${editor?.isActive({ textAlign: 'left' }) ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              title="По левому краю"
            >
              ←
            </button>
            <button
              onClick={() => editor?.chain().focus().setTextAlign('center').run()}
              className={`p-2 rounded ${editor?.isActive({ textAlign: 'center' }) ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              title="По центру"
            >
              ↔
            </button>
            <button
              onClick={() => editor?.chain().focus().setTextAlign('right').run()}
              className={`p-2 rounded ${editor?.isActive({ textAlign: 'right' }) ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              title="По правому краю"
            >
              →
            </button>
            
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            
            {/* Link */}
            <button
              onClick={() => {
                const url = window.prompt('Введите URL:');
                if (url) {
                  editor?.chain().focus().setLink({ href: url }).run();
                }
              }}
              className={`p-2 rounded ${editor?.isActive('link') ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              title="Добавить ссылку"
            >
              🔗
            </button>
            
            <button
              onClick={() => editor?.chain().focus().unsetLink().run()}
              className="p-2 rounded hover:bg-gray-100"
              title="Убрать ссылку"
            >
              🚫
            </button>
          </div>
        </div>
        
        {/* Editor */}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

// Dynamically import the client component to avoid SSR
const RichTextEditor = dynamic(() => Promise.resolve(RichTextEditorClient), {
  ssr: false,
  loading: () => <RichTextEditorFallback label="" />,
});

export default RichTextEditor; 