import { getIO } from "./socket.js";
import { ActivityType, ActivityLog } from "../types/index.js";
import prisma from "../db/prisma.js";

const recentLogs: ActivityLog[] = []
const MAX_LOGS = 100

export const logActivity = async (
    type: ActivityType,
    message: string,
    meta?: Partial<Omit<ActivityLog, 'id' | 'type' | 'type' | 'message' | 'createdAt'>>
) => {
   const log = await prisma.activityLog.create({
    data: {
        type,
        message,
        userId: meta?.userId,
        userName: meta?.userName,
        articleId: meta?.articleId,
        articleTitle: meta?.articleTitle,
        metadata: meta?.metadata
    }
   })

   try {
    const io = getIO()
    io.to('monitoring').emit('activity-log', log)
   } catch {

   }

   return log
} 


export const getRecentLogs = () => [...recentLogs]