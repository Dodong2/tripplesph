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
    isCancelling,
    handleCancelSubmission,
    article, isApproved, user
  } = useUpdateArticleForm()

  if (isLoading) return <p>Loading article...</p>
  if (error) return <p style={{ color: 'red' }}>{error.message}</p>
  if (!canEdit) return <p>You don't have permission to edit this article.</p>

  const isWriter = user?.role === 'writer'
  const isPending_ = article?.approvalStatus === 'PENDING'
  const isRejected = article?.approvalStatus === 'REJECTED'
  const isNone = article?.approvalStatus === 'NONE'
  const isPublished = article?.status === 'PUBLISHED'

  const isLocked = isWriter && (isPending_ || isPublished)

  return (
    <div>
      <h1>Edit Article</h1>
      <button onClick={() => navigate('/writer')}>← Back</button>

      {/* ── Status Banner ─────────────────────────── */}
      {isPending_ && (
        <div style={{ background: '#fff3cd', padding: '10px', margin: '10px 0' }}>
          ⏳ Pending approval — article is locked for editing.
          <button
            onClick={handleCancelSubmission}
            disabled={isCancelling}
            style={{ marginLeft: '10px' }}>
            {isCancelling ? 'Cancelling...' : 'Cancel Submission'}
          </button>
        </div>
      )}

      {isApproved && isPublished && (
        <div style={{ background: '#d4edda', padding: '10px', margin: '10px 0' }}>
          ✓ Published
        </div>
      )}

      {isRejected && (
        <div style={{ background: '#f8d7da', padding: '10px', margin: '10px 0' }}>
          <strong>✗ Rejected</strong>
          {article?.rejectReason && (
            <p style={{ margin: '5px 0 0' }}>
              <strong>Reason:</strong> {article.rejectReason}
            </p>
          )}
          <p style={{ margin: '5px 0 0' }}></p>
        </div>
      )}

      <br />

      {/* ── Form fields — disabled kapag locked ───── */}
      <div>
        <label>Title *</label><br />
        <input type="text" value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLocked}
          style={{ width: '400px' }}
        />
      </div>
      <br />

      <div>
        <label>Subtitle</label><br />
        <input type="text" value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          disabled={isLocked}
          style={{ width: '400px' }}
        />
      </div>
      <br />

      <div>
        <label>Content *</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isLocked}
          style={{ width: '400px' }}
        />
      </div>
      <br />

      <div>
        {TAGS.map(tag =>
          <label key={tag} style={{ marginRight: '10px' }}>
            <input type="checkbox"
              checked={selectedTags.includes(tag)}
              onChange={() => toggleTag(tag)}
              disabled={isLocked}
            />
            {tag}
          </label>
        )}
      </div>
      <br />

      <div>
        <label>Status *</label>
        <select value={status}
          onChange={(e) => setStatus(e.target.value as ArticleStatus)}
          disabled={isLocked}
        >
          <option value="DRAFT">Draft</option>
          <option value="SCHEDULED">Schedule</option>
          {isApproved && (
            <option value="PUBLISHED">✓ Publish Now</option>
          )}
        </select>
      </div>
      <br />

      {/* ── ACTION BUTTONS — isa lang lalabas depende sa state ── */}
      {/* Save Changes — lahat ng role, hindi locked, may changes */}
      {!isLocked && hasChanges && (
        <button onClick={handleSubmit} disabled={isPending}>
          {isPending ? 'Saving...' : 'Save Changes'}
        </button>
      )}

      {/* Send for Approval — DRAFT/REJECTED lang, walang pending changes */}
      {isWriter && (isNone || isRejected) && !hasChanges && !isPublished && (
        <button
          onClick={handleSubmitForApproval}
          disabled={isSubmitting}
          style={{ marginLeft: hasChanges ? '10px' : '0' }}
        >
          {isSubmitting ? 'Sending...' : '📤 Send for Approval'}
        </button>
      )}

      {!hasChanges && initialized && !isLocked && (
        <p style={{ color: 'gray', fontSize: '12px' }}>No changes yet</p>
      )}

      {isWriter && isPublished && (
        <p style={{ color: 'gray', fontSize: '12px' }}>
          Published articles cannot be edited.
        </p>
      )}

    </div>
  )
}

export default UpdateArticle