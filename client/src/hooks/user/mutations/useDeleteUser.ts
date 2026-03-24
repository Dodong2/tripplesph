import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteUser } from "../../../services/user.service"

export const useDeleteUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
        }
    })
}

