## 2025-02-13 - Application Shell Zustand Subscriptions
**Learning:** Broad Zustand subscriptions in frequently rendered components like the application shell (Header, Sidebar, Command Palette) cause unnecessary re-renders when unrelated state changes. Components frequently subscribe to the entire store (e.g., `useCommandStore()`).
**Action:** Always use specific state selectors (e.g., `useCommandStore(state => state.property)`) instead of destructuring the whole store. Use multiple individual selector calls rather than assuming unverified imports like `useShallow`.
