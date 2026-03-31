import Login from "./Login"
import { useGetArticles } from "../hooks/article/queries/useGetArticles"
import type { Article } from "../types/article.types"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const navigate = useNavigate()

    const 
    { 
        data: allArticles,
        isLoading: allLoading,
        fetchNextPage: fetchMoreAll,
        hasNextPage: hasMoreAll
    } = useGetArticles()

    return (
        <div>
            <h1>TripplesPH</h1>
            <p>Welcome to TripplesPH</p>
            <a href="/blogs">Read Articles</a>
            <Login/>

            {allLoading && <p>Loading</p>}
            {allArticles?.pages.flatMap(p => p.data).map((article: Article) => (
                <div key={article.id}>
                    <p style={{ cursor: 'pointer', color: 'blue' }}
                        onClick={() => navigate(`articles/${article.id}`)}
                    >{article.title}</p>
                </div>
            ))}

            {hasMoreAll && (
                <button onClick={() => fetchMoreAll()}>Load More</button>
            )}
        </div>
    )
}

export default Home