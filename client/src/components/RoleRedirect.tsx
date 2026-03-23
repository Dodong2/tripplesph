import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ROLE_DIRECT: Record<string, string> = {
    super_admin: '/admin',
    admin: '/admin',
    writer: '/writer'
}

const RoleDirect = () => {
    const { user, isPending, isLoggedIn } = useAuth()

    if(isPending) return <p>Loading...</p>

    if(!isLoggedIn) return <Navigate to='/' replace />

    const path = ROLE_DIRECT[user!.role] ?? '/'
    return <Navigate to={path} replace/>
}

export default RoleDirect