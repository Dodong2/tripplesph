// Global error handler
import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";

export const globalErrorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    // Known (operational) errors
    if(err instanceof AppError) {

        if (err.cause) console.error(`[${err.name}]`, err.cause)
            
        return res.status(err.statusCode).json({
            message: err.message,
        })
    }

    // Unknown errors (programmer errors)
    console.error("UNEXPECTED ERROR:", err)

    return res.status(500).json({
        message: "Internal Server Error"
    })

}