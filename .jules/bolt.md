## 2024-05-15 - Zustand Selectors Optimization
**Learning:** Components frequently subscribe to the entire Zustand store (e.g., `useCommandStore()`). Refactoring these to use specific state selectors (e.g., `useCommandStore(state => state.property)`) is a recommended performance optimization to prevent widespread unnecessary re-renders. Use multiple individual selector calls rather than assuming unverified imports like `useShallow`.
**Action:** Always prefer individual selector calls when extracting multiple properties from a Zustand store.
