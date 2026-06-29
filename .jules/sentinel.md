## 2024-06-29 - Missing JWT Verification in Edge Function
**Vulnerability:** Supabase Edge Function `create-checkout-session` accepted user ID and email from client JSON payload without verifying the Authorization header JWT via Supabase Auth.
**Learning:** Supabase Edge Functions in this architecture don't automatically verify JWTs. Also, `req.json()` consumes the request stream and can only be called once per request.
**Prevention:** Always instantiate a Supabase client using the incoming Authorization header and call `supabase.auth.getUser()` to securely retrieve the user context instead of trusting the client payload. Only call `req.json()` once.
