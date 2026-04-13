import { useQuery } from "@tanstack/react-query";
import { getArticle } from "../../../services/article.service";

// ── Single article ────────────────────────────────────
export const useGetArticle = (id: string) => {
    return useQuery({
        queryKey: ['article', id],
        queryFn: () => getArticle(id),
        enabled: !!id,
        staleTime: 0
    })
}