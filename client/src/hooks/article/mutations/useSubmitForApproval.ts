import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitForApproval } from "../../../services/article.service";

export const useSubmitForApproval = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => submitForApproval(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-articles'] })
        }
    })
}