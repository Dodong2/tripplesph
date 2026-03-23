import { useAuth } from "../hooks/useAuth"
import { signOut } from "./../services/auth.service"

const Dashboard = () => {
    const { user } = useAuth()

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {user?.name}</p>
            <p>Role: {user?.role}</p>
            <button onClick={signOut}>Sign out</button>
        </div>
    )
}

export default Dashboard