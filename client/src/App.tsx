import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import RoleDirect from "./components/RoleRedirect"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import WriterDashboard from "./pages/WriterDashboard"
import Unauthorized from "./pages/Unauthorized"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── PUBLIC ───────────────────────────────── */}
        <Route path="/" element={<Home />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* ── AUTO REDIRECT after login ─────────── */}
        <Route path='/redirect' element={<RoleDirect />} />

        {/* ── WRITER ONLY ──────────────────────────────── */}
        <Route path="/writer" element={
          <ProtectedRoute allowedRoles={["writer"]}>
            <WriterDashboard />
          </ProtectedRoute>
        } />

        {/* ── ADMIN + ABOVE ─────────────────────────── */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
            <Dashboard />
          </ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  )
}

export default App
