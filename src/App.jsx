import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import PublicOnlyRoute from './components/PublicOnlyRoute'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'

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
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicOnlyRoute>
              <SignUp />
            </PublicOnlyRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/subjects" element={<ProtectedRoute><ComingSoon name="Subjects" /></ProtectedRoute>} />
        <Route path="/exams" element={<ProtectedRoute><ComingSoon name="Mock Exams" /></ProtectedRoute>} />
        <Route path="/challenges" element={<ProtectedRoute><ComingSoon name="Challenges" /></ProtectedRoute>} />
        <Route path="/results" element={<ProtectedRoute><ComingSoon name="Results" /></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><ComingSoon name="Leaderboard" /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ComingSoon name="Profile" /></ProtectedRoute>} />
        <Route path="/tutor" element={<ProtectedRoute><ComingSoon name="AI Tutor" /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  )
}

function ComingSoon({ name }) {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontFamily: 'var(--font-display)' }}>{name}</h1>
      <p style={{ color: 'var(--text-muted)' }}>Built in a later step.</p>
    </div>
  )
}
