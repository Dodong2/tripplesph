import { useQuery } from "@tanstack/react-query";
import { getPendingArticles } from "../../../services/article.service";

export const useGetPendingArticles = () => {
    return useQuery({
        queryKey: ['pending-articles'],
        queryFn: getPendingArticles
    })
}