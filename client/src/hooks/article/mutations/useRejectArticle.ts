import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rejectArticle } from "../../../services/article.service";

export const useRejectArticle = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, reason }: { id: string, reason: string }) => 
            rejectArticle(id, reason),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pending-articles'] })
        }
    })
}