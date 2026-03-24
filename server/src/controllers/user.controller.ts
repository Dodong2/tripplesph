import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ForbiddenError, NotFoundError, UnauthorizedError } from '../errors/HttpErrors.js'
import prisma from '../db/prisma.js'
import { Role } from '../types/index.js'

interface IParams extends ParamsDictionary {
    id: string
}

// GET /api/users?page=1&limit=10&role=writer
// Admin/super_admin only — via requireRole middleware
// Role Filter & Search & Pagination
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
            const page = parseInt(req.query.page as string) || 1
            const limit = parseInt(req.query.limit as string) || 10
            const skip = (page - 1) * limit
            const roleFilter = req.query.role as Role | undefined
            const search = req.query.search as string | undefined

            const where = {
                ...(roleFilter && { role: roleFilter }),
                ...(search && {
                    OR: [
                        { name: { contains: search, mode: 'insensitive' as const } },
                        { email: { contains: search, mode: 'insensitive' as const } }
                    ]
                })
            }


            const [users, total] = await Promise.all([
                prisma.user.findMany({
                    where,
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        image: true,
                        role: true,
                        banned: true,
                        createdAt: true
                    },
                    orderBy: { createdAt: "desc" },
                    skip,
                    take: limit
                }),
                prisma.user.count({ where })
            ])
        
            res.status(200).json({
                data: users,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                    hasNext: page < Math.ceil(total/ limit),
                    hasPrev: page > 1
                }
            })
    } catch(err) {
        next(err)
    }
}

// PATCH /api/users/:id
// Admin — writer role lang pwedeng i-assign
// Super admin — admin at writer pwedeng i-assign
export const updateUser = async (req:Request<IParams>, res: Response, next: NextFunction) => {
    try {
            const { id } = req.params
            const { name, role } = req.body
            const currentUserRole = req.user!.role as string

            if(role) {
                if(currentUserRole === 'admin' && role !== 'writer') {
                    throw new ForbiddenError('Admin can only assign writer role')
                }
             
                if(role === 'super_admin' && currentUserRole !== 'super_admin') {
                    throw new ForbiddenError('Only super_admin can assign super_admin role')
                }
            }

            const user = await prisma.user.findUnique({ where: { id } })
            if(!user) throw new NotFoundError('User not found')

            const updated = await prisma.user.update({
                where: { id },
                data: {
                    ...(name && { name }),
                    ...(role && { role }),
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    banned: true,
                }
            })

            res.status(200).json(updated)
    } catch(err) {
        next(err)
    }
}

// DELETE /api/users/:id
// Admin/super_admin only
export const deleteUser = async (req: Request<IParams>, res: Response, next: NextFunction) => {
    try {
            const { id } = req.params
            
            if(id === req.user!.id) {
                throw new ForbiddenError('Cannot delete your own account')
            }

            const user = await prisma.user.findUnique({ where: { id } })
            if(!user) throw new NotFoundError('User not found')

            if(user.role === 'super_admin') {
                throw new ForbiddenError('Cannot delete super_admin')
            }

            await prisma.user.delete({ where: { id } })
            res.status(200).json({ message: 'User deleted' })
    } catch(err) {
        next(err)
    }
}