## 2024-05-15 - [App Shell Re-renders with Zustand]
**Learning:** Subscribing to the entire Zustand store (e.g., `const { ... } = useStore()`) in high-level app shell components like `AppHeader` or layouts causes them (and all their children) to re-render whenever *any* unrelated state in the store changes.
**Action:** Always use individual selectors (e.g., `const property = useStore(state => state.property)`) for Zustand subscriptions, especially in frequently-rendered or application-level shell components to prevent cascading unneeded re-renders.
