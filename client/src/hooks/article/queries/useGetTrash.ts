import { useQuery } from "@tanstack/react-query";
import { getArchivedArticles } from "../../../services/article.service";

export const useGetTrash = () => {
    return useQuery({
        queryKey: ['trash'],
        queryFn: getArchivedArticles
    })
}