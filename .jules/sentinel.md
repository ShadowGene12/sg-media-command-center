## 2024-06-18 - Fix information disclosure in AI Advisor error handling
**Vulnerability:** The AI Advisor fallback error message explicitly leaked infrastructure requirements (`OPENAI_API_KEY`) and Edge Function names (`ai-advisor`) to the client UI when an error occurred.
**Learning:** Internal infrastructure details, configuration requirements, and raw error messages should never be exposed to the end user, as they provide attackers with reconnaissance data about the system's architecture.
**Prevention:** Always use generic, user-friendly error messages in the UI (e.g., "I'm having trouble connecting right now") and keep detailed error logs restricted to server-side logging or secure monitoring tools.
