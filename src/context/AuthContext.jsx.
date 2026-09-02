import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
const [session, setSession] = useState(null)
// 'loading' = still checking for an existing session on first load.
const [loading, setLoading] = useState(true)

useEffect(() => {
let isMounted = true

supabase.auth.getSession().then(({ data: { session } }) => {  
  if (!isMounted) return  
  setSession(session)  
  setLoading(false)  
})  

const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {  
  setSession(session)  
  setLoading(false)  
})  

return () => {  
  isMounted = false  
  listener.subscription.unsubscribe()  
}

}, [])

async function signUp({ email, password, username }) {
const { data, error } = await supabase.auth.signUp({
email,
password,
options: {
// Stored on the auth user's metadata immediately at sign-up time.
// If you have a DB trigger that creates a row in profiles from
// new auth users, it can read this from raw_user_meta_data.
data: username ? { username } : undefined,
},
})
return { data, error }
}

async function signIn({ email, password }) {
const { data, error } = await supabase.auth.signInWithPassword({ email, password })
return { data, error }
}

async function signOut() {
const { error } = await supabase.auth.signOut()
return { error }
}

const value = {
session,
user: session?.user ?? null,
loading,
signUp,
signIn,
signOut,
}

return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
const ctx = useContext(AuthContext)
if (ctx === undefined) {
throw new Error('useAuth must be used within an AuthProvider')
}
return ctx
}
