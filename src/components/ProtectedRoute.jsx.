import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
const { session, loading } = useAuth()
const location = useLocation()

if (loading) {
return (
<div className="screen-center">
<div className="spinner" aria-label="Loading" />
</div>
)
}

if (!session) {
return <Navigate to="/login" replace state={{ from: location }} />
}

return children
}
