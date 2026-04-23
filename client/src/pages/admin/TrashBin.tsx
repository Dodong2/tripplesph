import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { useGetTrash } from "../../hooks/article/queries/useGetTrash"
import { useRecoverArticle } from "../../hooks/article/mutations/useRecoverArticle"
import { usePermanentDelete, usePermanentDeleteAll } from "../../hooks/article/mutations/usePermanentDelete"
import type { Article } from "../../types/index.types"

const TrashBin = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const { data: articles, isLoading } = useGetTrash()
    const { mutate: recover, isPending: isRecovering } = useRecoverArticle()
    const { mutate: permanentDelete, isPending: isDeleting } = usePermanentDelete()
    const { mutate: deleteAll, isPending: isDeletingAll } = usePermanentDeleteAll()

    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
    const [selectedIds, setSelectedIds] = useState<string[]>([])

    const isSuperAdmin = user?.role === 'super_admin'

    const toggleSelect = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        )
    }

    const handleDeleteSelected = () => {
        if (!confirm(`Permanently delete ${selectedIds.length} articles?`)) return
        setSelectedIds([])
    }

    const articlesArr = Array.isArray(articles) ? articles : []

    if (isLoading) return <p>Loading trash...</p>

    return (
        <div>
            <h1>🗑️ Trash Bin</h1>

            <button onClick={() => navigate('/admin')}>← Back</button>

            {isSuperAdmin && articlesArr.length > 0 && (
                <div style={{ marginBottom: '10px' }}>
                    <button
                        onClick={() => {
                            if (confirm('Permanently delete ALL archived articles?')) deleteAll()
                        }}
                        disabled={isDeletingAll}
                        style={{ color: 'red', marginRight: '10px' }}
                    >
                        {isDeletingAll ? '...' : '🗑️ Delete All'}
                    </button>

                    {selectedIds.length > 0 && (
                        <button
                            onClick={handleDeleteSelected}
                            disabled={isDeleting}
                            style={{ color: 'red' }}
                        >
                            {isDeleting ? '...' : `🗑️ Delete Selected (${selectedIds.length})`}
                        </button>
                    )}
                </div>
            )}

            {articles?.length === 0 ? (
                <p>Trash bin is empty</p>
            ) : (
                <table border={1} cellPadding={8} cellSpacing={0} style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            {isSuperAdmin && <th>Select</th>}
                            <th>Title</th>
                            <th>Author</th>
                            <th>Archived By</th>
                            <th>Archived At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articlesArr.map((article: Article) => (
                            <tr key={article.id}>
                                {isSuperAdmin && (
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(article.id)}
                                            onChange={() => toggleSelect(article.id)}
                                        />
                                    </td>
                                )}
                                <td>
                                    <span style={{ cursor: 'pointer', color: 'blue' }}
                                        onClick={() => setSelectedArticle(article)}
                                    >
                                        {article.title}
                                    </span>
                                </td>
                                <td>{article.author?.name ?? '—'}</td>
                                <td>{article.archiver?.name ?? '—'}</td>
                                <td>
                                    {article.archivedAt
                                        ? new Date(article.archivedAt).toLocaleDateString()
                                        : '—'
                                    }
                                </td>
                                <td>
                                    <button
                                        onClick={() => recover(article.id)}
                                        disabled={isRecovering}
                                        style={{ marginRight: '5px' }}
                                    >
                                        Recover
                                    </button>

                                    {isSuperAdmin && (
                                        <button
                                            onClick={() => {
                                                if (confirm('Permanently delete this article?')) {
                                                    permanentDelete(article.id)
                                                }
                                            }}
                                            disabled={isDeleting}
                                            style={{ color: 'red' }}
                                        >
                                            Delete
                                        </button>
                                    )}

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {selectedArticle && (
                <div style={{
                    position: 'fixed', top: 0, left: 0,
                    width: '100%', height: '100%',
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'white', padding: '20px',
                        maxWidth: '600px', width: '90%',
                        maxHeight: '80vh', overflow: 'auto',
                        borderRadius: '8px'
                    }}>
                        <button onClick={() => setSelectedArticle(null)}>✕ Close</button>
                        <h2>{selectedArticle.title}</h2>
                        {selectedArticle.subtitle && <h3>{selectedArticle.subtitle}</h3>}
                        <p>By: {selectedArticle.author?.name ?? '—'}</p>
                        <p>Tags: {selectedArticle.tags.map(t => t.tag).join(', ')}</p>
                        <hr/>
                        <p>{selectedArticle.content}</p>
                    </div>
                </div>
            )}


        </div>
    )
}

export default TrashBin