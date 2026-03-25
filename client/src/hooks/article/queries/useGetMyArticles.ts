import { useInfiniteQuery } from "@tanstack/react-query";
import { getMyArticles } from "../../../services/article.service";
import type { CursorBasedParams } from "../../../types/pagination.types";

export const useGetMyArticles = (params: CursorBasedParams = {}) => {
    return useInfiniteQuery({
        queryKey: ["my-articles", params],
        queryFn: ({ pageParam }) => 
            getMyArticles({ ...params, cursor: pageParam }),
        initialPageParam: undefined as string | undefined,
        getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined
    })
}