## 2024-05-16 - Zustand Subscription Re-renders in App Shell
**Learning:** Components frequently subscribe to the entire Zustand store (e.g., `useCommandStore()`), which causes widespread unnecessary re-renders in application shell components like `AppHeader`.
**Action:** Always refactor Zustand store subscriptions to use specific state selectors (e.g., `useCommandStore(state => state.property)`) instead of destructured object assignment.
