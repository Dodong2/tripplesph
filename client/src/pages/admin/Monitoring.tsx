import { useAuth } from "../../hooks/useAuth"
import { signOut } from "../../services/auth.service"
import type { ActivityLog, RoleCount } from "../../types/index.types"
import { useGetLogs } from "../../hooks/monitoring/queries/useGetLogs"
import { useGetStats } from "../../hooks/monitoring/queries/useGetStats"
import { useMonitoringSocket } from "../../hooks/monitoring/socket/useMonitoringSocket"
import { TYPE_COLORS } from "../../constants/monitoring.contants"

const Monitoring = () => {
    const { user } = useAuth()
    const { data: logs = [] } = useGetLogs()
    const { data: stats } = useGetStats()
    const { isConnected } = useMonitoringSocket()

  return (
    <div>
        <h1>Super Admin Monitoring</h1>
        <p>Welcome, {user?.name}</p>
        <button onClick={signOut}>Sign out</button>

        {/* ── Connection status ────────────────────── */}
      <p>
        Socket: {' '}
        <span style={{ color: isConnected ? 'green' : 'red' }}>
          {isConnected ? '● Live' : '○ Disconnected'}
        </span>
      </p>

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
            <p>Total: {stats.articles.total}</p>
            <p>Published: {stats.articles.published}</p>
          </div>

          <div style={{ border: '1px solid #ccc', padding: '10px' }}>
            <h3>Engagement</h3>
            <p>❤️ Reactions: {stats.engagement.reactions}</p>
            <p>🔗 Shares: {stats.engagement.shares}</p>
            <p>👁️ Views: {stats.engagement.views}</p>
          </div>
        </div>
      )}

      {/* ── Activity Logs ────────────────────────── */}
      <h2>Activity Logs (Live)</h2>
      <table border={1} cellPadding={8} cellSpacing={0} style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Time</th>
            <th>Type</th>
            <th>Message</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {logs.length === 0 ? (
            <tr><td colSpan={4}>No activity yet</td></tr>
          ) : (
            logs.map((log: ActivityLog) => (
              <tr key={log.id}>
                <td style={{ whiteSpace: 'nowrap' }}>
                  {new Date(log.createdAt).toLocaleTimeString()}
                </td>
                <td>
                  <span style={{ color: TYPE_COLORS[log.type] ?? 'black' }}>
                    {log.type}
                  </span>
                </td>
                <td>{log.message}</td>
                <td>{log.userName ?? log.userId ?? '—'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Monitoring