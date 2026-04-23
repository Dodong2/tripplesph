import { useMutation, useQueryClient } from "@tanstack/react-query";
import { archiveArticle } from "../../../services/article.service";

export const useArchiveArticle = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => archiveArticle(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['articles'] })
            queryClient.invalidateQueries({ queryKey: ['mu-articles'] })
            queryClient.invalidateQueries({ queryKey: ['trash'] })
        }
    })
}