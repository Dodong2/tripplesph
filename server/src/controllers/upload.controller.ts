import { Request, Response, NextFunction } from "express";
import { getImageKitauth, imagekit } from "../config/imagekit.js";
import multer from 'multer'
import { url } from "node:inspector";


// Memory storage — hindi nag-save sa disk
const storage = multer.memoryStorage()
export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
        if (allowed.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }
})

// GET /api/upload/auth — para sa client-side upload
export const getUploadAuth = (req: Request, res: Response) => {
    const auth = getImageKitauth()
    res.json(auth)
}

// GET /api/upload/auth — para sa client-side upload
export const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.file) {
            return res.status(400).json({ message: 'No file uploaded or invalid file type. Allowed: jpg, png, webp, gif' })
        }

        const result = await imagekit.upload({
            file: req.file.buffer,
            fileName: `${Date.now()}-${req.file.originalname.replace(/\s+/g, '-')}`,
            folder: '/tripplesph/articles',
            useUniqueFileName: true,
        })

        res.status(201).json({
            url: result.url,
            fileId: result.fileId,
            name: result.name,
            width: result.width,
            height: result.height
        })
    } catch(err) {
        next(err)
    }
}