import { useQuery } from "@tanstack/react-query"
import { getRelatedArticles } from "../../../services/article.service"

export const useGetRelatedArticles = (id: string) => {
    return useQuery({
        queryKey: ['related-articles', id],
        queryFn: () => getRelatedArticles(id),
        enabled: !!id
    })
}

