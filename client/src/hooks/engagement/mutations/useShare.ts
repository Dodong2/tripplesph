import { useQueryClient, useMutation } from "@tanstack/react-query";
import { addShare } from "../../../services/engagement.service";

export const useShare = (articleId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: () => addShare(articleId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['counts', articleId] })
        }
    })
}