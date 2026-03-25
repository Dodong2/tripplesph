export interface PageBasedParams {
    page?: number
    limit?: number
    search?: string
    role?: string
}

export interface CursorBasedParams {
    cursor?: string
    limit?: number
    search?: string
    tag?: string
}

export interface PageBaseMeta {
    total: string
    page: number
    limit: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
}

export interface CursorBasedMeta {
    nextCursor: string | null
    hasMore: boolean
}

export interface PageBasedResponse<T> {
    data: T[]
    pagination: PageBaseMeta
}

export interface CursorBasedResponse<T> {
    data: T[]
    nextCursor: string | null
    hasMore: boolean
}