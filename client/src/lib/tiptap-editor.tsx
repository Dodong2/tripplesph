import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { useRef } from 'react'
import { apiClient } from '../services/api-client'

interface TiptapEditorProps {
    content: string
    onChange: (html: string) => void
    disabled?: boolean
    placeholder?: string
    editorKey?: string
}

export const TiptapEditor = ({
    content,
    onChange,
    disabled = false,
    placeholder = 'Write your article here...',
    editorKey
}: TiptapEditorProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({ inline: false, allowBase64: false }),
            Placeholder.configure({ placeholder })
        ],
        content,
        editable: !disabled,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        }
    })

    const handleImageUpload = async (file: File) => {
        if (!editor) return

        const formData = new FormData()
        formData.append('image', file)

        try {
            const { data } = await apiClient.post('/api/upload/image', formData, {
                headers: { 'Content-Type': "multipart/form-data" }
            })

            editor.chain().focus().setImage({ src: data.url, alt: file.name }).run()
        } catch (err) {
            console.error('Image upload failed:', err)
        }
    }

    if (!editor) return null

    const toolbarBtn = (active: boolean, onClick: () => void, label: string) => (
        <button
            type='button'
            onClick={onClick}
            style={{
                padding: '4px 10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                background: active ? '#e0e0e0' : 'white',
                fontWeight: active ? 'bold' : 'normal',
                cursor: 'pointer',
                fontSize: '13px'
            }}
        >
            {label}
        </button>
    )

    return (
         <div style={{
      border: '1px solid #ccc',
      borderRadius: '6px',
      overflow: 'hidden',
      background: 'white'
    }}>
      {/* ── Toolbar ─────────────────────────────── */}
      {!disabled && (
        <div style={{
          display: 'flex', gap: '4px', padding: '8px',
          borderBottom: '1px solid #eee',
          background: '#f9f9f9',
          flexWrap: 'wrap'
        }}>
          {toolbarBtn(
            editor.isActive('bold'),
            () => editor.chain().focus().toggleBold().run(),
            'B'
          )}
          {toolbarBtn(
            editor.isActive('italic'),
            () => editor.chain().focus().toggleItalic().run(),
            'I'
          )}
          {toolbarBtn(
            editor.isActive('strike'),
            () => editor.chain().focus().toggleStrike().run(),
            'S̶'
          )}
          <div style={{ width: '1px', background: '#ddd', margin: '0 4px' }} />
          {toolbarBtn(
            editor.isActive('heading', { level: 2 }),
            () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            'H2'
          )}
          {toolbarBtn(
            editor.isActive('heading', { level: 3 }),
            () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            'H3'
          )}
          <div style={{ width: '1px', background: '#ddd', margin: '0 4px' }} />
          {toolbarBtn(
            editor.isActive('bulletList'),
            () => editor.chain().focus().toggleBulletList().run(),
            '• List'
          )}
          {toolbarBtn(
            editor.isActive('orderedList'),
            () => editor.chain().focus().toggleOrderedList().run(),
            '1. List'
          )}
          {toolbarBtn(
            editor.isActive('blockquote'),
            () => editor.chain().focus().toggleBlockquote().run(),
            '❝'
          )}
          {toolbarBtn(
            editor.isActive('codeBlock'),
            () => editor.chain().focus().toggleCodeBlock().run(),
            '</>'
          )}
          <div style={{ width: '1px', background: '#ddd', margin: '0 4px' }} />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            style={{
              padding: '4px 10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              background: 'white',
              cursor: 'pointer',
              fontSize: '13px'
            }}
          >
            🖼️ Image
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleImageUpload(file)
              e.target.value = ''
            }}
          />
        </div>
      )}

      {/* ── Editor Content ─────────────────────── */}
      <div style={{ padding: '12px' }}>
        <style>{`
          .ProseMirror {
            min-height: 300px;
            outline: none;
            line-height: 1.7;
            font-size: 15px;
          }
          .ProseMirror p { margin: 0 0 12px; }
          .ProseMirror h2 { font-size: 22px; font-weight: bold; margin: 20px 0 10px; }
          .ProseMirror h3 { font-size: 18px; font-weight: bold; margin: 16px 0 8px; }
          .ProseMirror ul { padding-left: 24px; margin: 0 0 12px; list-style: disc; }
          .ProseMirror ol { padding-left: 24px; margin: 0 0 12px; list-style: decimal; }
          .ProseMirror blockquote {
            border-left: 3px solid #ccc;
            padding-left: 16px;
            color: #666;
            margin: 0 0 12px;
            font-style: italic;
          }
          .ProseMirror code {
            background: #f0f0f0;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: monospace;
            font-size: 13px;
          }
          .ProseMirror pre {
            background: #1e1e1e;
            color: #dcdcdc;
            padding: 16px;
            border-radius: 6px;
            overflow-x: auto;
            margin: 0 0 12px;
          }
          .ProseMirror img {
            max-width: 100%;
            height: auto;
            border-radius: 6px;
            margin: 10px 0;
          }
          .ProseMirror p.is-editor-empty:first-child::before {
            content: attr(data-placeholder);
            color: #aaa;
            pointer-events: none;
            float: left;
            height: 0;
          }
          .ProseMirror hr {
            border: none;
            border-top: 2px solid #eee;
            margin: 20px 0;
          }
        `}</style>
        <EditorContent editor={editor} />
      </div>
    </div>
    )

}