import { useState } from "react"
import { useGetPendingArticles } from "../../hooks/article/queries/useGetPendingArticles"
import { useApproveArticle } from "../../hooks/article/mutations/useApproveArticle"
import { useRejectArticle } from "../../hooks/article/mutations/useRejectArticle"
import type { Article } from "../../types/article.types"

const ArticleApproval = () => {
    const { data: articles = [], isLoading } = useGetPendingArticles()
    const { mutate: approve, isPending: isApproving } = useApproveArticle()
    const { mutate: reject, isPending: isRejecting } = useRejectArticle()

    const [rejectingId, setRejectingId] = useState<string | null>(null)
    const [reason, setReason] = useState('')

    const handleReject = (id: string) => {
        if (!reason.trim()) return alert('Rejection reason is required')
        reject(
            { id, reason },
            {
                onSuccess: () => {
                    setRejectingId(null)
                    setReason('')
                },
                onError: (err) => alert(err.message)
            }
        )
    }

    if (isLoading) return <p>Loading pending articles...</p>

    console.log("ARTICLES:", articles)
console.log("TYPE:", typeof articles)

  return (
    <div>
         <h1>Article Approval Queue</h1>
         <p>Pending: {articles.length}</p>

        {articles.length === 0 ? (
            <p>No pending articles.</p>
        ) : (
            articles.map((article: Article) => (
                <div key={article.id} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '10px' }}>
                    <h3>{article.title}</h3>
                    {article.subtitle && <p><em>{article.subtitle}</em></p>}
                    <p>By: {article.author?.name ?? '—'}</p>
                    <p>Tags: {article.tags.map(t => t.tag).join(', ')}</p>
                    <p>Content preview: {article.content.substring(0, 200)}...</p>

                     <div style={{ marginTop: '10px' }}>
                        {/* Approve */}
                        <button
                            onClick={() => approve(article.id)}
                            disabled={isApproving}
                            style={{ marginRight: '10px', color: 'green' }}
                        >
                            {isApproving ? '...' : '✓ Approve'}
                        </button>

                        {/* Reject */}
                        {rejectingId === article.id ? (
                            <div>
                                <textarea placeholder="Reason for rejection..."
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    rows={3}
                                    style={{ width: '300px', display: 'block', marginBottom: '5px' }}
                                    />
                                    <button
                                        onClick={() => handleReject(article.id)}
                                        disabled={isRejecting}
                                        style={{ color: 'red', marginRight: '5px' }}
                                        >
                                            {isRejecting ? '...' : "Confirm Reject"}
                                        </button>
                                        <button onClick={() => { setRejectingId(null), setReason("") }}>
                                            Cancel
                                        </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setRejectingId(article.id)}
                                style={{ color: 'red' }}
                                >
                                    ✗ Reject
                                </button>
                        )}
                     </div>

                </div>
            ))
        )}

    </div>
  )
}

export default ArticleApproval