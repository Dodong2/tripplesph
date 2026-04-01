import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import  prisma  from '../db/prisma.js'
import { NotFoundError, ForbiddenError, BadrequestError } from "../errors/HttpErrors.js";

interface IParams extends ParamsDictionary {
    id: string
}

const isUserOnly = (role: string) => {
    if(role !== 'user') {
        throw new ForbiddenError('Only users can perform this action')
    }
}

const findArticle = async(id: string) => {
    const article = await prisma.article.findUnique({ where: { id } })
    if(!article) throw new NotFoundError('Article not found')
        return article
}

// POST /api/articles/:id/react
// Users only — mag-heart react
export const addReaction = async (req: Request<IParams>, res: Response, next: NextFunction) => {
    try {
            isUserOnly(req.user!.role as string)
            await findArticle(req.params.id)

            const existing = await prisma.reaction.findUnique({
                where: {
                    articleId_userId: {
                        articleId: req.params.id,
                        userId: req.user!.id
                    }
                }
            })

            if(existing) {
                throw new BadrequestError('Already reacted')
            }

            await prisma.reaction.create({
                data: {
                    articleId: req.params.id,
                    userId: req.user!.id
                }
            })

            const count = await prisma.reaction.count({
                where: { articleId: req.params.id }
            })

            res.status(201).json({ reacted: true, count })
    } catch(err) {
        next(err)
    }
}


// DELETE /api/articles/:id/react
// Users only — mag-remove ng reaction
export const removeReactions = async (req: Request<IParams>, res: Response, next: NextFunction) => {
    try {
            isUserOnly(req.user!.role as string)
            await findArticle(req.params.id)

            const existing = await prisma.reaction.findUnique({
                where: {
                    articleId_userId: {
                        articleId: req.params.id,
                        userId: req.user!.id
                    }
                }
            })

            if(!existing) {
                throw new BadrequestError('No reaction found')
            }

            await prisma.reaction.delete({
                where: {
                    articleId_userId: {
                        articleId: req.params.id,
                        userId: req.user!.id
                    }
                }
            })

            const count = await prisma.reaction.count({
                where: { articleId: req.params.id }
            })

            res.status(200).json({ reacted: false, count })
    } catch(err) {
        next(err)
    }
}

// POST /api/articles/:id/share
// Users only — mag-share
export const addShare = async (req: Request<IParams>, res: Response, next: NextFunction) => {
    try {
            isUserOnly(req.user!.role as string)
            await findArticle(req.params.id)

            const existing = await prisma.share.findUnique({
                where: {
                    articleId_userId: {
                        articleId: req.params.id,
                        userId: req.user!.id
                    }
                }
            })

            if(existing) {
                throw new BadrequestError('Already shared') 
            }

            await prisma.share.create({
                data: {
                    articleId: req.params.id,
                    userId: req.user!.id
                }
            })

            const count = await prisma.share.count({
                where: { articleId: req.params.id }
            })

            res.status(201).json({ shared: true, count })
    } catch(err) {
        next(err)
    }
}

// POST /api/articles/:id/view
// Users only — auto-called kapag nag-open ng article
export const addView = async(req: Request<IParams>, res: Response, next: NextFunction) => {
    try {
        isUserOnly(req.user!.role as string)
        await findArticle(req.params.id)

        const existing = await prisma.view.findUnique({
            where: {
                articleId_userId: {
                    articleId: req.params.id,
                    userId: req.user!.id
                }
            }
        })

        if(!existing) {
            await prisma.view.create({
                data: {
                    articleId: req.params.id,
                    userId: req.user!.id
                }
            })
        }

        const count = await prisma.view.count({
            where: { articleId: req.params.id }
        })
        res.status(200).json({ count })
    } catch(err) {
        next(err)
    }
}

export const getReactionStatus = async (req: Request<IParams>, res: Response, next: NextFunction) => {
    try {
        isUserOnly(req.user!.role as string)

        const existing = await prisma.reaction.findUnique({
            where: {
                articleId_userId: {
                    articleId: req.params.id,
                    userId: req.user!.id
                }
            }
        })

        res.status(200).json({ reacted: !!existing })
    } catch(err) {
        next(err)
    }
}