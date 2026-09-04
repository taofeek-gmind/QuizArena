# QuizArena — Step 1: Project structure + Login/Sign-Up

This is the first build step: project scaffold, routing, and a real
Supabase email/password auth flow (Login, Sign Up, and a protected
placeholder Dashboard so you can test the whole loop end-to-end).

## What's in this step

```
src/
  lib/supabaseClient.js     - Supabase client (anon key only)
  context/AuthContext.jsx   - session state + signUp/signIn/signOut
  components/
    ProtectedRoute.jsx      - guards routes that require login
    PublicOnlyRoute.jsx     - keeps logged-in users off /login, /signup
    AuthShell.jsx            - shared visual shell for auth pages
    FormField.jsx            - labeled input w/ inline error
  pages/
    Login.jsx
    SignUp.jsx
    Dashboard.jsx            - placeholder, proves auth works end-to-end
  App.jsx                    - routes (including reserved placeholder
                                routes for Subjects, Mock Exams,
                                Challenges, Results, Leaderboard,
                                Profile, AI Tutor — built in later steps)
```

No fake auth anywhere — Login and Sign Up call
`supabase.auth.signInWithPassword` / `supabase.auth.signUp` directly.
Session state is read from Supabase (`getSession` + `onAuthStateChange`),
not stored locally by hand.

## Setup

1. Install dependencies:
   ```
   npm install
   ```
2. Copy `.env.example` to `.env.local` and fill in your project's URL and
   **anon/public** key (Supabase dashboard → Settings → API):
   ```
   VITE_SUPABASE_URL=https://xxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```
   Never put the `service_role` key here or anywhere in this frontend —
   it must stay server-side only. This app never asks for it.
3. Run it:
   ```
   npm run dev
   ```

## Things to check on the Supabase side before testing

1. **Email confirmation setting.** In Authentication → Settings, "Confirm
   email" may be ON by default. If it's on, `signUp` won't return a
   session immediately — the Sign Up page already handles this and shows
   a "check your inbox" screen. If you want to test quickly without
   email round-trips, you can turn confirmation off for local dev.

2. **A `profiles` row needs to exist for each auth user.** You said you
   already have a `profiles` table. The signup form passes the chosen
   display name into `auth.users.raw_user_meta_data.username`. The
   cleanest way to turn that into a `profiles` row is a Postgres trigger
   on `auth.users` insert, e.g.:
   ```sql
   create function public.handle_new_user()
   returns trigger as $$
   begin
     insert into public.profiles (id, username)
     values (new.id, new.raw_user_meta_data->>'username');
     return new;
   end;
   $$ language plpgsql security definer;

   create trigger on_auth_user_created
     after insert on auth.users
     for each row execute procedure public.handle_new_user();
   ```
   Adjust the column list to match your actual `profiles` schema. If you'd
   rather I add this as a client-side upsert after signup instead of a DB
   trigger, tell me your `profiles` columns and I'll wire it into
   `AuthContext.signUp`.

3. **Row Level Security.** Make sure RLS is enabled on `profiles` and
   every other table, with policies scoped to `auth.uid()`. The anon key
   in this app has no special privileges beyond what your RLS policies
   allow — that's what keeps user data safe without a service-role key.

## Testing this step

- Go to `/signup`, create an account → you should land on the placeholder
  Dashboard (or see "check your inbox" if email confirmation is on).
- Log out, then log back in at `/login`.
- Try visiting `/dashboard` while logged out → redirected to `/login`.
- Try visiting `/login` while logged in → redirected to `/dashboard`.
- Try an invalid password → see the inline error, no crash.

## Next step

Once you confirm this works against your real Supabase project, the next
step is the real Dashboard/Overview screen (streaks, XP summary, recent
activity) followed by the bottom navigation shell shared by all the
authenticated screens.
