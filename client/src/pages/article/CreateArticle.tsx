import { useNavigate } from "react-router-dom"
import { useCreateArticleForm } from "../../hooks/article/ui/useCreateArticleForm"
import { TAGS } from "../../constants/article.constants"
import type { ArticleStatus } from "../../types/index.types"
import { TiptapEditor } from "../../lib/tiptap-editor"

const CreateArticle = () => {
  const navigate = useNavigate()

  const {
    title, setTitle,
    subtitle, setSubtitle,
    content, setContent,
    status, setStatus,
    scheduledAt, setScheduledAt,
    selectedTags,
    isPending, error,
    toggleTag,
    handleCreate,
    createdArticle,
    handleSubmitForApproval,
    isSubmitting
  } = useCreateArticleForm()


  if(createdArticle) {
    return (
      <div>
        <h2>Article Created!</h2>
        <p><strong>{createdArticle.title}</strong></p>
        <p>Send it for admin approval to get it published.</p>

        <button
          onClick={handleSubmitForApproval}
          disabled={isSubmitting}
          style={{ marginRight: '10px' }}
        >
          {isSubmitting ? 'Sending...' : '📤 Send for Approval'}
        </button>

        <button onClick={() => navigate('/writer')}>
          Save & Submit Later
        </button>
      </div>
    )
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
        <TiptapEditor 
          content={content}
          onChange={setContent}
          placeholder="Write your article here..."
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
      <button onClick={handleCreate} disabled={isPending}>
        {isPending ? 'Creating...' : (
          status === 'DRAFT' ? '💾 Done' : '📅 Save as Scheduled'
        )}
      </button>
    </div>
  )
}

export default CreateArticle