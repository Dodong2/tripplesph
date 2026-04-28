import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { createServer } from 'http'
import cookieParser from 'cookie-parser'
import { globalErrorHandler } from './middleware/error.middleware.js'
import articleRouter from './routes/article.route.js'
import userRouter from "./routes/user.route.js"
import engagementRouter from "./routes/engagement.route.js"
import monitoringRouter from './routes/monitoring.route.js'
import uploadRouter from './routes/upload.route.js'
import { initSocket } from './config/socket.js'

dotenv.config()

import { connectRedis } from './config/redis.js'
import { connectPostgres } from './config/postgres.js'
import authRouter from './routes/auth.route.js'

const app = express()
const httpServer = createServer(app)

const PORT = process.env.PORT || 3001

initSocket(httpServer)

app.use(express.json())

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

app.use(cookieParser())

// Routes
app.use('/api/auth', authRouter)
app.use('/api/articles', articleRouter)
app.use('/api/users', userRouter)
app.use('/api/articles/:id', engagementRouter)
app.use('/api/monitoring', monitoringRouter)
app.use('/api/upload', uploadRouter)

app.get('/', (_req, res) => {
  res.json({ message: 'TriPPLesPH API running' })
})

// Bootstrap
await connectRedis()
await connectPostgres()

app.use(globalErrorHandler)

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
