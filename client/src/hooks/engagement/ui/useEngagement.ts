import { useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { useGetArticle } from "../../article/queries/useGetArticle"
import { useGetRelatedArticles } from "../queries/useGetRelatedArticles"
import { useArticleCounts } from "../queries/useArticleCounts"
import { useReactionStatus } from "../queries/useReactionStatus"
import { useReaction } from "../mutations/useReaction"
import { useShare } from "../mutations/useShare"
import { useView } from "../mutations/useView"

export const useEngagement = () => {
    const { id } = useParams<{ id: string }>()
    
    const { data: article, isLoading, error } = useGetArticle(id!)
    const { data: related, isLoading: relatedLoading } = useGetRelatedArticles(id!)
    const { data: counts } = useArticleCounts(id!)
    const { data: reactionStatus } = useReactionStatus(id!)
    const { react, unreact, isReacting, isUnReacting } = useReaction(id!)
    const { mutate: share, isPending: isSharing, data: shareData } = useShare(id!)
    const { mutate: view } = useView(id!)
    const hasViewed = useRef(false)

    useEffect(() => {
        if (id && !hasViewed.current) {
            hasViewed.current = true
            view()
        }
    }, [id])

    const hasReacted = reactionStatus?.reacted ?? false

    return {
        article, isLoading, error,
        related, relatedLoading,
        counts, reactionStatus,
        react, unreact, isReacting, isUnReacting,
        share, isSharing, shareData,
        view,
        hasReacted
    }
}

