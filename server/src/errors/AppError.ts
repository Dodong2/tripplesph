// App Error class template
export class AppError extends Error {
    public readonly statusCode: number
    public readonly isOperational: boolean
    public readonly cause?: unknown

    constructor(message: string, statusCode: number = 500, options?: { cause?: unknown }) {
        super(message)
        this.name = this.constructor.name
        this.statusCode = statusCode
        this.isOperational = true
        this.cause = options?.cause
        
        Object.setPrototypeOf(this, new.target.prototype)

        if(Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}