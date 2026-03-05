import express from 'express'
import dotenv from 'dotenv'
import { Redis } from 'ioredis'
import prisma from './db/prisma.js'


dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: 'TriPPLesPH API running 🚀' })
})

//redis testing connection
const redis = new Redis(process.env.REDIS_URL!);

await redis.set("test_key", "hello");
redis.get("test_key").then((value) => {
    console.log("✅ Redis connected:", value)
})

// prisma postgres connection test
async function testPostgres() {
  try {
    console.log('⏳ Testing Postgres connection...')
    await prisma.$connect()
    console.log('✅ Postgres connected via Prisma') 
  } catch (err) {
    console.error('❌ Postgres connection failed:', err)
  }
}

testPostgres()


//test API connection backend
app.get('/db-test', async (req, res) => {
  try {
    const test = await prisma.testConnection.create({
      data: { message: 'Prisma database working connected 🚀' }
    })
    res.json({
      status: 'success',
      data: test
    })
  } catch(err: any) {
    res.status(500).json({
      statu: "error",
      message: err.message,
      code: err.mode
    })
  }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
