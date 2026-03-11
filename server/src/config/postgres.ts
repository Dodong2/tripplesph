import prisma from '../db/prisma.js'

export const connectPostgres = async (): Promise<void> => {
    try {
        await prisma.$connect()
        console.log('Postgres connected via Prisma')
    } catch(err) {
        console.error('Postgres connection failed:', err)
    }
}