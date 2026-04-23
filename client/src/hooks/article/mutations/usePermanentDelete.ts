import { useMutation, useQueryClient } from "@tanstack/react-query";
import { permanentDeleteArticle, permanentDeleteAll } from "../../../services/article.service";

export const usePermanentDelete = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => permanentDeleteArticle(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['trash'] })
        }
    })
}

export const usePermanentDeleteAll = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => permanentDeleteAll(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['trash'] })
        }
    })
}