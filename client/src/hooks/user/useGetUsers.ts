import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { getUsers } from "../../services/user.service";
import type { PageBasedParams } from "../../types/index.types"

export const useGetUsers = (params: PageBasedParams = {}) => {
    return useQuery({
        queryKey: ['users', params],
        queryFn: () => getUsers(params),
        placeholderData: keepPreviousData
    })
}