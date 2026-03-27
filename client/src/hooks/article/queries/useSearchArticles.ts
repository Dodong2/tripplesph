import { useInfiniteQuery } from "@tanstack/react-query"
import { searchArticles } from "../../../services/article.service"
import type { CursorBasedParams } from "../../../types/pagination.types"

type SearchParams = CursorBasedParams & { q: string }

export const useSearchArticles = (params: SearchParams) => {
    return useInfiniteQuery({
        queryKey: ['search-articles', params],
        queryFn: ({ pageParam }) =>
            searchArticles({ ...params, cursor: pageParam }),
        initialPageParam: undefined as string | undefined,
        getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
        enabled: !!params.q.trim()
        
    })
}

