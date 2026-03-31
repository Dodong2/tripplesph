import { useQuery } from "@tanstack/react-query";
import { getArticleCounts } from "../../../services/engagement.service";

export const useArticleCounts = (articleId: string) => {
    return useQuery({
        queryKey: ['counts', articleId],
        queryFn: () => getArticleCounts(articleId),
        enabled: !!articleId
    })
}