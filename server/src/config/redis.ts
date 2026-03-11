import { Redis } from 'ioredis'

export const redis = new Redis(process.env.REDIS_URL!)

export const connectRedis = async (): Promise<void> =>  {
 try {
    await redis.set('test_key', 'hello')
    const value = await redis.get('test_key')
    console.log('Redis connected:', value)
 } catch(err) {
    console.error('redis connection error', err)
 }
}