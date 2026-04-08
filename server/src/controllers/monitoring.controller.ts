import { Request, Response, NextFunction } from "express";
import { getRecentLogs } from "../config/ActivityLogger.js";
import prisma from '../db/prisma.js'

// GET /api/monitoring/logs
// Super admin only — last 100 logs, 30 days retention
export const getLogs = async(req: Request, res: Response, next: NextFunction) => {
   try {
        const thirdyDaysAgo = new Date()
        thirdyDaysAgo.setDate(thirdyDaysAgo.getDate() - 30)

        const logs = await prisma.activityLog.findMany({
            where: {
                createdAt: { gte: thirdyDaysAgo }
            },
            orderBy: { createdAt: 'desc' },
            take: 100
        })

        res.status(200).json(logs)
   } catch (err) {
    next(err)
   }
}


// GET /api/monitoring/stats
// Super admin only — overall stats
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
