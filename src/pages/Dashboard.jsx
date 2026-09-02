import { useAuth } from '../context/AuthContext'

// This is a placeholder so Login/Sign-Up is fully testable end-to-end.
// The real Dashboard/Overview (streaks, XP, recent activity) is the next
// build step.
export default function Dashboard() {
const { user, signOut } = useAuth()

return (
<div style={{ padding: 24, maxWidth: 480, margin: '0 auto' }}>
<h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22 }}>
You're in, {user?.user_metadata?.username || user?.email}
</h1>
<p style={{ color: 'var(--text-muted)', marginTop: 8 }}>
Logged in as {user?.email}. This placeholder confirms auth is working —
the real Dashboard/Overview screen is next.
</p>
<button
className="btn-primary"
style={{ marginTop: 20 }}
onClick={() => signOut()}
>
Log out
</button>
</div>
)
}
