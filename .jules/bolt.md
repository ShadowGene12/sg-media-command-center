## 2026-06-28 - Zustand subscriptions in application shell
**Learning:** Widespread usage of `const { prop1, prop2 } = useCommandStore()` causes unnecessary re-renders across the entire application shell whenever any value in the store changes.
**Action:** Always use granular state selectors like `const prop = useCommandStore(state => state.prop)` for application shell components (AppHeader, AppSidebar, etc.) to prevent massive re-render bottlenecks.
