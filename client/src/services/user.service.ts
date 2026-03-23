import { apiClient } from "./api-client";
import type { UserResponse } from "../types/index.types";

export const getUsers = async (page = 1, limit = 10, role?: string, search?: string): Promise<UserResponse> => {
    const params = new URLSearchParams()
    params.append('page', String(page))
    params.append('limit', String(limit))
    if (role) params.append('role', role)
    if (search) params.append('search', search)

    const { data } = await apiClient.get(`/api/users?${params.toString()}`)
    return data
}