import type { CursorBasedResponse } from "./pagination.types";

export type ArticleStatus = "DRAFT" | "PUBLISHED" | "SCHEDULED"

export type ArticleTag =
    | "FACT" | "FAD" | "FAITH" | "FAMILY" | "FASHION"
    | "FILM" | "FLORA_AND_FAUNA" | "FOOD_FORTUNE"
    | "FUN" | "FUTURE" | "NEWS" | "UNCATEGORIZED"

export type approvalStatus = "NONE" | "PENDING" | "APPROVED" | "REJECTED"


export interface Article {
    id: string
    title: string
    subtitle: string | null
    content: string
    status: ArticleStatus
    scheduledAt: string | null
    publishedAt: string | null
    authorId: string
    author: {
        name: string | null
        image: string | null
    }
    tags: { tag: ArticleTag }[]
    _count?: {
        reactions: number
        shares: number
        views: number
    }
    approvalStatus: approvalStatus
    rejectReason?: string | null
    approvedBy?: string | null
    approvedAt?: string | null
    
    createdAt: string
    updatedAt: string
}

export type ArticleResponse = CursorBasedResponse<Article>

export interface CreateArticleInput {
    title: string
    subtitle?: string
    content: string
    status: ArticleStatus
    scheduleAt?: string
    tags: ArticleTag[]
}

export interface UpdateArticleInput extends Partial<CreateArticleInput> {}

export interface ArticleEngagementCounts {
    reactions: number
    shares: number 
    views: number
}