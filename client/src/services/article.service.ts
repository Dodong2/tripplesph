import { apiClient } from "./api-client";
import type { Article, ArticleResponse, CreateArticleInput, UpdateArticleInput } from '../types/index.types'
import type { CursorBasedParams } from "../types/index.types";

export const getArticles = async (params: CursorBasedParams = {}): Promise<ArticleResponse> => {
    const { cursor, limit = 10 } = params
    const query = new URLSearchParams()
    query.append('limit', String(limit))
    if (cursor) query.append('cursor', String(cursor))
    
    const { data } = await apiClient.get(`/api/articles?${query.toString()}`)
    return data
}

export const getMyArticles = async (params: CursorBasedParams ={}): Promise<ArticleResponse> => {
    const { cursor, limit = 10, search } = params
    const query = new URLSearchParams()
    query.append('limit', String(limit))
    if(cursor) query.append('cursor', String(cursor))
    if(search) query.append('search', search)

    const { data } = await apiClient.get(`/api/articles/my/articles?${query.toString()}`)
    return data
}

export const createArticle = async (input: CreateArticleInput): Promise<Article> => {
    const { data } = await apiClient.post('/api/articles', input)
    return data
}

export const updateArticle = async (id: string, input: UpdateArticleInput): Promise<Article> => {
    const { data } = await apiClient.patch(`/api/articles/${id}`, input)
    return data
}

export const deleteArticle = async (id: string): Promise<void> => {
    await apiClient.delete(`/api/articles/${id}`)  
}