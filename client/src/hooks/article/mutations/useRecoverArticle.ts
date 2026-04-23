import { useMutation, useQueryClient } from "@tanstack/react-query";
import { recoverArticle } from "../../../services/article.service";

export const useRecoverArticle = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => recoverArticle(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['trash'] })
            queryClient.invalidateQueries({ queryKey: ['articles'] })
        }
    })
}