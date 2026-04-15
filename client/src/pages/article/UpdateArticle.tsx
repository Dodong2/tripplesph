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
    article, isApproved, user
  } = useUpdateArticleForm()

  if (isLoading) return <p>Loading article...</p>
  if (error) return <p style={{ color: 'red' }}>{error.message}</p>
  if (!canEdit) return <p>You don't have permission to edit this article.</p>

  const isWriter = user?.role === 'writer'
  // const isPending_ = article?.approvalStatus === 'PENDING'
  const isRejected = article?.approvalStatus === 'REJECTED'
  const isNone = article?.approvalStatus === 'NONE'
  const isPublished = article?.status === 'PUBLISHED'

  return (
    <div>
      <h1>Edit Article</h1>
      <button onClick={() => navigate('/writer')}>← Back</button>

      {isApproved && isPublished && (
        <div style={{ background: '#d4edda', padding: '10px', margin: '10px 0' }}>
          ✓ Published
        </div>
      )}

      {/* {isRejected && (
        <div style={{ background: '#f8d7da', padding: '10px', margin: '10px 0' }}>
          <strong>✗ Rejected</strong>
          {article?.rejectionReason && (
            <p style={{ margin: '5px 0 0' }}>
              <strong>Reason:</strong> {article.rejectionReason}
            </p>
          )}
          <p style={{ margin: '5px 0 0' }}></p>
        </div>
      )} */}

      <br />

      {/* ── Form fields — disabled kapag locked ───── */}
      <div>
        <label>Title *</label><br />
        <input type="text" value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isWriter && isPublished}
          style={{ width: '400px' }}
        />
      </div>
      <br />

      <div>
        <label>Subtitle</label><br />
        <input type="text" value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          disabled={isWriter && isPublished}
          style={{ width: '400px' }}
        />
      </div>
      <br />

      <div>
        <label>Content *</label><br/>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isWriter && isPublished}
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
              disabled={isWriter && isPublished}
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
          disabled={isWriter && isPublished}
        >
          <option value="DRAFT">Draft</option>
          <option value="SCHEDULED">Schedule</option>
          {isApproved && (
            <option value="PUBLISHED">✓ Publish Now</option>
          )}
        </select>
      </div>
      <br />

      {status === 'SCHEDULED' && (
        <div>
          <label>Schedule Date *</label><br />
          <input type="date" value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
          />
        </div>
      )}

       {/* ── Action Buttons ────────────────────────── */}
       <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>

      {isWriter && isPublished && null}

      {/* Save Changes */}
      {!(isWriter && isPublished) && (
        <button
          onClick={handleSubmit} disabled={!hasChanges || isPending}>
            {isPending 
              ? (status === 'PUBLISHED' ? 'Publishing...' : 'Saving...')
              : (status === 'PUBLISHED' ? 'Publish Now' : 'Save Changes')
            }
          </button>
      )}


      {/* Send for Approval — enabled only kapag walang unsaved changes */}
      {isWriter && (isNone || isRejected) && !isPublished && (
        <button
          onClick={handleSubmitForApproval}
          disabled={!!hasChanges || isSubmitting}
          title={hasChanges ? 'Save your changes first' : ''}
          >
            {isSubmitting ? 'Sending...' : 'Send for Approval'}
          </button>
      )}
       </div>

       {/* Hint kapag may unsaved changes */}
       {isWriter && (isNone || isRejected) && !!hasChanges && !isPublished && (
        <p style={{ color: 'gray', fontSize: '12px', marginTop: '5px' }}>
          Save your changes first before sending for approval.
        </p>
       )}

       {!hasChanges && initialized && !(isWriter && isPublished) && (
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