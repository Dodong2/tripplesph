import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addReaction } from "../../../services/engagement.service";

export const useReaction = (articleId: string) => {
    const queryClient = useQueryClient()

    const invalidate = () => {
        queryClient.invalidateQueries({ queryKey: ['counts', articleId] })
    }

    const { mutate: react, isPending: isReacting } = useMutation({
        mutationFn: () => addReaction(articleId),
        onSuccess: invalidate
    })

    const { mutate: unreact, isPending: isUnReacting } = useMutation({
        mutationFn: () => addReaction(articleId)
    })

    return { react, isReacting, unreact, isUnReacting }
}