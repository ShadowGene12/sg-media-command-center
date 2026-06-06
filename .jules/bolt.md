## 2026-06-06 - App Shell Re-renders due to Zustand Store Subscriptions
**Learning:** Components frequently subscribe to the entire Zustand store (`useCommandStore()`), which causes them to re-render whenever ANY value in the store changes (like `overallScore` or `diyActions`). The App Shell components (AppHeader, AppSidebar, CommandPalette) were re-rendering on every unrelated state update.
**Action:** Refactor Zustand store subscriptions to use specific state selectors (e.g., `useCommandStore(state => state.property)`) to prevent widespread unnecessary re-renders.
