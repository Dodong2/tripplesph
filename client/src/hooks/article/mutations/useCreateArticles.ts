import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createArticle } from "../../../services/article.service";
import type { CreateArticleInput, Article } from "../../../types/article.types";

export const useCreateArticle = () => {
    const queryClient = useQueryClient()

    return useMutation<Article, Error, CreateArticleInput>({
        mutationFn: (input: CreateArticleInput) => createArticle(input),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['articles'] })
            queryClient.invalidateQueries({ queryKey: ['my-articles'] })
        } 
    })
}