import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { globalErrorHandler } from './middleware/error.middleware.js'

dotenv.config()

import { connectRedis } from './config/redis.js'
import { connectPostgres } from './config/postgres.js'
import authRouter from './routes/auth.route.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())

// CORS
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

// Routes
app.use('/api/auth', authRouter)

app.get('/', (_req, res) => {
  res.json({ message: 'TriPPLesPH API running' })
})

// Bootstrap
await connectRedis()
await connectPostgres()

app.use(globalErrorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
