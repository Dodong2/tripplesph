import { useEffect, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useGetArticle } from "../../hooks/article/queries/useGetArticle"
import { useGetRelatedArticles } from "../../hooks/article/queries/useGetRelatedArticles"
import { useArticleCounts } from "../../hooks/engagement/queries/useArticleCounts"
import { useReactionStatus } from "../../hooks/engagement/queries/useReactionStatus"
import { useReaction } from "../../hooks/engagement/mutations/useReaction"
import { useShare } from "../../hooks/engagement/mutations/useShare"
import { useView } from "../../hooks/engagement/mutations/useView"
import { useAuth } from "../../hooks/useAuth"
import type { Article } from "../../types/index.types"

const ArticleView = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { user, isLoggedIn } = useAuth()

    const { data: article, isLoading, error } = useGetArticle(id!)
    const { data: related, isLoading: relatedLoading } = useGetRelatedArticles(id!)
    const { data: counts } = useArticleCounts(id!)
    const { data: reactionStatus } = useReactionStatus(id!)
    const { react, unreact, isReacting, isUnReacting } = useReaction(id!)
    const { mutate: share, isPending: isSharing, data: shareData } = useShare(id!)
    const { mutate: view } = useView(id!)
    const hasViewed = useRef(false)

    useEffect(() => {
        if(id && !hasViewed.current) {
            hasViewed.current = true
            view()
        }
    }, [id])

    if(isLoading) return <p>Loading article...</p>
    if(error) return <p style={{ color: 'red' }}>{error.message}</p>
    if(!article) return <p>Article not found</p>

    const isUser = user?.role === 'user'
    const hasReacted = reactionStatus?.reacted ?? false

  return (
    <div>
        <button onClick={() => navigate(-1)}>← Back</button>

        <h1>{article.title}</h1>
        {article.subtitle && <h2>{article.subtitle}</h2>}
        
        <div dangerouslySetInnerHTML={{ __html: article.content }}
                style={{ lineHeight: '1.6', marginBottom: '20px' }}
                className="article-content"
            ></div>

        <p>
            By {article.author.name ?? '—'} | {' '}
            {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString()
            : '—'}
        </p>

        <p>Tags: {article.tags.map(t => t.tag).join(', ')} </p>

        <hr/>

        <div>
            <span>❤️ {counts?.reactions ?? 0}</span>
            <span style={{ marginLeft: '10px' }}>🔗 {counts?.shares ?? 0}</span>
            <span style={{ marginLeft: '10px' }}>👁️ {counts?.views ?? 0}</span>
        </div>

        {isUser && (
            <div style={{ marginTop: '10px', cursor: 'pointer' }}>
                <button
                    onClick={() => hasReacted ? unreact() : react()}

                    disabled={isReacting || isUnReacting}
                >
                    {isReacting || isUnReacting 
                    ? '...' 
                    : hasReacted
                    ? "💔 Unreact"
                    : '❤️ React'
                    }
                </button>

            {!isLoggedIn && (
                <p style={{ color: 'gray', fontSize: '12px' }}>
                    Login to react this article.
                </p>
            )}
            </div>
        )}

        <button
                onClick={() => share()}
                disabled={isSharing}
                style={{ marginLeft: '5px' }}
            >
                {isSharing ? '...' : '🔗 Share'}
            </button>

        {shareData?.shareUrl && (
            <div style={{ marginTop: '10px' }}>
                <input readOnly value={shareData.shareUrl}
                    style={{ width: '300px' }}
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                />
                <button onClick={() => {
                    navigator.clipboard.writeText(shareData.shareUrl)
                }}>
                    Copy Link
                </button>
            </div>
        )}


     {related?.data  && related.data.length > 0 && (
        <div style={{ marginTop: '20px' }}>
            <h3>Related Articles</h3>
            {related.data.map((r: Article) => (
                <div key={r.id} style={{ marginBottom: '10px' }}>
                    <p  style={{ cursor: 'pointer', color: 'blue', margin: 0 }}
                        onClick={() => navigate(`/articles/${r.id}`)}
                        >
                            {r.title}
                    </p>
                    {r.subtitle && (
                        <p style={{ fontSize: '12px', margin: 0 }}>{r.subtitle}</p>
                    )}
                    <p style={{ fontSize: '12px', color: 'gray', margin: 0 }}>
                        {r.publishedAt
                            ? new Date(r.publishedAt).toLocaleDateString()
                            : '-'
                        }
                    </p>
                </div>
            ))}
        </div>
     )}

    </div>
  )
}

export default ArticleView