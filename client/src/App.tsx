import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import RoleDirect from "./components/RoleRedirect"
import Home from "./pages/Home"
import Dashboard from "./pages/admin/Dashboard"
import WriterDashboard from "./pages/writer/WriterDashboard"
import Unauthorized from "./pages/Unauthorized"
import CreateArticle from "./pages/article/CreateArticle"
import UpdateArticle from "./pages/article/UpdateArticle"
import ArticleView from "./pages/user/ArticleView"
import UserDashboard from "./pages/user/UserDashboard"
import Monitoring from "./pages/admin/Monitoring"
import ArticleApproval from "./pages/admin/ArticleApproval"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── PUBLIC ───────────────────────────────── */}
        <Route path="/" element={<Home />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/articles/:id" element={<ArticleView/>}/>

        {/* ── AUTO REDIRECT after login ─────────── */}
        <Route path='/redirect' element={<RoleDirect />} />
        {/* ── WRITER ONLY ──────────────────────────────── */}
        <Route path='/user' element={
          <ProtectedRoute allowedRoles={["user"]}>
          <UserDashboard/>
          </ProtectedRoute>
          }/>
        
        {/* ── WRITER ONLY ──────────────────────────────── */}
        <Route path="/writer" element={
          <ProtectedRoute allowedRoles={["writer"]}>
            <WriterDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/writer/create" element={
          <ProtectedRoute allowedRoles={["writer", "admin", "super_admin"]}>
            <CreateArticle/>
          </ProtectedRoute>
        }/>

        <Route path="/writer/edit/:id" element={
          <ProtectedRoute allowedRoles={["writer", "admin", "super_admin"]}>
            <UpdateArticle/>
          </ProtectedRoute>
        }/>

        {/* ── ADMIN + ABOVE ─────────────────────────── */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/admin/monitoring" element={
          <ProtectedRoute allowedRoles={["super_admin"]}>
            <Monitoring/>
          </ProtectedRoute>
        }/>

        <Route path="/admin/approvals" element={
          <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
            <ArticleApproval/>
          </ProtectedRoute>
        }/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
