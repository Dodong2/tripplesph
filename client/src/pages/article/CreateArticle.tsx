import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { TAGS } from "../../constants/article.constants"
import { useCreateArticle } from "../../hooks/article/mutations/useCreateArticles"
import type { ArticleStatus, ArticleTag } from "../../types/index.types"
import toast from 'react-hot-toast'
import { UI_MESSAGES, VALIDATION_ERRORS } from "../../errors/message"

const CreateArticle = () => {
  const navigate = useNavigate()
  const { mutateAsync: createAsync, isPending, error } = useCreateArticle()

  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState<ArticleStatus>('DRAFT')
  const [scheduledAt, setScheduledAt] = useState('')
  const [selectedTags, setSelectedTags] = useState<ArticleTag[]>([])

  const toggleTag = (tag: ArticleTag) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])
  }

  const handleSubmit = async () => {
    if (!title.trim()) return alert('Title is required')
    if (!content.trim()) return alert('Content is required')
    if (selectedTags.length === 0) return alert('Select at least one tag')
    if (status === 'SCHEDULED' && !scheduledAt) {
      return toast.error(VALIDATION_ERRORS.required('Schedule date'))
    }

    await toast.promise(createAsync({
      title,
      subtitle: subtitle || undefined,
      content,
      status,
      scheduleAt: scheduledAt || undefined,
      tags: selectedTags
    }), {
      loading: 'Creating article...',
      success: UI_MESSAGES.success('created', 'Article'),
      error: (err: Error) => err.message
    }
    )

    navigate('/writer')
  }


  return (
    <div>
      <h1>Create Article</h1>
      <button onClick={() => navigate('/writer')}>← Back</button>

      <br /><br />

      {/* ── Title ─────────────────────────────────── */}
      <div>
        <label>Title *</label><br />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Article title"
          style={{ width: '400px' }}
        />
      </div>

      <br />

      {/* ── Subtitle ──────────────────────────────── */}
      <div>
        <label>Subtitle</label><br />
        <input
          type="text"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="Article subtitle (optional)"
          style={{ width: '400px' }}
        />
      </div>

      <br />

      {/* ── Content ───────────────────────────────── */}
      <div>
        <label>Content *</label><br />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your article here..."
          rows={10}
          style={{ width: '400px' }}
        />
      </div>

      <br />

      {/* ── Tags ──────────────────────────────────── */}
      <div>
        <label>Tags * (select at least one)</label><br />
        {TAGS.map(tag => (
          <label key={tag} style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              checked={selectedTags.includes(tag)}
              onChange={() => toggleTag(tag)}
            />
            {tag}
          </label>
        ))}
      </div>

      <br />

      {/* ── Status ────────────────────────────────── */}
      <div>
        <label>Status *</label><br />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as ArticleStatus)}
        >
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Publish Now</option>
          <option value="SCHEDULED">Schedule</option>
        </select>
      </div>

      <br />

      {/* ── Schedule — visible kung SCHEDULED lang ── */}
      {status === 'SCHEDULED' && (
        <div>
          <label>Schedule Date *</label><br />
          <input
            type="date"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
          />
        </div>
      )}

      <br />

      {error && <p style={{ color: 'red' }}>{error.message}</p>}

      {/* ── Submit ────────────────────────────────── */}
      <button
        onClick={handleSubmit}
        disabled={isPending}
      >
        {isPending ? 'Creating...' : 'Create Article'}
      </button>
    </div>
  )
}

export default CreateArticle