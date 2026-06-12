## 2025-02-28 - Optimize Zustand Store Subscriptions
**Learning:** In the command-center app, many components subscribe to the entire Zustand `useCommandStore` by default (e.g., `const { tier } = useCommandStore();`). This causes the components to re-render whenever *any* state in the store changes, even if the component doesn't use that state.
**Action:** Refactored global store usages to use specific state selectors (e.g., `const tier = useCommandStore(state => state.tier);`). This atomic selector pattern prevents unnecessary re-renders across the app.
