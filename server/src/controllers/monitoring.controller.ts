import { Request, Response, NextFunction } from "express";
import { getRecentLogs } from "../config/ActivityLogger.js";
import prisma from '../db/prisma.js'

export const getLogs = (req: Request, res: Response) => {
    res.status(200).json(getRecentLogs())
}

export const getStats = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const [
            totalUsers,
            totalArticles,
            publishedArticles,
            totalReactions,
            totalShares,
            totalViews,
            usersByRole
        ] = await Promise.all([
            prisma.user.count(),
            prisma.article.count(),
            prisma.article.count({ where: { status: 'PUBLISHED' } }),
            prisma.reaction.count(),
            prisma.share.count(),
            prisma.view.count(),
            prisma.user.groupBy({
                by: ['role'],
                _count: { role: true }
            })
        ])

        res.status(200).json({
            users: { total: totalUsers, byRole: usersByRole },
            articles: { total: totalArticles, published: publishedArticles },
            engagement: {
                reactions: totalReactions,
                shares: totalShares,
                views: totalViews
            }
        })
    } catch(err) {
        next(err)
    }
}
