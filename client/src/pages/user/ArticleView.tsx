import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useGetArticle } from "../../hooks/article/queries/useGetArticle"
import { useArticleCounts } from "../../hooks/engagement/queries/useArticleCounts"
import { useReaction } from "../../hooks/engagement/mutations/useReaction"
import { useShare } from "../../hooks/engagement/mutations/useShare"
import { useView } from "../../hooks/engagement/mutations/useView"
import { useAuth } from "../../hooks/useAuth"

const ArticleView = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { user, isLoggedIn } = useAuth()

    const { data: article, isLoading, error } = useGetArticle(id!)
    const { data: counts } = useArticleCounts(id!)
    const { react, unreact, isReacting, isUnReacting } = useReaction(id!)
    const { mutate: share, isPending: isSharing } = useShare(id!)
    const { mutate: view } = useView(id!, !!id)

    useEffect(() => {
        if(id && isLoggedIn && user?.role === 'user') {
            view()
        }
    }, [id, isLoggedIn, user?.role])

    if(isLoading) return <p>Loading article...</p>
    if(error) return <p style={{ color: 'red' }}>{error.message}</p>
    if(!article) return <p>Article not found</p>

    const isUser = user?.role === 'user'

  return (
    <div>
        <button onClick={() => navigate(-1)}>← Back</button>

        <h1>{article.title}</h1>
        {article.subtitle && <h2>{article.subtitle}</h2>}
        
        <h1 style={{ border: '2px solid red' }}>{article.content}</h1>

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
                    onClick={() => react()}
                    disabled={isReacting}
                >
                    {isReacting ? '...' : '❤️ React'}
                </button>

                <button
                    onClick={() => unreact()}
                    disabled={isUnReacting}
                    style={{ marginLeft: '5px' }}
                >
                    {isUnReacting ? '...' : '💔 Remove React'}
                </button>


            <button
                onClick={() => share()}
                disabled={isSharing}
                style={{ marginLeft: '5px' }}
            >
                {isSharing ? '...' : '🔗 Share'}
            </button>

            {!isLoggedIn && (
                <p style={{ color: 'gray', fontSize: '12px' }}>
                    Login to react and share this article.
                </p>
            )}
            </div>
        )}


    </div>
  )
}

export default ArticleView