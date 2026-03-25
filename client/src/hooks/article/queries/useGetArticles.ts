import { useInfiniteQuery } from "@tanstack/react-query";
import { getArticles } from "../../../services/article.service";
import type { CursorBasedParams } from "../../../types/index.types"

export const useGetArticles = (params: CursorBasedParams = {}) => {
    return useInfiniteQuery({
        queryKey: ['articles', params],
        queryFn: ({ pageParam }) => 
            getArticles({ ...params, cursor: pageParam }),
        initialPageParam: undefined as string | undefined,
        getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined
    })
}