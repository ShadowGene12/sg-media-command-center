## 2024-07-02 - Supabase Edge Functions Authentication Bypass / IDOR

**Vulnerability:** Supabase Edge Functions (e.g., `create-checkout-session`) trusted client-provided user IDs and emails from the request body instead of validating the user's identity via JWT.

**Learning:** In Supabase Edge Functions, the presence of an Authorization header does not automatically verify the user's identity. The framework doesn't implicitly validate the token in the request. Reading sensitive user context (like `userId` or `email`) from the request body allows an attacker to spoof actions for other users.

**Prevention:** Always instantiate a Supabase client using the incoming Authorization header and call `supabase.auth.getUser()` to securely obtain and verify the user's context in Edge Functions.
