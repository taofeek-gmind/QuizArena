import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthShell from '../components/AuthShell'
import FormField from '../components/FormField'
import { useAuth } from '../context/AuthContext'
import '../components/forms.css'

export default function Login() {
const { signIn } = useAuth()
const navigate = useNavigate()
const location = useLocation()
const redirectTo = location.state?.from?.pathname || '/dashboard'

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [submitting, setSubmitting] = useState(false)
const [formError, setFormError] = useState('')

async function handleSubmit(e) {
e.preventDefault()
setFormError('')

if (!email || !password) {  
  setFormError('Enter your email and password.')  
  return  
}  

setSubmitting(true)  
const { error } = await signIn({ email: email.trim(), password })  
setSubmitting(false)  

if (error) {  
  setFormError(mapAuthError(error))  
  return  
}  

navigate(redirectTo, { replace: true })

}

return (
<AuthShell
eyebrow="QuizArena"
title="Log in to your arena"
subtitle="Pick up where you left off — your subjects, streaks and rank are waiting."
footer={
<span>
New here? <Link to="/signup">Create an account</Link>
</span>
}
>
<form className="form" onSubmit={handleSubmit} noValidate>
{formError ? (
<p className="form-error" role="alert">
{formError}
</p>
) : null}

<FormField  
      id="email"  
      label="Email"  
      type="email"  
      autoComplete="email"  
      placeholder="you@example.com"  
      value={email}  
      onChange={(e) => setEmail(e.target.value)}  
    />  

    <FormField  
      id="password"  
      label="Password"  
      type="password"  
      autoComplete="current-password"  
      placeholder="••••••••"  
      value={password}  
      onChange={(e) => setPassword(e.target.value)}  
    />  

    <button className="btn-primary" type="submit" disabled={submitting}>  
      {submitting ? 'Logging in…' : 'Log in'}  
    </button>  
  </form>  
</AuthShell>

)
}

// Supabase returns generic error messages; translate the common ones into
// something a user can act on without leaking whether an email exists.
function mapAuthError(error) {
const msg = error.message?.toLowerCase() || ''
if (msg.includes('invalid login credentials')) {
return 'Incorrect email or password.'
}
if (msg.includes('email not confirmed')) {
return 'Please confirm your email before logging in — check your inbox.'
}
return error.message || 'Something went wrong. Please try again.'
}
