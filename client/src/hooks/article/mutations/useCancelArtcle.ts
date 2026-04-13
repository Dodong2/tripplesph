import { useMutation,  useQueryClient } from "@tanstack/react-query"
import { cancelSubmission } from "../../../services/article.service"

export const useCancelArtcle = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => cancelSubmission(id),
    onSuccess: (_, id) => {
        queryClient.invalidateQueries({ queryKey: ['article', id] })
        queryClient.invalidateQueries({ queryKey: ['my-articles'] })
    }
  })
}

