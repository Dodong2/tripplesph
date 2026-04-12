import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { socket } from "../../../lib/socket"

const useApprovalSocket = () => {
    const queryClient = useQueryClient()

    useEffect(() => {
        socket.connect()
        socket.emit('join-monitoring')

        socket.on('approval-request', () => {
            queryClient.invalidateQueries({ queryKey: ['pending-articles'] })
        })

        return () => {
            socket.off('approval-request')
            socket.disconnect()
        }
    }, [queryClient])
}

export default useApprovalSocket