import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth.js";
import { fromNodeHeaders } from "better-auth/node";
import { ForbiddenError, UnauthorizedError } from "../errors/HttpErrors.js";

export const requireRole = (roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const session = await auth.api.getSession({ 
                headers: fromNodeHeaders( req.headers)
            })

            if(!session) throw new UnauthorizedError()
        
            const userRole = session.user.role as string
        
            if(!roles.includes(userRole)) throw new ForbiddenError()
            req.user = session.user;
            next()
        } catch(err) {
            next(err)
        }

    }
}