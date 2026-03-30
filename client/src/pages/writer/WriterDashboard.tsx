import { useAuth } from "../../hooks/useAuth"
import { signOut } from "../../services/auth.service"
import { useGetArticles } from "../../hooks/article/queries/useGetArticles"
import { useGetMyArticles } from "../../hooks/article/queries/useGetMyArticles"
import { useNavigate } from "react-router-dom"
import type { Article } from "../../types/index.types"
import { useWriterDashboard } from "../../hooks/article/ui/useWriterDashboard"

const WriterDashboard = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const {
        TAGS, STATUS_OPTIONS,
        searchInput, setSearchInput,
        activeSearch,
        statusFilter, setStatusFilter,
        tagFilter, setTagFilter,
        handleDelete, isDeleting,
        handleSearch,
        handleClear,
    } = useWriterDashboard()

    const {
        data: myData,
        isLoading: myLoading,
        fetchNextPage: fetchMoreMine,
        hasNextPage: hasMoreMine
    } = useGetMyArticles({
        search: activeSearch || undefined,
        status: statusFilter || undefined
    })

    const {
        data: allData,
        isLoading: allLoading,
        fetchNextPage: fetchMoreAll,
        hasNextPage: hasMoreAll
    } = useGetArticles({ tag: tagFilter || undefined })

    return (
        <div>
            <h1>Writer Dashboard</h1>
            <p>Welcome, {user?.name}</p>
            <p>Role: {user?.role}</p>
            <button onClick={signOut}>Sign out</button>
            <button onClick={() => navigate('/writer/create')}>+ Create Article</button>

            <h2>My Articles</h2>

            <div>
                <input type="text"
                    placeholder="Search my articles..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button onClick={handleSearch}>Search</button>

                {/* Status filter buttons */}
                <span style={{ marginLeft: '10px' }}>
                    <button
                        onClick={() => setStatusFilter('')}
                        style={{ fontWeight: !statusFilter ? 'bold' : 'normal' }}>
                        ALL
                    </button>
                    {STATUS_OPTIONS.map(s => (
                        <button
                            key={s}
                            onClick={() => setStatusFilter(s)}
                            style={{ fontWeight: statusFilter === s ? 'bold' : 'normal' }}>
                            {s}
                        </button>

                    ))}
                </span>

                {activeSearch && (
                    <button onClick={handleClear}>Clear</button>
                )}
            </div>

            {myLoading && <p>Loading...</p>}

            <table border={1} cellPadding={8} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Published</th>
                        <th>Tags</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {myData?.pages.flatMap(p => p.data).length === 0 ? (
                        <tr><td colSpan={5}>No articles found</td></tr>
                    ) : (
                        myData?.pages.flatMap(p => p.data).map((article: Article) => (
                            <tr key={article.id}>
                                <td>{article.title}</td>
                                <td>{article.status}</td>
                                <td>{article.publishedAt
                                    ? new Date(article.publishedAt).toLocaleDateString()
                                    : '—'}
                                </td>
                                <td>{article.tags?.map(t => t.tag).join(', ') ?? '—'}</td>
                                <td>
                                    <button onClick={() => navigate(`/writer/edit/${article.id}`)}>
                                        view
                                    </button>
                                    {(user?.role === 'admin' || user?.role === 'super_admin') && (
                                        <button
                                            onClick={() => handleDelete(article.id)}
                                            disabled={isDeleting}
                                        >
                                            Delete
                                        </button>

                                    )}

                                </td>
                            </tr>
                        )))}
                </tbody>
            </table>
            {hasMoreMine && (
                <button onClick={() => fetchMoreMine()}>Load More</button>
            )}


            <h2>All Published Articles</h2>

            <div>
                <button
                    onClick={() => setTagFilter('')}
                    style={{ fontWeight: !tagFilter ? 'bold' : 'normal' }}
                >
                    All Tags
                </button>
                {TAGS.map(tag => (
                    <button key={tag} onClick={() => setTagFilter(tag)}
                        style={{ fontWeight: tagFilter === tag ? 'bold' : 'normal' }}>
                        {tag}
                    </button>
                ))}
            </div>

            {allLoading && <p>Loading...</p>}

            <table border={1} cellPadding={8} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Published</th>
                        <th>Tags</th>
                    </tr>
                </thead>
                <tbody>
                    {allData?.pages.flatMap(p => p.data).map((article: Article) => (
                        <tr key={article.id}>
                            <td>{article.title}</td>
                            <td>{article.author.name ?? '—'}</td>
                            <td>{article.publishedAt
                                ? new Date(article.publishedAt).toLocaleDateString()
                                : '—'}
                            </td>
                            <td>{article.tags?.map(t => t.tag).join(', ') ?? '—'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {hasMoreAll && (
                <button onClick={() => fetchMoreAll()}>Load More</button>
            )}
        </div>
    )
}

export default WriterDashboard