import { useGetUsers } from "../../hooks/user/queries/useGetUsers"
import { useUserTable } from "../../hooks/user/ui/useUserTable"
import { useAuth } from "../../hooks/useAuth"
import { useGetStats } from "../../hooks/monitoring/queries/useGetStats"
import { useApprovalSocket } from "../../hooks/article/socket/useApprovalSocket"
import { useGetPendingArticles } from "../../hooks/article/queries/useGetPendingArticles"
import { signOut } from "../../services/auth.service"
import type { User, Role, RoleCount } from "../../types/index.types"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
    const { user: currentUser } = useAuth()
    const navigate = useNavigate()
    const {
        page, setPage,
        search, handleSearchChange,
        roleFilter, handleRoleFilterChange,
        editingId, editRole, setEditRole,
        startEdit, cancelEdit,
        handleUpdate, handleDelete,
        roleOptions,
        isUpdating, isDeleting,
        canEditRole, canDelete
    } = useUserTable()
     useApprovalSocket()
    const { data: articles = [] } = useGetPendingArticles()

    const totalPending = articles.length

    const { data: stats } = useGetStats()

    const { data, isLoading, error } = useGetUsers({ page, search, role: roleFilter || undefined })


    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {currentUser?.name}</p>
            <p>Role: {currentUser?.role}</p>
            <button onClick={signOut}>Sign out</button><br /><br />
            {currentUser?.role === 'super_admin' && (
                <button onClick={() => navigate('/admin/monitoring')}>
                    Monitoring Dashboard
                </button>
            )}

            <button onClick={() => navigate('/admin/approvals')}
                style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
                Article Approvals {totalPending > 0 && (
                    <span style={{
                        background: 'red',
                        color: 'white',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        fontSize: '11px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                    }}>
                        {totalPending}
                    </span>
                )}
            </button><br />

            <br />

            {/* ── Stats ───────────────────────────────── */}
            {stats && (
                <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                    <div style={{ border: '1px solid #ccc', padding: '10px' }}>
                        <h3>Users</h3>
                        <p>Total: {stats.users.total}</p>
                        {stats.users.byRole.map((r: RoleCount) => (
                            <p key={r.role}>{r.role}: {r._count.role}</p>
                        ))}
                    </div>

                    <div style={{ border: '1px solid #ccc', padding: '10px' }}>
                        <h3>Articles</h3>
                        {/* <p>Total: {stats.articles.total}</p> */}
                        <p>Published: {stats.articles.published}</p>
                    </div>

                    <div style={{ border: '1px solid #ccc', padding: '10px' }}>
                        <h3>Engagement (summary)</h3>
                        <p>❤️ Reactions: {stats.engagement.reactions}</p>
                        <p>🔗 Shares: {stats.engagement.shares}</p>
                        <p>👁️ Views: {stats.engagement.views}</p>
                    </div>
                </div>
            )}

            <br />


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
                                                        {canEditRole({ id: user.id, role: user.role }) && (
                                                            <button onClick={() => {
                                                                startEdit(user.id, user.role)
                                                            }}
                                                            >
                                                                Edit Role
                                                            </button>
                                                        )}
                                                        {canDelete({ id: user.id, role: user.role }) && (
                                                            <button
                                                                onClick={() => handleDelete(user.id, user.name)}
                                                                disabled={isDeleting}
                                                            >
                                                                {isDeleting ? 'Deleting...' : 'Delete'}
                                                            </button>
                                                        )}
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