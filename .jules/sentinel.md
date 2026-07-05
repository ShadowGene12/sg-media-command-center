## 2024-07-05 - Missing JWT Validation in Edge Functions
**Vulnerability:** IDOR and Authentication Bypass in Deno Edge function. The client-provided user ID and email were blindly trusted instead of securely validating the JWT from the Authorization header.
**Learning:** Supabase Edge functions do not automatically verify JWTs in the incoming HTTP request. `req.headers.get("Authorization")` must be used to manually instantiate a Supabase client and fetch the authenticated user.
**Prevention:** Always verify user identity in Edge functions by calling `supabase.auth.getUser()` using the incoming Authorization header.
