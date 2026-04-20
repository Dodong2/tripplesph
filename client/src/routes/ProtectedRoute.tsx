import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { Role } from "../types/index.types";

type Props = {
    children: React.ReactNode
    allowedRoles: Role[]
}

const ProtectedRoute = ({ children, allowedRoles }: Props) => {
    const { user, isPending, isLoggedIn } = useAuth()

    if(isPending) return <p>Loading...</p>

    if(!isLoggedIn) return <Navigate to='/' replace/>

    if(!allowedRoles.includes(user!.role)) {
        return <Navigate to='/unauthorized' replace />
    }

    return <>{children}</>
}

export default ProtectedRoute