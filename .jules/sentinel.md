## 2026-06-28 - [Supabase Edge Function Authentication Bypass]
**Vulnerability:** Supabase Edge Functions in Deno environment were trusting client-provided userId and email from `req.json()` instead of verifying the user via JWT validation.
**Learning:** In Supabase Edge Functions, JWTs from the Authorization header are not automatically verified. `req.json()` consumes the stream and can only be called once per request.
**Prevention:** Always manually verify the user's identity by instantiating a Supabase client using the incoming Authorization header and calling `supabase.auth.getUser()`.
