export type ActivityType =
  | 'USER_LOGIN'
  | 'ARTICLE_CREATED'
  | 'ARTICLE_UPDATED'
  | 'ARTICLE_DELETED'
  | 'USER_ROLE_CHANGED'
  | 'API_ERROR'
  | 'REACTION_ADDED'
  | 'SHARE_ADDED'

export interface ActivityLog {
  id: string
  type: ActivityType
  message: string
  userId?: string
  userName?: string
  articleId?: string
  articleTitle?: string
  metadata?: Record<string, unknown>
  createdAt: string
}

export type RoleCount = {
    role: string
    _count: { role: number }
}