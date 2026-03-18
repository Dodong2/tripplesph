import { Router } from "express";
import { requireRole } from "../middleware/auth.middleware.js";
import { 
    getArticles,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle,
    getMyArticles
 } from "../controllers/article.controller.js";

 const router = Router()

 // ── PUBLIC ────────────────────────────────────────────
 router.get("/", getArticles)

 // ── WRITER + ABOVE ────────────────────────────────────
 router.get("/my/articles", 
   requireRole(["writer", "admin", "super_admin"]),
   getMyArticles
 )


 // ── PUBLIC ────────────────────────────────────────────
 router.get("/:id", getArticle)
 

 // ── WRITER + ABOVE ────────────────────────────────────
 router.post("/",
    requireRole(["writer", "admin", "super_admin"]),
    createArticle
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

 export default router