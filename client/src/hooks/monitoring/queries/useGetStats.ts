import { useQuery } from "@tanstack/react-query";
import { getStats } from "../../../services/monitoring.service";

export const useGetStats = () => {
    return useQuery({
        queryKey: ['monitoring-stats'],
        queryFn: getStats,
        refetchOnWindowFocus: false
    })
}