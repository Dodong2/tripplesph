import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import prisma from "../db/prisma.js"
import { NotFoundError, ForbiddenError, BadrequestError } from "../errors/HttpErrors.js"
import { clearCache } from '../middleware/cache.middleware.js'
import { ArticleStatus, Tag } from '../generated/prisma/enums.js'
import { auth } from '../lib/auth.js'
import { fromNodeHeaders } from 'better-auth/node'
import { logActivity } from '../config/ActivityLogger.js'
import { getIO } from '../config/socket.js'

interface IParams extends ParamsDictionary {
    id: string
}

// GET /api/articles?cursor=clx123abc&limit=10
// Public — returns PUBLISHED articles with cursor-based pagination (load more)
export const getArticles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const limit = parseInt(req.query.limit as string) || 10
        const cursor = req.query.cursor as string | undefined
        const tagFilter = req.query.tag as Tag | undefined

        const validTag = tagFilter && Object.values(Tag).includes(tagFilter) ? tagFilter : undefined


        const articles = await prisma.article.findMany({
            where: { 
                approvalStatus: "APPROVED",
                ...(validTag && {
                    tags: { some: { tag: validTag } }
                })
             },
            select: {
                id: true,
                title: true,
                subtitle: true,
                content: true,
                publishedAt: true,
                author: { select: { name: true, image: true } },
                tags: { select: { tag: true } },
            },
            orderBy: { publishedAt: "desc" },
            take: limit + 1,
            ...(cursor && {
                cursor: { id: cursor },
                skip: 1
            })
        })

        const hasMore = articles.length > limit
        const data = hasMore ? articles.slice(0, limit) : articles
        const nextCursor = hasMore ? data[data.length - 1].id : null

        res.status(200).json({
            data,
            nextCursor,
            hasMore
        })
    } catch(err) {
            next(err)
        }
}

// GET /api/articles/:id
// Public — DRAFT/SCHEDULED requires login (writer/admin/super_admin)
export const getArticle = async (req: Request<IParams>, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        
        const article = await prisma.article.findUnique({
            where: { id },
            include: {
                author: { select: { name: true, image: true } },
                tags: { select: { tag: true } },
            }
        })

        if(!article) throw new NotFoundError('Article not found')

        // Users can only see published articles
        if(article.status !== 'PUBLISHED') {
            const session = await auth.api.getSession({
                headers: fromNodeHeaders(req.headers)
            })

            if(!session) throw new ForbiddenError('You do not have access to this article')

            const role = session.user.role as string

            if(role === 'writer' && article.authorId !== session.user.id) {
                throw new ForbiddenError('You do not have access to this article')
            }
        }

        res.status(200).json(article)
    } catch(err) {
        next(err)
    }
}

// POST /api/articles
// Writer/admin/super_admin only
export const createArticle = async (req: Request, res: Response, next: NextFunction) => {   
    try {
        const { title, subtitle, content, status, scheduledAt, tags } = req.body
        const role = req.user!.role as string

        if(!title?.trim()) throw new BadrequestError('Title is required')

        if(!content?.trim()) throw new BadrequestError('Content is required')

        if(!tags?.length) throw new BadrequestError('At least one tag is required')

        const validStatuses = role === 'writer' ? ['DRAFT', 'SCHEDULED'] : ['DRAFT', 'SCHEDULED', 'PUBLISHED']
        const actualStatus = validStatuses.includes(status) ? status : 'DRAFT'
            
        const article = await prisma.article.create({
            data: {
                title,
                subtitle,
                content,    
                status: actualStatus,
                scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
                publishedAt: null,
                authorId: req.user!.id,
                tags: {
                    create: tags?.map((tag: string) => ({ tag })) ?? []
                }
            },
            include: {
                tags: { select: { tag: true } }
            }
        })

        await logActivity('ARTICLE_CREATED', `New article created:: "${article.title}"`, {
            userId: req.user!.id,
            userName: req.user!.name ?? req.user!.email,
            articleId: article.id,
            articleTitle: article.title
        })

        await clearCache('articles')
        await clearCache('search')
        await clearCache('related')

        res.status(201).json(article)
    } catch(err) {
        next(err)
    }
}

// PATCH /api/articles/:id
// Writer — sariling article lang | Admin/super_admin — lahat
export const updateArticle = async (req: Request<IParams>, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const { title, subtitle, content, status, scheduledAt, tags } = req.body
        const role = req.user!.role as string

        const article = await prisma.article.findUnique({
            where: { id }
        })

        if (!article) throw new NotFoundError('Article not found')

        // Writer — pwede lang i-edit ang sariling article
        if (role === 'writer' && article.authorId !== req.user!.id) {
            throw new ForbiddenError('You can only edit your own articles')
        }

        if (role === 'writer' && status === 'PUBLISHED' && article.approvalStatus !== 'APPROVED') {
            throw new ForbiddenError('Article must be approved before publishing')
        }

        const updated = await prisma.article.update({
            where: { id },
            data: {
                ...(title && { title }),
                ...(subtitle !== undefined && { subtitle }),
                ...(content && { content }),
                ...(status && { status }),
                scheduledAt: status === 'SCHEDULED' && scheduledAt
                    ? new Date(scheduledAt)
                    : status !== 'SCHEDULED'
                        ? null
                        : article.scheduledAt,
                publishedAt: status === 'PUBLISHED' && !article.publishedAt
                    ? new Date()
                    : status === 'DRAFT' || status === 'SCHEDULED'
                        ? null
                        : article.publishedAt,
                ...(tags && {
                    tags: {
                        deleteMany: {},
                        create: tags.map((tag: string) => ({ tag }))
                    }
                })
            },
            include: {
                tags: { select: { tag: true } }
            }
        })

        await logActivity('ARTICLE_UPDATED', `Article updated: "${updated.title}"`, {
            userId: req.user!.id,
            userName: req.user!.name ?? req.user!.email,
            articleId: updated.id,
            articleTitle: updated.title
        })

        await clearCache('articles')
        await clearCache('search')
        await clearCache('related')

        res.status(200).json(updated)
    } catch(err) {
        next(err)
    }
}

// DELETE /api/articles/:id
// Admin/super_admin only
export const deleteArticle = async(req: Request<IParams>, res: Response, next: NextFunction) => {
   try {
    const { id } = req.params
    const article = await prisma.article.findUnique({
        where: { id }
    })

    if(!article) throw new NotFoundError('Article not found')

    await prisma.article.delete({ where: { id } })

    await logActivity('ARTICLE_DELETED', `Article deleted ${id}`, {
        userId: req.user!.id,
        articleId: id
    })

    await clearCache('articles')
    await clearCache('search')
    await clearCache('related')
        
    res.status(200).json({ message: 'Article deleted' })
   } catch(err) {
    next(err)
   } 
}

// GET /api/articles/me
// Writer dashboard — sariling articles lang
export const getMyArticles = async (req: Request, res: Response, next: NextFunction) => {
    try {   
            const search = req.query.search as string | undefined
            const limit = parseInt(req.query.limit as string) || 10
            const cursor = req.query.cursor as string | undefined
            const statusFilter = req.query.status as string | undefined
            
            const validStatus = ['DRAFT', "PUBLISHED", "SCHEDULED"].includes(statusFilter as ArticleStatus) 
            ? statusFilter as ArticleStatus 
            : undefined

            const articles = await prisma.article.findMany({
                where: { 
                    authorId: req.user!.id,
                    ...(validStatus && { status: validStatus }),
                    ...(search && {
                        OR: [
                            { title: { contains: search, mode: 'insensitive' } },
                            { subtitle: { contains: search, mode: 'insensitive' } }
                        ]
                    })
                },
                include: {
                    tags: { select: { tag: true } },
                },
                orderBy: { createdAt: "desc" },
                take: limit + 1,
                ...(cursor && {
                    cursor: { id: cursor },
                    skip: 1
                })
            })

            const hasMore = articles.length > limit
            const data = hasMore ? articles.slice(0, limit) : articles
            const nextCursor = hasMore ?  data[data.length -1].id : null


            res.status(200).json({ data, nextCursor, hasMore })
    } catch(err) {
        next(err)
    }
}

// GET /api/articles/search?q=keyword&cursor=xxx&limit=10
// Public — search published articles by title, subtitle, or tag
export const searchArticles = async (req: Request, res: Response, next: NextFunction) => {
    try {
            const q = req.query.q as string | undefined
            const limit = parseInt(req.query.limit as string) || 10
            const cursor = req.query.cursor as string | undefined
            const tagFilter = req.query.tag as Tag

            const validTag = tagFilter && Object.values(Tag).includes(tagFilter) ? tagFilter : undefined

            if(!q || q.trim() === '') {
                return res.status(400).json({ message: 'Search keyword is required'  })
            }

            const articles = await prisma.article.findMany({
                where: {
                        status: 'PUBLISHED',
                        OR: [
                            { title: { contains: q, mode: 'insensitive'} },
                            { subtitle: { contains: q, mode: 'insensitive' } },
                            { content: { contains: q, mode: 'insensitive' } },
                            ...(validTag ? [{
                                tags: {
                                    some: { tag: validTag }
                                }
                            }]: [])
                        ]   
                },
                select: {
                    id: true,
                    title: true,
                    subtitle: true,
                    content: true,
                    publishedAt: true,
                    author: {
                        select: { name: true, image: true }
                    },
                    tags: {
                        select: { tag: true }
                    },
                    _count: {
                        select: {
                            reactions: true,
                            shares: true,
                            views: true
                        }
                    }
                },
                orderBy: { publishedAt: 'desc' },
                take: limit + 1,
                ...(cursor && {
                    cursor: { id: cursor },
                    skip: 1
                })
            })

            const hasMore = articles.length > limit
            const data = hasMore ? articles.slice(0, limit) : articles
            const nextCursor = hasMore ? data[data.length - 1].id : null

            res.status(200).json({ data, nextCursor, hasMore })
    } catch(err) {
        next(err)
    }
}

// GET /api/articles/:id/related
// Public — returns 3 related articles based on same tags
export const getRelatedArticles = async (req: Request<IParams>, res: Response, next: NextFunction) => {
    try {
            const { id } = req.params

            const currentArticle = await prisma.article.findUnique({
                where: { id },
                select: {
                    tags: { select: { tag: true } }
                }
            })

            if(!currentArticle) throw new NotFoundError('Article not found')

            const currentTags = currentArticle.tags.map(t => t.tag)

            if(currentTags.length === 0) {
                return res.status(200).json({ data: [] })
            }

            const related = await prisma.article.findMany({
                where: {
                    status: 'PUBLISHED',
                    id: { not: id },
                    tags: {
                        some: {
                            tag: { in: currentTags }
                        }
                    }
                },
                select: {
                    id: true,
                    title: true,
                    subtitle: true,
                    publishedAt: true,
                    tags: { select: { tag: true } },
                    author: {
                        select: { name: true, image: true }
                    }
                },
                orderBy: { publishedAt: 'desc' },
                take: 3
            })

            res.status(200).json({ data: related })
    } catch(err) {
        next(err)
    }
}

// GET /api/articles/:id/counts
// Public — real-time counts, walang cache
export const getArticleCounts = async (req: Request<IParams>, res: Response, next: NextFunction) => {
    try {
            const { id } = req.params

            const counts = await prisma.article.findUnique({
                where: { id },
                select: {
                    _count: {
                        select: {
                            reactions: true,
                            shares: true,
                            views: true
                        }
                    }
                }
            })

            if(!counts) throw new NotFoundError('Article not found')

            res.status(200).json(counts._count)
    } catch(err) {
        next(err)
    }
}

// POST /api/articles/:id/submit
// Writer only — submit for approval (PUBLISHED status lang)
export const submitForApproval = async (req: Request<IParams>, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const role = req.user!.role as string

        if (role !== 'writer') throw new ForbiddenError('Only writers can submit for approval')
        
        const article = await prisma.article.findUnique({ where: { id } })
        if (!article) throw new NotFoundError('Article not found')
        if (article.authorId !== req.user!.id) throw new ForbiddenError('You can only submit your own articles')

        if (!['DRAFT', 'SCHEDULED'].includes(article.status)) {
            throw new BadrequestError('Only DRAFT or SCHEDULED articles can be submitted for approval')
        }

        if (article.approvalStatus === 'PENDING') throw new BadrequestError('Article is already pending approval')

        const updated = await prisma.article.update({
            where: { id },
            data: {
                approvalStatus: 'PENDING',
                publishedAt: null
            }
        })

        await logActivity('ARTICLE_CREATED', `Article submitted for approval: ${article.title}`, {
            userId: req.user!.id,
            userName: req.user!.name ?? req.user!.email,
            articleId: id,
            articleTitle: article.title
        })

        try {
             const io = getIO()
             io.to('monitoring').emit('approval-request', {
                articleId: id,
                articleTitle: article.title,
                authorName: req.user!.name ?? req.user!.email
             })
        } catch {}

        res.status(200).json(updated)
    } catch(err) {
        next(err)
    }
}

// PATCH /api/articles/:id/approve
// Admin/super_admin only
export const approvalArticle = async (req: Request<IParams>, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const { publishNow = false } = req.body

        const article = await prisma.article.findUnique({ where: { id } })
        if (!article) throw new NotFoundError('Article not found')
        if (article.approvalStatus !== 'PENDING') throw new BadrequestError('Article is not pending approval')
        
        const updated = await prisma.article.update({
            where: { id },
            data: {
                approvalStatus: 'APPROVED',
                approvedBy: req.user!.id,
                approvedAt: new Date(),
                ...(publishNow && {
                    status: 'PUBLISHED',
                    publishedAt: new Date()
                })
            }
        })

        await logActivity('ARTICLE_UPDATED', `Article approved: ${article.title}`, {
            userId: req.user!.id,
            userName: req.user!.name ?? req.user!.email,
            articleId: id,
            articleTitle: article.title
        })

        try {
            const io = getIO()
            io.to(`user-${article.authorId}`).emit('article-approved', {
                articleId: id,
                articleTitle: article.title
            })
        } catch {}

        await clearCache('articles')
        await clearCache('search')
        await clearCache('related')

        res.status(200).json(updated)
    } catch(err) {
        next(err)
    }
}

// PATCH /api/articles/:id/reject
// Admin/super_admin only
export const rejectArticle = async (req: Request<IParams>, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const { reason } = req.body
        
        if (!reason?.trim()) throw new BadrequestError('Rejection reason is required')

        const article = await prisma.article.findUnique({ where: { id } })
        if (!article) throw new NotFoundError('Article not found')
        if (article.approvalStatus !== 'PENDING') throw new BadrequestError('rticle is not pending approval')

        const updated = await prisma.article.update({
            where: { id },
            data: {
                approvalStatus: 'REJECTED',
                rejectionReason: reason,
                status: 'DRAFT'
            }
        })
        
        await logActivity('ARTICLE_UPDATED', `Article rejected: "${article.title}`, {
            userId: req.user!.id,
            userName: req.user!.name ?? req.user!.email,
            articleId: id,
            articleTitle: article.title,
            metadata: { reason }
        })

        try {
            const io = getIO()
            io.to(`user-${article.authorId}`).emit('article-rejected', {
                article: id,
                articleTitle: article.title,
                reason
            })
        } catch {}

        res.status(200).json(updated)
    } catch(err) {
        next(err)
    }
}

// GET /api/articles/pending
// Admin/super_admin only — list ng pending articles
export const getPendingArticles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const articles = await prisma.article.findMany({
            where: { approvalStatus: 'PENDING' },
            include: {
                author: { select: { name: true, email: true, image: true } },
                tags: { select: { tag: true } }
            },
            orderBy: { createdAt: 'asc' }
        })

        res.status(200).json(articles)
    } catch(err) {
        next(err)
    }
}