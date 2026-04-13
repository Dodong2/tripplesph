import { useState } from "react"
import { useGetPendingArticles } from "../../hooks/article/queries/useGetPendingArticles"
import { useApproveArticle } from "../../hooks/article/mutations/useApproveArticle"
import { useRejectArticle } from "../../hooks/article/mutations/useRejectArticle"
import { useApprovalSocket } from "../../hooks/article/socket/useApprovalSocket"
import type { Article } from "../../types/article.types"
import toast from "react-hot-toast"
import { UI_MESSAGES } from "../../errors/message"

const ArticleApproval = () => {
    useApprovalSocket()
    const { data: articles = [], isLoading } = useGetPendingArticles()
    const { approve, isApproving, approveAndPublish, isApprovingAndPublishing } = useApproveArticle()
    const { mutateAsync: rejectMutate, isPending: isRejecting } = useRejectArticle()

    const [rejectingId, setRejectingId] = useState<string | null>(null)
    const [reason, setReason] = useState('')

    const handleReject = (id: string) => {
        if (!reason.trim()) return alert('Rejection reason is required')

        toast.promise(
            new Promise((resolve, reject) =>
                rejectMutate(
                    { id, reason },
                    {
                        onSuccess: (data) => {
                            setRejectingId(null)
                            setReason('')
                            resolve(data)
                        },
                        onError: (err) => reject(err)
                    }
                )
            ),
            {
                loading: 'Rejecting article...',
                success: UI_MESSAGES.success('Article', 'rejected'),
                error: (err: Error) => err.message
            }
        )
    }

    if (isLoading) return <p>Loading pending articles...</p>

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
                                onClick={() => toast.promise(
                                    new Promise((resolve, reject) =>
                                        approve(article.id, {
                                            onSuccess: resolve,
                                            onError: reject
                                        })
                                    ),
                                    {
                                        loading: 'Approving...',
                                        success: UI_MESSAGES.success('Article', 'approved!'),
                                        error: (err: Error) => err.message
                                    }
                                )}
                                disabled={isApproving}
                                style={{ marginRight: '10px', color: 'green' }}
                            >
                                {isApproving ? '...' : '✓ Approve'}
                            </button>

                            <button onClick={() => toast.promise(
                                new Promise((res, rej) => approveAndPublish(article.id, { onSuccess: res, onError: rej })),
                                { loading: 'Approving & Publishing...', success: 'Article approved and published!', error: (e: Error) => e.message }
                            )}  style={{ marginLeft: '5px', color: 'green' }}>
                                🚀 Approve & Publish Now
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