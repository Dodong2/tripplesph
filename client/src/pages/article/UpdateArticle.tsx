import { useNavigate } from "react-router-dom"
import { TAGS } from "../../constants/article.constants"
import { useUpdateArticleForm } from "../../hooks/article/ui/useUpdateArticleForm"
import type { ArticleStatus } from "../../types/index.types"

const UpdateArticle = () => {
  const navigate = useNavigate()
  const {
    isLoading, error,
    isPending,
    title, setTitle,
    subtitle, setSubtitle,
    content, setContent,
    status, setStatus,
    scheduledAt, setScheduledAt,
    selectedTags,
    initialized,
    hasChanges, toggleTag,
    canEdit, handleSubmit,
    isSubmitting,
    handleSubmitForApproval,
    article,
    isApproved
  } = useUpdateArticleForm()

  if (isLoading) return <p>Loading article...</p>
  if (error) return <p style={{ color: 'red' }}>{error.message}</p>
  if (!canEdit) return <p>You don't have permission to edit this article.</p>

  return (
    <div>
      <h1>Edit Article</h1>
      <button onClick={() => navigate('/writer')}>← Back</button>

      {/* ── Approval Status Banner ─────────────────── */}
      {article?.approvalStatus === 'PENDING' && (
        <div style={{ background: '#fff3cd', padding: '10px', margin: '10px 0' }}>
          ⏳ This article is pending approval.
        </div>
      )}

      {article?.approvalStatus === 'APPROVED' && (
        <div style={{ background: '#d4edda', padding: '10px', margin: '10px 0' }}>
          ✓ This article has been approved and published.
        </div>
      )}

      {article?.approvalStatus === 'REJECTED' && (
        <div style={{ background: '#f8d7da', padding: '10px', margin: '10px 0' }}>
          <strong>✗ Rejected</strong>
          {article.rejectReason && (
            <p style={{ margin: '5px 0 0' }}>
              <strong>Reason:</strong> {article.rejectReason}
            </p>
          )}
          <p style={{ fontSize: '12px', color: 'gray', margin: '5px 0 0' }}>
            Update your article and resubmit for approval.
          </p>
        </div>
      )}

      <br /><br />

      <div>
        <label>Title *</label><br />
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
          style={{ width: '400px' }}
        />
      </div>

      <br />

      <div>
        <label>Subtitle</label><br />
        <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)}
          style={{ width: '400px' }}
        />
      </div>

      <br />

      <div>
        <label>Content *</label><br />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={10}
          style={{ width: '400px' }}
        />
      </div>

      <br />

      <div>
        <label>Tags *</label> <br />
        {TAGS.map(tag => (
          <label key={tag} style={{ marginRight: '10px' }}>
            <input type="checkbox" checked={selectedTags.includes(tag)}
              onChange={() => toggleTag(tag)} />
            {tag}
          </label>
        ))}
      </div>

      <br />

      <div>
        <label>Status *</label><br />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as ArticleStatus)}
        >
          <option value="DRAFT">Draft</option>
          <option value="SCHEDULED">Schedule</option>

          {isApproved && (
            <option value="PUBLISHED">✓ Publish Now</option>

          )}
        </select>
      </div>

      <br />

      {isApproved && status === 'PUBLISHED' && hasChanges && (
        <button onClick={handleSubmit} disabled={isPending}>
          {isPending ? 'Publishing...' : '🚀 Publish Now'}
        </button>
      )}

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

      <button
        onClick={handleSubmit}
        disabled={!hasChanges || isPending}
      >
        {isPending ? 'Saving...' : 'Save Changes'}
      </button>

      {!hasChanges && initialized && (
        <p style={{ color: 'gray', fontSize: '12px' }}>
          No changes yet
        </p>
      )}


      {/* ── Send for Approval — PUBLISHED + NONE/REJECTED ── */}
      {status === 'PUBLISHED' &&
        (article?.approvalStatus === 'NONE' ||
          article?.approvalStatus === 'REJECTED') &&
        !hasChanges && (
          <button
            onClick={handleSubmitForApproval}
            disabled={isSubmitting}
            style={{ marginLeft: '10px' }}
          >
            {isSubmitting ? 'Sending...' : '📤 Send for Approval'}
          </button>
        )
      }

      {!hasChanges && initialized && (
        <p style={{ color: 'gray', fontSize: '12px' }}>No changes yet</p>
      )}

    </div>
  )
}

export default UpdateArticle