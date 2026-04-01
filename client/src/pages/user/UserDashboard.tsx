import type { Article } from "../../types/index.types"
import { useAuth } from "../../hooks/useAuth"
import { signOut } from "../../services/auth.service"
import { useGetArticles } from "../../hooks/article/queries/useGetArticles"
import { useNavigate } from "react-router-dom"

const UserDashboard = () => {
    const { user: currentUser } = useAuth()
    const navigate = useNavigate()
    const { 
        data: allArticles,
        isLoading: allLoading,
        fetchNextPage: fetchMoreAll,
        hasNextPage: hasMoreAll
     } = useGetArticles()

  return (
    <div>
        <h1>Articles for users</h1>

        <h3>Name: {currentUser?.name}</h3>
        <h4>Role: {currentUser?.role}</h4>
        <button onClick={signOut}>Sign out</button>
        {allLoading && <p>Loading article...</p>}
        {allArticles?.pages.flatMap(p => p.data).map((article: Article) => (
            <div key={article.id}>
                <p style={{ cursor: 'pointer', color: 'blue' }}
                        onClick={() => navigate(`/articles/${article.id}`)}
                    >{article.title}</p>
            </div>
        ))}

        {hasMoreAll && (
                <button onClick={() => fetchMoreAll()}>Load More</button>
            )}
    </div>
  )
}

export default UserDashboard