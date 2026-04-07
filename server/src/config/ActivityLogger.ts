import { getIO } from "./socket.js";
import { ActivityType, ActivityLog } from "../types/index.js";

const recentLogs: ActivityLog[] = []
const MAX_LOGS = 100

export const logActivity = async (
    type: ActivityType,
    message: string,
    meta?: Partial<Omit<ActivityLog, 'id' | 'type' | 'type' | 'message' | 'createdAt'>>
) => {
    const log: ActivityLog = {
        id: crypto.randomUUID(),
        type,
        message,
        createdAt: new Date(),
        ...meta
    }

    recentLogs.unshift(log)
    if (recentLogs.length > MAX_LOGS) return recentLogs.pop()

    try {
        const io = getIO()
        io.to('monitoring').emit('activity-log', log)
    } catch {

    }

    return log
} 


export const getRecentLogs = () => [...recentLogs]