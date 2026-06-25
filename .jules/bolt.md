## 2024-05-20 - Zustand Store Subscriptions Bottleneck
**Learning:** In the command-center app, subscribing to the entire Zustand store (e.g., `useCommandStore()`) causes unnecessary re-renders in the application shell and route components when unrelated state properties change.
**Action:** Use specific state selectors (e.g., `useCommandStore(state => state.property)`) instead of full object destructuring to prevent these performance bottlenecks.
