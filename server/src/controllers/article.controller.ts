import { Request, Response, NextFunction } from "express"
import prisma from "../db/prisma.js"
import { NotFoundError, ForbiddenError } from "../errors/HttpErrors.js"

interface IParams {
    id: string
}

// GET /api/articles
// Public — returns all PUBLISHED articles (for blog listing page)
export const getArticles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const article = await prisma.article.findMany({
            where: { status: "PUBLISHED" },
            select: {
                id: true,
                title: true,
                subtitle: true,
                content: true,
                publishedAt: true,
                author: {
                    select: {
                        name: true,
                        image: true
                    }
                }
            },
            orderBy: { publishedAt: "desc" }
        })

        res.json(article)
    } catch(err) {
            next(err)
        }
}

// GET /api/articles/:id
// Public — DRAFT/SCHEDULED requires login (writer/admin/super_admin)
export const getArticle = async (req: Request<IParams>, res: Response, next: NextFunction) => {
    try {
        const { id }: IParams = req.params
        
        const article = await prisma.article.findUnique({
            where: { id },
            include: {
                author: {
                    select: { name: true, image: true }
                }
            }
        })

        if(!article) throw new NotFoundError('Article not found')

        // Users can only see published articles
        if(article.status !== 'PUBLISHED' && !req.user) {
            throw new ForbiddenError('You do not have access to this article')
        }

        res.json(article)
    } catch(err) {
        next(err)
    }
}

// POST /api/articles
// Writer/admin/super_admin only
export const createArticle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, subtitle, content, status, scheduleAt } = req.body

        const article = await prisma.article.create({
            data: {
                title,
                subtitle,
                content,    
                status: status ?? "DRAFT",
                scheduledAt: scheduleAt ? new Date(scheduleAt) : null,
                publishedAt: status === "PUBLISHED" ? new Date() : null,
                authorId: req.user!.id
            }
        })

        res.status(400).json(article)
    } catch(err) {
        next(err)
    }
}

// PATCH /api/articles/:id
// Writer — sariling article lang | Admin/super_admin — lahat
export const updateArticle = async (req: Request<IParams>, res: Response, next: NextFunction) => {
    try {
        const { id }: IParams = req.params
        const { title, subtitle, content, status, scheduleAt } = req.body
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
                title,
                subtitle,
                content,
                status,
                scheduledAt: scheduleAt ? new Date(scheduleAt) : null,
                publishedAt: status === 'PUBLISHED' && !article.publishedAt ? new Date() : article.publishedAt
            }
        })

        res.json(updated)
    } catch(err) {
        console.error('cannot update article!', err)
        res.status(500).json({ message: 'Server error!' })
    }
}

// DELETE /api/articles/:id
// Admin/super_admin only
export const deleteArticle = async(req: Request<IParams>, res: Response, next: NextFunction) => {
   try {
    const { id }: IParams = req.params
    const article = await prisma.article.findUnique({
        where: { id }
    })

    if(!article) throw new NotFoundError('Article not found')

    await prisma.article.delete({ where: { id } })
        
    res.status(200).json({ message: 'Article deleted' })
   } catch(err) {
    next(err)
   } 
}

// GET /api/articles/me
// Writer dashboard — sariling articles lang
export const getMyArticles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const articles = await prisma.article.findMany({
            where: { authorId: req.user!.id },
            orderBy: { createdAt: "desc" }
        })

        res.json(articles)
    } catch(err) {
        next(err)
    }
}