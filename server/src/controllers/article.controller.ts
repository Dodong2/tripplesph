import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import prisma from "../db/prisma.js"
import { NotFoundError, ForbiddenError, BadrequestError } from "../errors/HttpErrors.js"
import { clearCache } from '../middleware/cache.middleware.js'
import { Tag } from '../generated/prisma/enums.js'
import { auth } from '../lib/auth.js'
import { fromNodeHeaders } from 'better-auth/node'
import { error } from 'node:console'
import { stat } from 'node:fs'

interface IParams extends ParamsDictionary {
    id: string
}

// GET /api/articles?cursor=clx123abc&limit=10
// Public — returns PUBLISHED articles with cursor-based pagination (load more)
export const getArticles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const limit = parseInt(req.query.limit as string) || 10
        const cursor = req.query.cursor as string | undefined

        const articles = await prisma.article.findMany({
            where: { status: "PUBLISHED" },
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

        if(!title?.trim()) {
            throw new BadrequestError('Title is required')
        }

        if(!content?.trim()) {
            throw new BadrequestError('Content is required')
        }

        if(!tags?.length) {
            throw new BadrequestError('At least one tag is required')
        }

        const article = await prisma.article.create({
            data: {
                title,
                subtitle,
                content,    
                status: status ?? "DRAFT",
                scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
                publishedAt: status === "PUBLISHED" ? new Date() : null,
                authorId: req.user!.id,
                tags: {
                    create: tags?.map((tag: string) => ({ tag })) ?? []
                }
            },
            include: {
                tags: { select: { tag: true } }
            }
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

        if(!article) throw new NotFoundError('Article not found')

        // Writer — pwede lang i-edit ang sariling article
        if(role === 'writer' && article.authorId !== req.user!.id) {
            throw new ForbiddenError('You can only edit your own articles')
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
            
            const articles = await prisma.article.findMany({
                where: { 
                    authorId: req.user!.id,
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