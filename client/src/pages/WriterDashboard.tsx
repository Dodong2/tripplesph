import { useAuth } from "../hooks/useAuth"
import { signOut } from "../services/auth.service"
import { useGetArticles } from "../hooks/article/queries/useGetArticles"
import { useGetMyArticles } from "../hooks/article/queries/useGetMyArticles"
import { useDeleteArticle } from "../hooks/article/mutations/useDeleteArticles"
import { useNavigate } from "react-router-dom"
import type { Article } from "../types/index.types"

const WriterDashboard = () => {
    const { user } = useAuth()
    const navigate = useNavigate()

    const { data: myData, isLoading: myLoading, fetchNextPage: fetchMoreMine, hasNextPage: hasMoreMine } = useGetMyArticles()
    const { data: allData, isLoading: allLoading, fetchNextPage: fetchMoreAll, hasNextPage: hasMoreAll } = useGetArticles()
    const { mutate: remove, isPending: isDeleting } = useDeleteArticle()

    const handleDelete = (id: string) => {
        if(!confirm('Delete this article?')) return
        remove(id, {
            onError: (err) => alert(err.message)
        })
    }

    return (
        <div>
            <h1>Writer Dashboard</h1>
            <p>Welcome, {user?.name}</p>
            <p>Role: {user?.role}</p>
            <button onClick={signOut}>Sign out</button>
            <button onClick={() => navigate('/writer/create')}>+ Create Article</button>

            <h2>My Articles</h2>
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
          {myData?.pages.flatMap(p => p.data).map((article: Article) => (
            <tr key={article.id}>
              <td>{article.title}</td>
              <td>{article.status}</td>
              <td>{article.publishedAt
                ? new Date(article.publishedAt).toLocaleDateString()
                : '—'}
              </td>
              <td>{article.tags.map(t => t.tag).join(', ')}</td>
              <td>
                <button onClick={() => navigate(`/writer/edit/${article.id}`)}>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(article.id)}
                  disabled={isDeleting}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {hasMoreMine && (
        <button onClick={() => fetchMoreMine()}>Load More</button>
      )}


      <h2>All Published Articles</h2>
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
              <td>{article.tags.map(t => t.tag).join(', ')}</td>
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