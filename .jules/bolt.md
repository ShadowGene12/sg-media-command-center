## 2025-06-23 - Application Shell Re-renders from Zustand Subscriptions
**Learning:** Components frequently subscribe to the entire Zustand store (e.g., `useCommandStore()`), causing unnecessary re-renders of the global application shell (`AppSidebar`, `AppHeader`, `CommandPalette`) whenever any store value changes.
**Action:** Always refactor these to use specific state selectors (e.g., `useCommandStore(state => state.property)`) as a primary performance optimization pattern for new or refactored components.
