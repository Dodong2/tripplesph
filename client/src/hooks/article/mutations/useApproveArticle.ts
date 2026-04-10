import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveArticle } from "../../../services/article.service";

export const useApproveArticle = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => approveArticle(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pending-articles'] })
        }
    })
}