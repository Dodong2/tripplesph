import { useMutation,  useQueryClient } from "@tanstack/react-query"
import { cancelSubmission } from "../../../services/article.service"
import type { Article } from "../../../types/article.types"

export const useCancelArtcle = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => cancelSubmission(id),
    onSuccess: (updatedArticle: Article, id) => {
        queryClient.setQueryData(['article', id], updatedArticle )
        queryClient.invalidateQueries({ queryKey: ['my-articles'] })
    }
  })
}

