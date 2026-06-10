## 2024-06-10 - Sensitive Information Exposure in Error Messages
**Vulnerability:** Exposed sensitive data (`err.message` and environment variable names like `OPENAI_API_KEY`) in client-facing error messages within `AIAdvisorHub.tsx`.
**Learning:** Catching errors from backend calls and directly rendering their raw content (or combining it with sensitive environment hints) can expose internal architectural details and API configurations to the user.
**Prevention:** Sanitize error messages before displaying them. Use generic fallback text for user-facing errors (e.g., "Error connecting to AI. Please try again later.") and reserve detailed error information for server-side logging or secure console output.
