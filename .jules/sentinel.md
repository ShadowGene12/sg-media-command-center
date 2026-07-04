## 2024-07-04 - Supabase Edge Function JWT Authentication Bypass
**Vulnerability:** Supabase Edge functions relied on client-provided IDs (`userId` and `email` passed in the request body) instead of securely verifying the JWT token.
**Learning:** In Supabase Edge Functions, JWTs from the Authorization header are not automatically verified by the `serve` handler alone. Relying on client-provided `userId` in the body allows an attacker to bypass authentication or perform IDOR (Insecure Direct Object Reference) by passing another user's ID.
**Prevention:** To prevent authentication bypass and IDOR, always manually verify the user's identity by instantiating a Supabase client using the incoming Authorization header and calling `supabase.auth.getUser()`. Never trust client-provided user IDs.
