import { Router } from 'express'
import { requireRole } from '../middleware/auth.middleware.js'
import { getUploadAuth, uploadImage, upload } from '../controllers/upload.controller.js'

const router = Router()

router.get('/auth', requireRole(['writer', 'admin', 'super_admin']), getUploadAuth)

router.post(
    '/image',
    requireRole(['writer', 'admin', 'super_admin']),
    upload.single('image'),
    uploadImage
)

export default router