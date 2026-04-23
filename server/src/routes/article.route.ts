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
    getPendingArticles,
    cancelSubmission,
    archiveArticle,
    getArchivedArticles,
    recoverArticle,
    permanentDeleteArticle,
    permanentDeleteAll
 } from "../controllers/article.controller.js";
 import { cacheMiddleware } from "../middleware/cache.middleware.js";
import { arch } from "node:os";

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

router.get("/trash", 
   requireRole(["admin", "super_admin"]),
   getArchivedArticles
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

router.post("/:id/cancel-submission", 
   requireRole(["writer"]),
   cancelSubmission
)

 // ── ADMIN + ABOVE ONLY ────────────────────────────────


router.delete("/trash/all",
   requireRole(["super_admin"]),
   permanentDeleteAll
)

router.patch("/:id/archive",
   requireRole(["admin", "super_admin"]),
   archiveArticle
)

router.patch("/:id/recover", 
   requireRole(["admin", "super_admin"]),
   recoverArticle
)

router.delete("/:id/permanent",
   requireRole(["super_admin"]),
   permanentDeleteArticle
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