## 2025-06-09 - Information Disclosure in AI Advisor Hub Error Handling
**Vulnerability:** Information disclosure via fallback error message in `command-center/src/pages/advisor/AIAdvisorHub.tsx`.
**Learning:** `AIAdvisorHub.tsx` explicitly returned backend infrastructure status (Edge function deployment status) and environment variable names (`OPENAI_API_KEY`) to users when the `ai-advisor` function call failed, violating the principle of failing securely.
**Prevention:** Always use generic error messages for client-facing fallback responses. Internal state or secret requirements must be logged securely and stripped from UI messages.
