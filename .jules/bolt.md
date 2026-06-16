## 2024-05-18 - Zustand Subscription Re-renders
**Learning:** Components subscribing to the entire Zustand store (e.g., `useCommandStore()`) will re-render whenever *any* state in the store changes, which is a significant performance bottleneck for application shell components like AppSidebar and AppHeader.
**Action:** Always use specific state selectors (e.g., `useCommandStore(state => state.tier)`) to subscribe only to the necessary state, preventing widespread unnecessary re-renders.
