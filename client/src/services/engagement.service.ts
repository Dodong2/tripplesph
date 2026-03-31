import type { ArticleEngagementCounts } from "../types/index.types"
import { apiClient } from "./api-client";

export const addReaction = async (articleId: string) => {
    const { data } = await apiClient.post(`/api/articles/${articleId}/react`)
    return data
}

export const removeReaction = async(articleId: string) => {
    const { data } = await apiClient.delete(`/api/articles/${articleId}/react`)
    return data
} 

export const addShare = async (articleId: string) => {
    const { data } = await apiClient.post(`/api/aricles/${articleId}/share`)
    return data
}

export const addView = async (articleId: string) => {
    const { data } = await apiClient.post(`/api/articles/${articleId}/view`)
    return data
}

export const getArticleCounts = async (articleId: string): Promise<ArticleEngagementCounts> => {
    const { data } = await apiClient.get(`/api/articles/${articleId}/counts`)
    return data 
}