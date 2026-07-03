## 2024-10-24 - Zustand store subscription optimization
**Learning:** Subscribing to the entire Zustand store (e.g., `useCommandStore()`) in global shell components like AppHeader causes unnecessary application-wide re-renders when unrelated state changes.
**Action:** Refactor global components to use individual specific state selectors (e.g., `useCommandStore(state => state.property)`) to prevent unnecessary re-renders.
