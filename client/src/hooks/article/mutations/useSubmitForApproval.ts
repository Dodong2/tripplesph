import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitForApproval } from "../../../services/article.service";
import type { Article } from "../../../types/article.types";

export const useSubmitForApproval = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => submitForApproval(id),
        onSuccess: (updatedArticle: Article, id) => {
            queryClient.setQueryData(['article', id], updatedArticle)
            queryClient.invalidateQueries({ queryKey: ['my-articles'] })
        }
    })
}