import { useQuery } from "@tanstack/react-query";
import { getReactionStatus } from "../../../services/engagement.service";
import { useAuth } from "../../useAuth";

export const useReactionStatus = (articleId: string) => {
    const { user } = useAuth()

    return useQuery({
        queryKey: ['reaction-status', articleId],
        queryFn: () => getReactionStatus(articleId),
        enabled: !!articleId && user?.role === 'user'
    })
}