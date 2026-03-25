import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateArticle } from "../../../services/article.service";
import type { UpdateArticleInput } from "../../../types/article.types";

export const useUpdateArticle = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, input }: { id: string, input: UpdateArticleInput }) => 
            updateArticle(id, input),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['articles'] })
            queryClient.invalidateQueries({ queryKey: ['my-articles'] })
        }
    })
}