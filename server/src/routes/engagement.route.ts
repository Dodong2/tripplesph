import { Router } from "express";
import { requireRole } from "../middleware/auth.middleware.js";
import { addReaction, removeReactions, addShare, addView, getReactionStatus } from "../controllers/engagement.controller.js";

const router = Router({ mergeParams: true })

router.post("/react", requireRole(['user']), addReaction)
router.delete("/react", requireRole(['user']), removeReactions)
router.post("/share", addShare)
router.post("/view", addView)
router.get("/reaction-status", requireRole(['user']), getReactionStatus)

export default router