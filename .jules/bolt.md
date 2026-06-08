## 2026-06-08 - Zustand Store Subscriptions
**Learning:** The codebase frequently uses `const { property } = useCommandStore()` which causes components to re-render whenever *any* unrelated state changes.
**Action:** When adding or refactoring Zustand usage, always extract specific state properties via individual selectors (e.g., `const property = useCommandStore(state => state.property)`) to prevent widespread unnecessary re-renders.
