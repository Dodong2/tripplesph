import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth.js";
import { fromNodeHeaders } from "better-auth/node";

export const requireRole = (roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const session = await auth.api.getSession({ 
            headers: fromNodeHeaders( req.headers)
         })

        if(!session) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        
        const userRole = session.user.role as string
        
        if(!roles.includes(userRole)) {
            return res.status(403).json({ message: "Forbidden" })
        }

        req.user = session.user;
        next()
    }
}