import { useEffect, useState } from "react";
import { socket } from "../../../lib/socket";
import { useQueryClient } from "@tanstack/react-query";
import type { ActivityLog } from "../../../types/index.types";

export const useMonitoringSocket = () => {
   const [isConnected, setIsConnected] = useState(false)
   const queryClient = useQueryClient()

   useEffect(() => {
    socket.connect()
    socket.emit('join-monitring')

    socket.on('connect', () => setIsConnected(true))
    socket.on('disconnect', () => setIsConnected(false))

    socket.on('activity-log', (log: ActivityLog) => {
        queryClient.setQueryData<ActivityLog[]>(
            ['monitoring-logs'],
            (prev = []) => [log, ...prev].slice(0, 100)
        )
    })

    return () => {
        socket.off('connect')
        socket.off('disconnect')
        socket.off('activity-log')
        socket.disconnect()
    }
   }, [queryClient])


   return { isConnected }

}