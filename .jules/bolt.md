## 2024-05-14 - Zustand Store Subscriptions

**Learning:** Component subscriptions to the entire Zustand store (e.g., `const { tier } = useCommandStore();`) cause components to unnecessarily re-render when ANY state within that store changes, leading to application shell re-renders in widespread components like AppSidebar, AppHeader, and CommandPalette.

**Action:** Always use individual specific state selectors (e.g., `const tier = useCommandStore(state => state.tier);`) when subscribing to Zustand stores in this codebase to prevent unnecessary and costly re-renders.
