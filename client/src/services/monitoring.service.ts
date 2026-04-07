import { apiClient } from "./api-client";

export const getLogs = async () => {
    const { data } = await apiClient.get('/api/monitoring/logs')
    return data
}

export const getStats = async () => {
    const { data } = await apiClient.get('/api/monitoring/stats')
    return data
}