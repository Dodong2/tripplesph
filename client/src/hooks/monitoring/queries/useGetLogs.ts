import { useQuery } from "@tanstack/react-query";
import { getLogs } from "../../../services/monitoring.service";

export const useGetLogs = () => {
    return useQuery({
        queryKey: ['monitoring-logs'],
        queryFn: getLogs,
        refetchOnWindowFocus: false
    })
}
