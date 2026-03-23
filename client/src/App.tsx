import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import UserManagement from "./pages/UserManagement"
import Unauthorized from "./pages/Unauthorized"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── PUBLIC ───────────────────────────────── */}
        <Route path="/" element={<Home/>}/>
        <Route path="/manage" element={<Login/>}/>
        <Route path="/unauthorized" element={<Unauthorized/>}/>

        {/* ── WRITER + ABOVE ────────────────────────── */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={["writer", "admin", "super_admin"]}>
            <Dashboard/>
          </ProtectedRoute>
        }/>

        {/* ── ADMIN + ABOVE ─────────────────────────── */}
        <Route path="/dashboard/users" element={
          <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
            <UserManagement/>
          </ProtectedRoute>
        } />


      </Routes>
    </BrowserRouter>
  )
}

export default App
