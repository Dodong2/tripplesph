import { Router } from 'express'
import { requireRole } from '../middleware/auth.middleware.js'
import { getAllUsers, updateUser, deleteUser } from '../controllers/user.controller.js'

const router = Router()

// Admin + super_admin — role check nasa middleware na
router.get("/", requireRole(["admin", "super_admin"]), getAllUsers)
router.patch("/:id", requireRole(["admin", "super_admin"]), updateUser)
router.delete("/:id", requireRole(["admin", "super_admin"]), deleteUser)

export default router