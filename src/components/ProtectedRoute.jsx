import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children, requireAdmin = false }) {
  if (requireAdmin) {
    const adminAuth = localStorage.getItem('adminAuth')
    if (!adminAuth) {
      return <Navigate to="/admin-login" replace />
    }
    return children
  }

  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute