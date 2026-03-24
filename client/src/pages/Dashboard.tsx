import { useGetUsers } from "../hooks/user/queries/useGetUsers"
import { useUserTable } from "../hooks/user/ui/useUserTable"
import { useAuth } from "../hooks/useAuth"
import { signOut } from "./../services/auth.service"
import type { User, Role } from "../types/index.types"

const Dashboard = () => {
    const { user: currentUser } = useAuth()
    const { 
        page, setPage,
        search, handleSearchChange,
        roleFilter, handleRoleFilterChange,
        editingId, editRole, setEditRole,
        startEdit, cancelEdit,
        handleUpdate, handleDelete,
        roleOptions,
        isUpdating, isDeleting
     } = useUserTable()

    const { data, isLoading, error } = useGetUsers({ page, search, role: roleFilter || undefined })
    

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {currentUser?.name}</p>
            <p>Role: {currentUser?.role}</p>
            <button onClick={signOut}>Sign out</button><br />

            <input type="text" placeholder="Search users" value={search} onChange={(e) => {
                handleSearchChange(e.target.value)
                setPage(1)
            }
            } />

            <select value={roleFilter} onChange={(e) => {
                handleRoleFilterChange(e.target.value)
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
                                    data.data.map((user: User) => (
                                        <tr key={user.id}>
                                            <td>{user.name ?? '-'}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                {editingId === user.id ? (
                                                    <select
                                                        value={editRole}
                                                        onChange={(e) => setEditRole(e.target.value as Role)}
                                                    >
                                                        <option value="">Select role</option>
                                                        {roleOptions.map(r => (
                                                            <option key={r} value={r}>{r}</option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    user.role
                                                )}
                                            </td>
                                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                {editingId === user.id ? (
                                                    <>
                                                        <button
                                                            onClick={() => handleUpdate(user.id)}
                                                            disabled={isUpdating || !editRole}
                                                        >
                                                            {isUpdating ? 'Saving...' : 'Save'}
                                                        </button>
                                                        <button onClick={cancelEdit}>
                                                            Cancel
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button onClick={() => {
                                                            startEdit(user.id, user.role)
                                                        }}>
                                                            Edit Role
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(user.id, user.name)}
                                                            disabled={isDeleting}
                                                        >
                                                            {isDeleting ? 'Deleting...' : 'Delete'}
                                                        </button>
                                                    </>
                                                )}
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