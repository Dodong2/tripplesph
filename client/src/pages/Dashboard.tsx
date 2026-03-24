import { useState } from "react"
import { useGetUsers } from "../hooks/user/useGetUsers"
import { useAuth } from "../hooks/useAuth"
import { signOut } from "./../services/auth.service"

const Dashboard = () => {
    const { user } = useAuth()
    const [page, setPage] = useState(1)
    const [roleFilter, setRoleFilter] = useState('')
    const [search, setSearch] = useState('')
    const { data, isLoading, error } = useGetUsers({ page, search, role: roleFilter || undefined })

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {user?.name}</p>
            <p>Role: {user?.role}</p>
            <button onClick={signOut}>Sign out</button><br />

            <input type="text" placeholder="Search users" value={search} onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
            }
            } />

            <select value={roleFilter} onChange={(e) => {
                setRoleFilter(e.target.value)
                setPage(1)
            }}>
                <option value="">All Roles</option>
                <option value="user">User</option>
                <option value="writer">Writer</option>
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
            </select>

            <div>
                {isLoading && <p>loading users</p>}
                {error && <p>Error: {error.message}</p>}

                {data && (
                    <>
                        <table border={1} cellPadding={8} cellSpacing={0}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Joined</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={6}>No users found</td>
                                    </tr>
                                ) : (
                                    data.data.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.name ?? '-'}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                <button>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}

                            </tbody>
                        </table>
                    </>)}

                <div>
                    <button disabled={!data?.pagination.hasPrev} onClick={() => setPage(p => p - 1)}>
                        Previous
                    </button>
                    <p>Page {data?.pagination.page} of {data?.pagination.totalPages}</p>
                    <button disabled={!data?.pagination.hasNext} onClick={() => setPage(p => p + 1)}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard