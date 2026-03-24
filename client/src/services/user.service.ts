import { apiClient } from "./api-client";
import type { UserResponse, PageBasedParams } from "../types/index.types";

export const getUsers = async (params: PageBasedParams = {}): Promise<UserResponse> => {
    const { page = 1, limit = 10, role, search  } = params

    const query = new URLSearchParams()
    query.append('page', String(page))
    query.append('limit', String(limit))
    if (role) query.append('role', role)
    if (search) query.append('search', search)

    const { data } = await apiClient.get(`/api/users?${query.toString()}`)
    return data
}