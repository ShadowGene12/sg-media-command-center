## 2024-05-24 - Zustand Application Shell Re-renders
**Learning:** Components frequently subscribe to the entire Zustand store (e.g., `useCommandStore()`). Refactoring these to use specific state selectors (e.g., `useCommandStore(state => state.property)`) is a recommended performance optimization to prevent widespread unnecessary re-renders of the application shell.
**Action:** Use multiple individual selector calls rather than assuming unverified imports like `useShallow` when optimizing Zustand stores.
