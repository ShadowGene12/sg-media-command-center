## 2024-06-30 - Missing JWT Verification in Edge Functions
**Vulnerability:** Supabase Edge Functions (`ai-advisor`, `create-portal-session`, `create-checkout-session`) lack automatic JWT verification, allowing unauthenticated access and potential IDOR.
**Learning:** In Deno-based Supabase Edge Functions, standard HTTP headers (like `Authorization`) are not verified implicitly. The security relies entirely on explicit backend verification.
**Prevention:** Always instantiate a Supabase client securely using the incoming `Authorization` header and call `supabase.auth.getUser()` before processing sensitive requests.
