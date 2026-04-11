import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveArticle } from "../../../services/article.service";

export const useApproveArticle = () => {
    const queryClient = useQueryClient()
    const invalidate = () => {
        queryClient.invalidateQueries({ queryKey: ['pending-articles'] })
        queryClient.invalidateQueries({ queryKey: ['articles'] })
    }

    const approve = useMutation({
        mutationFn: (id: string) => approveArticle(id, false),
        onSuccess: invalidate
    })

    const approveAndPublish = useMutation({
        mutationFn: (id: string) => approveArticle(id, true),
        onSuccess: invalidate
    })

    return {
        approve: approve.mutate,
        isApproving: approve.isPending,
        approveAndPublish: approveAndPublish.mutate,
        isApprovingAndPublishing: approveAndPublish.isPending
    }
}