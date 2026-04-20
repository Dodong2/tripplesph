import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { signOut } from "../../services/auth.service"
import type { ActivityLog } from "../../types/index.types"
import { useGetLogs } from "../../hooks/monitoring/queries/useGetLogs"
import { useMonitoringSocket } from "../../hooks/monitoring/socket/useMonitoringSocket"
import { TYPE_COLORS } from "../../constants/monitoring.contants"

const Monitoring = () => {
    const navigate = useNavigate()
    const { user } = useAuth()
    const { data: logs = [] } = useGetLogs()
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