import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PublicOnlyRoute({ children }) {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="screen-center">
        <div className="spinner" aria-label="Loading" />
      </div>
    )
  }

  if (session) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}
