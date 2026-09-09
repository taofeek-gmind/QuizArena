import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'

function PublicOnlyRoute({ children }) {
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

export default function App() {
return (
<AuthProvider>
<Routes>
<Route path="/" element={<Navigate to="/login" replace />} />

<Route  
      path="/login"  
      element={  
        <PublicOnlyRoute>  
          <Login />
