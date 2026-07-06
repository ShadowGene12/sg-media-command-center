## 2024-05-18 - Zustand Full Subscriptions in App Shell
**Learning:** Components frequently subscribe to the entire Zustand store (e.g., `useCommandStore()`). This architectural bottleneck causes the application shell (like `AppHeader`, `AppSidebar`) to re-render whenever ANY store state changes, degrading frontend performance.
**Action:** Refactor `useCommandStore()` calls to use multiple individual state selectors (e.g., `useCommandStore(state => state.property)`) to prevent widespread unnecessary re-renders.
