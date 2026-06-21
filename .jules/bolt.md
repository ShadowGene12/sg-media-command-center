## 2024-05-24 - Zustand Subscription Re-render Bottleneck
**Learning:** Components subscribing to the entire Zustand store (e.g., `useCommandStore()`) cause application shell re-renders on any state change. This is an architectural bottleneck.
**Action:** Always use specific state selectors (e.g., `useCommandStore(state => state.property)`) with individual selector calls instead of destructuring the entire store object.
