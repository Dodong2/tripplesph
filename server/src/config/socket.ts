import { Server } from "socket.io";
import { Server as HttpServer } from 'http'

let io: Server

export const initSocket = (httpServer: HttpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: process.env.CLIENT_URL!,
            methods: ['GET', 'POST'],
            credentials: true
        }
    })

    io.on('connection', (socket) => {
        console.log(`Socket connected: ${socket.id}`)

        socket.on('join-monitoring', () => {
            socket.join('monitoring')
            console.log(`${socket.id} joined monitoring room`)
        })

        socket.on('join-user', (userId: string) => {
            socket.join(`user-${userId}`)
            console.log(`${socket.id} joined user room: user-${userId}`)
        })

        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id}`)
        })
    })

    return io
}

export const getIO = () => {
    if (!io) throw new Error('Socket.IO not initialized')
        return io
}