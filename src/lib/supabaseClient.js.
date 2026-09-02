import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
// Fail loudly in dev rather than silently hitting a broken client.
// This never logs the key itself.
console.error(
'Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. ' +
'Copy .env.example to .env.local and fill in your Supabase project values.'
)
}

// This client is safe to use in the browser: it is initialized with the
// public "anon" key only. Row Level Security policies on your Supabase
// tables are what actually protect user data — the anon key alone grants
// no special access. Never import or reference a service-role key here.
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
auth: {
persistSession: true,
autoRefreshToken: true,
detectSessionInUrl: true,
},
})
