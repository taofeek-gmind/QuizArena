import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthShell from '../components/AuthShell'
import FormField from '../components/FormField'
import { useAuth } from '../context/AuthContext'
import '../components/forms.css'

export default function SignUp() {
const { signUp } = useAuth()
const navigate = useNavigate()

const [username, setUsername] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
const [submitting, setSubmitting] = useState(false)
const [formError, setFormError] = useState('')
const [fieldErrors, setFieldErrors] = useState({})
const [confirmationSent, setConfirmationSent] = useState(false)

function validate() {
const errors = {}
if (!username.trim()) errors.username = 'Choose a display name.'
if (!email.trim()) errors.email = 'Enter your email.'
if (password.length < 8) errors.password = 'Use at least 8 characters.'
if (confirmPassword !== password) errors.confirmPassword = 'Passwords do not match.'
return errors
}

async function handleSubmit(e) {
e.preventDefault()
setFormError('')

const errors = validate()  
setFieldErrors(errors)  
if (Object.keys(errors).length > 0) return  

setSubmitting(true)  
const { data, error } = await signUp({  
  email: email.trim(),  
  password,  
  username: username.trim(),  
})  
setSubmitting(false)  

if (error) {  
  setFormError(mapAuthError(error))  
  return  
}  

// If your Supabase project requires email confirmation, there is no  
// session yet at this point — show a "check your inbox" state instead  
// of redirecting. If confirmation is disabled, a session comes back  
// immediately and we can go straight to the dashboard.  
if (data.session) {  
  navigate('/dashboard', { replace: true })  
} else {  
  setConfirmationSent(true)  
}

}

if (confirmationSent) {
return (
<AuthShell eyebrow="QuizArena" title="Check your inbox" subtitle="Almost there.">
<p className="form-success">
We sent a confirmation link to <strong>{email.trim()}</strong>. Open it to
activate your account, then come back and log in.
</p>
</AuthShell>
)
}

return (
<AuthShell
eyebrow="QuizArena"
title="Create your account"
subtitle="Set up your profile, then jump into your first subject."
footer={
<span>
Already have an account? <Link to="/login">Log in</Link>
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
      id="username"  
      label="Display name"  
      autoComplete="nickname"  
      placeholder="How you'll appear on the leaderboard"  
      value={username}  
      onChange={(e) => setUsername(e.target.value)}  
      error={fieldErrors.username}  
    />  

    <FormField  
      id="email"  
      label="Email"  
      type="email"  
      autoComplete="email"  
      placeholder="you@example.com"  
      value={email}  
      onChange={(e) => setEmail(e.target.value)}  
      error={fieldErrors.email}  
    />  

    <FormField  
      id="password"  
      label="Password"  
      type="password"  
      autoComplete="new-password"  
      placeholder="At least 8 characters"  
      value={password}  
      onChange={(e) => setPassword(e.target.value)}  
      error={fieldErrors.password}  
      minLength={8}  
    />  

    <FormField  
      id="confirmPassword"  
      label="Confirm password"  
      type="password"  
      autoComplete="new-password"  
      placeholder="Type it again"  
      value={confirmPassword}  
      onChange={(e) => setConfirmPassword(e.target.value)}  
      error={fieldErrors.confirmPassword}  
    />  

    <button className="btn-primary" type="submit" disabled={submitting}>  
      {submitting ? 'Creating account…' : 'Create account'}  
    </button>  
  </form>  
</AuthShell>

)
}

function mapAuthError(error) {
const msg = error.message?.toLowerCase() || ''
if (msg.includes('already registered') || msg.includes('already exists')) {
return 'An account with this email already exists — try logging in instead.'
}
if (msg.includes('password')) {
return error.message
}
return error.message || 'Something went wrong. Please try again.'
}
