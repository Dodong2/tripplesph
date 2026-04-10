import { Router } from "express";
import { requireRole } from "../middleware/auth.middleware.js";
import { 
    getArticles,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle,
    getMyArticles,
    searchArticles,
    getRelatedArticles,
    getArticleCounts,
    submitForApproval,
    approvalArticle,
    rejectArticle,
    getPendingArticles
 } from "../controllers/article.controller.js";
 import { cacheMiddleware } from "../middleware/cache.middleware.js";

 const router = Router()

 // ── PUBLIC ────────────────────────────────────────────
 router.get("/", cacheMiddleware('articles', 300), getArticles)
 router.get("/search", cacheMiddleware('search'),searchArticles)

 // ── WRITER + ABOVE ────────────────────────────────────
 router.get("/my/articles", 
   requireRole(["writer", "admin", "super_admin"]),
   getMyArticles
 )

 // ── PENDING — admin/super_admin ──────────────────────
router.get("/pending", 
   requireRole(["admin", "super_admin"]),
   getPendingArticles
)


 // ── PUBLIC ────────────────────────────────────────────
 router.get("/:id", cacheMiddleware('articles', 300), getArticle)
 router.get('/:id/related', cacheMiddleware('related', 300), getRelatedArticles)
 router.get('/:id/counts', getArticleCounts)
 

 // ── WRITER + ABOVE ────────────────────────────────────
 router.post("/",
    requireRole(["writer", "admin", "super_admin"]),
    createArticle
 )

 // ── SUBMIT FOR APPROVAL — writer only ────────────────
router.post("/:id/submit",
   requireRole(["writer"]),
   submitForApproval
)

 router.patch("/:id",
    requireRole(["writer", "admin", "super_admin"]),
    updateArticle
 )

 // ── ADMIN + ABOVE ONLY ────────────────────────────────
 router.delete("/:id",
   requireRole(["admin", "super_admin"]),
   deleteArticle
 )



// ── APPROVE / REJECT — admin/super_admin ─────────────
router.patch("/:id/approve",
   requireRole(["admin", "super_admin"]),
   approvalArticle
)

router.patch("/:id/reject", 
   requireRole(["admin", "super_admin"]),
   rejectArticle
)

 export default router