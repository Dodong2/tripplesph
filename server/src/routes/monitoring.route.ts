import { Router } from "express";
import { requireRole } from "../middleware/auth.middleware.js";
import { getLogs, getStats } from "../controllers/monitoring.controller.js";

const router = Router()

router.get('/logs', requireRole(['super_admin']), getLogs)
router.get('/stats', requireRole(['super_admin']), getStats)

export default router