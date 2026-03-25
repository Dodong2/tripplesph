import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteArticle } from "../../../services/article.service"; 

export const useDeleteArticle = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => deleteArticle(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['articles'] })
            queryClient.invalidateQueries({ queryKey: ['my-articles'] })
        }
    })
} 