import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers } from "../services/user.service";

export const useUsers = (page = 1, limit = 10, role?: string, search?: string) => {
    return useQuery({
        queryKey: ['users', page, limit, role, search],
        queryFn: () => getUsers(page, limit, role, search)
    })
}